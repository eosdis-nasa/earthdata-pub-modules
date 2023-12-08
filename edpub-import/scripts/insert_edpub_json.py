#!/usr/bin/env python3
'''
|---------------------------------------------------------------------------------------------
|   INSERT_EDPUB_JSON.PY
|   
|   AUTHOR:     Kent Campbell
|   CONTACT:    campbellkb@ornl.gov
|
|   DESCRIPTION:
|       A script for inserting a JSON response file into daac_ingest_archival_interest table
|
|   USAGE:
|       $ ./insert_edpub_json.py json_file
|
|         positional arguments:
|           json_file   A json file containing the responses from EDPub's Data Accession
|                       Request and Data Publication Request forms in UMM-C format
|---------------------------------------------------------------------------------------------
'''

import json
import sys

from datetime import datetime
from os.path import isfile
from sqlalchemy import create_engine, text
from sqlalchemy.engine.url import URL

sys.path.append('/usr/local/scripts/lib/')
from DBCON import DBCON

def read_ascii(filename):
    rfile = open(filename, 'r')
    lines = rfile.readlines()
    rfile.close()
    return lines

def insert_data(json_file):
    with open(json_file, 'rb') as json_fp:
        # Read JSON file
        json_file_contents = json.load(json_fp)

        for attribute in json_file_contents['AdditionalAttributes']:
            if attribute['Name'] == 'FormType':
                if attribute['Value'] == 1:
                    accession_form_data(json_file, json_file_contents)
                elif attribute['Value'] == 2:
                    publication_form_data(json_file, json_file_contents)
                else:
                    raise Exception('Invalid value for MetadataForm. Must be either 1 or 2.')
                    #print('Invalid value for MetadataForm. Must be either 1 or 2.')
                    #exit(1)        
                break

def accession_form_data(json_file, json_file_contents):
    # Retrieve PI Information
    for items in json_file_contents['DataCenters']:
        if items['Roles'][0] == 'ORIGINATOR':
            contact_info = items['ContactPersons'][0]

            pi_first_name = contact_info['FirstName']
            pi_last_name = contact_info['LastName']
            pi_name = pi_first_name + ' ' + pi_last_name
            
            for mechanism in contact_info['ContactInformation']['ContactMechanisms']:
                if mechanism['Type'] == 'Email':
                    pi_email = mechanism['Value']
                    break

            pi_organization = items['ShortName']
            break

    # Retrieve Funding Source
    funding = None
    other = False

    ready_for_pub = None
    reason = None

    for info in json_file_contents['AdditionalAttributes']:
        if info['Name'] == 'edpub_request_id':
            edpub_request_id = info['Value']

        if info['Name'] == 'funding_nasa' and info['Value'] == True:
            funding = 'NASA'
        
        if info['Name'] == 'funding_noaa' and info['Value'] == True:
            if funding is not None:
                funding += ', NOAA'
            else:
                funding = 'NOAA'
        
        if info['Name'] == 'funding_nsf' and info['Value'] == True:
            if funding is not None:
                funding += ', NSF'
            else:
                funding = 'NSF'
        
        if info['Name'] == 'funding_usgs' and info['Value'] == True:
            if funding is not None:
                funding += ', USGS'
            else:
                funding = 'USGS'
        
        if ((info['Name'] == 'funding_university' and info['Value'] == True) or
            (info['Name'] == 'funding_other' and info['Value'] == True)):
            other = True

        if info['Name'] == 'funding_organization_other' and other == True:
            if funding is not None:
                funding += ', %s' %info['Value']
            else:
                funding = info['Value']

        if info['Name'] == 'data_product_restrictions_public':
            ready_for_pub = info['Value']

        if info['Name'] == 'data_accession_reason_description':
            reason = info['Value']

    ds_name = json_file_contents['EntryTitle']
    accession_form = ''.join(read_ascii(json_file))

    # Get timestamp
    now = datetime.now()
    accession_form_datetime = now.strftime('%Y-%m-%d %H:%M:%S')

    # Build insert statement
    insert_stmt = text('''INSERT INTO daac_ingest_archival_interest (pi_name, 
                                                                     pi_email,
                                                                     pi_organization, 
                                                                     funding, 
                                                                     ds_name,
                                                                     ready_for_pub,
                                                                     reason,
                                                                     edpub_request_id, 
                                                                     accession_form,
                                                                     accession_form_datetime)
                          VALUES(:pi_name,
                                 :pi_email,
                                 :pi_organization,
                                 :funding,
                                 :ds_name,
                                 :ready_for_pub,
                                 :reason,
                                 :edpub_request_id,
                                 :accession_form,
                                 :accession_form_datetime)''')
    
    insert_dict = {
                    'pi_name': pi_name,
                    'pi_email': pi_email,
                    'pi_organization': pi_organization,
                    'funding': funding,
                    'ds_name': ds_name,
                    'ready_for_pub': ready_for_pub,
                    'reason': reason,
                    'edpub_request_id': edpub_request_id, 
                    'accession_form': accession_form,
                    'accession_form_datetime': accession_form_datetime,
    }

    try:
        # connect to the database using PyMySQL via sqlalchemy
        DATABASE = {
            'drivername': 'mysql+pymysql',
            'username': DBCON().dbuser,
            'password': DBCON().dbpw,
            'host': DBCON().daac_ingest_host,
            'database': DBCON().daac_ingest_db
        }
        
        ENGINE = create_engine(URL(**DATABASE), future = True)
        with ENGINE.connect() as CNX:
            result = CNX.execute(text('''SELECT * 
                                         FROM daac_ingest_archival_interest
                                         WHERE edpub_request_id = \'%s\'''' %edpub_request_id))

            if len(result.all()) < 1:
                # Insert new row into database
                CNX.execute(insert_stmt, insert_dict)
                CNX.commit()

                print('Data from EDPub Data Accession Request Form successfully inserted into database')
            else:
                # Build update statement
                update_stmt = text('''UPDATE daac_ingest_archival_interest 
                                      SET pi_name = :pi_name, 
                                          pi_email = :pi_email,
                                          pi_organization = :pi_organization, 
                                          funding = :funding, 
                                          ds_name = :ds_name,
                                          ready_for_pub = :ready_for_pub,
                                          reason = :reason,
                                          edpub_request_id = :edpub_request_id, 
                                          accession_form = :accession_form,
                                          accession_form_datetime = :accession_form_datetime
                                      WHERE edpub_request_id = :edpub_request_id''')
                update_dict = {
                                'pi_name': pi_name,
                                'pi_email': pi_email,
                                'pi_organization': pi_organization,
                                'funding': funding,
                                'ds_name': ds_name,
                                'ready_for_pub': ready_for_pub,
                                'reason': reason,
                                'edpub_request_id': edpub_request_id, 
                                'accession_form': accession_form,
                                'accession_form_datetime': accession_form_datetime,
                }

                # Update existing row in the database
                CNX.execute(update_stmt, update_dict)
                CNX.commit()

                print('Data from EDPub Data Accession Request Form successfully updated')
    except Exception as error:
        raise Exception(error)

def publication_form_data(json_file, json_file_contents):
    # Get edpub_request_id
    for info in json_file_contents['AdditionalAttributes']:
        if info['Name'] == 'edpub_request_id':
            edpub_request_id = info['Value']
            break

    publication_form = ''.join(read_ascii(json_file))

    # Get timestamp
    now = datetime.now()
    publication_form_datetime = now.strftime('%Y-%m-%d %H:%M:%S')

    # Build update statement
    update_stmt = text('''UPDATE daac_ingest_archival_interest 
                          SET publication_form = :publication_form,
                              publication_form_datetime = :publication_form_datetime
                          WHERE edpub_request_id = :edpub_request_id''')
    update_dict = {
                    'edpub_request_id': edpub_request_id, 
                    'publication_form': publication_form,
                    'publication_form_datetime': publication_form_datetime,
    }

    try:
        # connect to the database using PyMySQL via sqlalchemy
        DATABASE = {
            'drivername': 'mysql+pymysql',
            'username': DBCON().dbuser,
            'password': DBCON().dbpw,
            'host': DBCON().daac_ingest_host,
            'database': DBCON().daac_ingest_db
        }
        
        ENGINE = create_engine(URL(**DATABASE), future = True)
        with ENGINE.connect() as CNX:
            result = CNX.execute(text('''SELECT * 
                                         FROM daac_ingest_archival_interest
                                         WHERE edpub_request_id = \'%s\''''
                                           # AND publication_form is null''' 
                                      %edpub_request_id))

            if len(result.all()) == 1:
                # Update existing row in the database
                CNX.execute(update_stmt, update_dict)
                CNX.commit()

                print('Data from EDPub Data Publication Request Form successfully added')
            elif len(result.all()) < 1:
                raise Exception('ERROR: No row found in daac_ingest_archival_interest ' +
                       'for edpub_request_id = \'%s\'' %edpub_request_id)
            else:
                raise Exception('ERROR: JSON data exists for the EDPub Data Publication' +
                       'Request Form in daac_ingest_archival_interest ' +
                       'for edpub_request_id = \'%s\'' %edpub_request_id)
    except Exception as error:
        raise Exception(error)

if __name__ == "__main__":
    # Get json_file from command line args
    if len(sys.argv) > 1:
        json_file = sys.argv[1]
        if isinstance(json_file, str):
            if not isfile(json_file):
                print('No file found corresponding to supplied JSON_FILE argument')
                exit(1)
        else:
            print('Invalid argument for JSON_FILE')
            exit(1)
    else:
        print('JSON_FILE argument missing. Exiting.')
        exit(1)

    # Insert data into database
    try:
        insert_data(json_file)
    except Exception as error:
        print(error)