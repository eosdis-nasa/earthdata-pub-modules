#!/usr/bin/env python3
'''
|---------------------------------------------------------------------------------------------
|   METADATA_MAPPER.PY
|   
|   AUTHOR:     Kent Campbell
|   CONTACT:    campbellkb@ornl.gov
|
|   DESCRIPTION:
|       A script for mapping EDPub JSON output to UMM-C format.
|
|   USAGE:
|       $ ./metadata_mapper.py input_file output_file
|
|         positional arguments:
|           input_file      A json file containing the responses from the EDPub form
|           output_file     A file (reformatted to UMM-C) to which the data will be written
|---------------------------------------------------------------------------------------------
'''
import json
from os.path import isfile
from time import strftime, strptime
from sys import argv
                 
def write_lines(filename, lines, mode = 'w+'):
    '''Write multiple lines to file

    Args:
        filename (str): name of file (including path) to write to.
        line (list):    a list of strings to be written to file.
        mode (str):     writing mode ('a+' for append, 'w+' for write).
    
    Returns:
        N/A
    '''
    if isinstance(filename, str):
        wfile = open(filename, mode)

        for line in lines:
            wfile.write(line.rstrip() + '\n')

        wfile.close()
    else:
        for line in lines:
            wfile.write(line.rstrip())

def reformat_datetime(dt: str):
    try:
        dt = strptime(dt, '%Y-%m-%d %H:%M:%S') #NOT SURE ABOUT THIS LINE'S FORMAT STRING...
    except:
        dt = strptime(dt, '%Y-%m-%d')
    
    dt = strftime('%Y-%m-%dT%H:%M:%SZ', dt)

    return dt

def to_bool(value: str):
    if value.upper() in ['YES', 'TRUE']:
        return True
    elif value.upper() in ['NO', 'FALSE']:
        return False
    else:
        print('Conversion to Boolean Failed. EXITING.')
        exit(1)

def to_umm_c(edpub_json: dict):
    # CREATING A UMM-C DICTIONARY AND MAPPING ITEMS TO IT FROM EDPUB JSON

    MetadataSpecification = [{
        "URL": "https://cdn.earthdata.nasa.gov/umm/collection/v1.17.0",
        "Name": "UMM-C",
        "Version": "1.17.0"
    }]

    MetadataDates = []

    # Add creation date to MetadataDates
    try:
        created = edpub_json['created_at']
        MetadataDates.append({
            'Date': created,
            'Type': 'CREATE'
        })
    except:
        pass

    # Add updated date to MetadataDates
    try:
        updated = edpub_json['last_change']
        MetadataDates.append({
            'Date': updated,
            'Type': 'UPDATE'
        })
    except:
        pass

    # Add temporal extents
    BDT = edpub_json['form_data']['product_temporal_coverage_start']
    BDT = reformat_datetime(BDT)

    EDT = edpub_json['form_data']['product_temporal_coverage_end']
    EDT = reformat_datetime(EDT)

    TemporalExtents = [{
        'RangeDateTimes':[{
            'BeginningDateTime': BDT,   # NOTE: Would be nice if EdPub form gave us time of day for this as well.
            'EndingDateTime': EDT,      # NOTE: Would be nice if EdPub form gave us time of day for this as well.
        }]
    }]

    if 'temporal_coverage_notes_textarea' in edpub_json['form_data'].keys():
        TemporalExtents[0]['TemporalCoverageNotes'] = edpub_json['form_data']['temporal_coverage_notes_textarea']

    # Add spatial extents
    if ('spatial_vertical_answer' in edpub_json['form_data'].keys() and
        edpub_json['form_data']['spatial_vertical_answer'].upper() == 'YES'):
        SpatialCoverageType = 'HORIZONTAL_VERTICAL'
    else:
        SpatialCoverageType = 'HORIZONTAL'

    if ('spatial_horizontal_1_west' in edpub_json['form_data'].keys() and
        'spatial_horizontal_1_north' in edpub_json['form_data'].keys() and
        'spatial_horizontal_1_east' in edpub_json['form_data'].keys() and
        'spatial_horizontal_1_south' in edpub_json['form_data'].keys()):
        SpatialExtent = {
            'SpatialCoverageType': SpatialCoverageType,
            'HorizontalSpatialDomain': {
                'Geometry': {
                    'CoordinateSystem': 'CARTESIAN',
                    'BoundingRectangles': {
                        'WestBoundingCoordinate': edpub_json['form_data']['spatial_horizontal_1_west'],
                        'NorthBoundingCoordinate': edpub_json['form_data']['spatial_horizontal_1_north'],
                        'EastBoundingCoordinate': edpub_json['form_data']['spatial_horizontal_1_east'],
                        'SouthBoundingCoordinate': edpub_json['form_data']['spatial_horizontal_1_south'],
                    },
                },
            },
        }
    else:
        SpatialExtent = {}

    if SpatialCoverageType == 'HORIZONTAL_VERTICAL':
        lower_value = edpub_json['form_data']['spatial_vertical_details_lower']
        upper_value = edpub_json['form_data']['spatial_vertical_details_upper']

        lower_units = edpub_json['form_data']['spatial_vertical_details_lower_units']
        upper_units = edpub_json['form_data']['spatial_vertical_details_upper_units']

        if float(lower_value) > float(upper_value):
            # Depth based vertical
            VerticalSpatialDomains = {
                'Maximum Depth': '%s %s' %(lower_value, lower_units),
                'Minimum Depth': '%s %s' %(upper_value, upper_units),
            }
        else:
            # Altitude based vertical
            VerticalSpatialDomains = {
                'Maximum Altitude': '%s %s' %(upper_value, upper_units),
                'Minimum Altitude': '%s %s' %(lower_value, lower_units),
            }
        
        SpatialExtent['VerticalSpatialDomains'] = VerticalSpatialDomains

        if ('spatial_general_region' in edpub_json['form_data'].keys() or
            'spatial_data_file' in edpub_json['form_data'].keys() or
            'spatial_resolution' in edpub_json['form_data'].keys() or
            'spatial_notes_textarea' in edpub_json['form_data'].keys()):
            SpatialExtent['GeneralInfo'] = {}

            if 'spatial_general_region' in edpub_json['form_data'].keys():
                SpatialExtent['GeneralInfo']['SpatialCoverageDescription'] = edpub_json['form_data']['spatial_general_region']

            if 'spatial_data_file' in edpub_json['form_data'].keys():
                SpatialExtent['GeneralInfo']['DataFileSpatialCoverage'] = edpub_json['form_data']['spatial_data_file']

            if 'spatial_resolution' in edpub_json['form_data'].keys():
                SpatialExtent['GeneralInfo']['DataFileSpatialResolution'] = edpub_json['form_data']['spatial_resolution']

            if 'spatial_notes_textarea' in edpub_json['form_data'].keys():
                SpatialExtent['GeneralInfo']['DataFileSpatialCoverageNotes'] = edpub_json['form_data']['spatial_notes_textarea']

    # Add Entry Title
    if 'data_product_name_value' in edpub_json['form_data'].keys():
        EntryTitle = edpub_json['form_data']['data_product_name_value']
    else:
        EntryTitle = 'Entry Title Not Provided'

    # Add Abstract
    if 'data_product_description' in edpub_json['form_data'].keys():
        Abstract = edpub_json['form_data']['data_product_description']
    else:
        Abstract = 'Abstract Not Provided'

    # Add Data Center info
    DataCenter = [{
        'Roles': ['ORIGINATOR'],
        'ShortName': edpub_json['form_data']['data_producer_info_organization'],

        'ContactPersons': [{
            'FirstName': edpub_json['form_data']['data_producer_info_name'].split()[0],
            'LastName': edpub_json['form_data']['data_producer_info_name'].split()[-1],
            'ContactInformation':{
                'ContactInstructions':'Data Producer',
                'ContactMechanisms': [
                    {
                        'Type': 'Email',
                        'Value': edpub_json['form_data']['data_producer_info_email'],
                    }, 
                ],
            },
        }]
    }]

    if 'data_producer_info_orcid' in edpub_json['form_data'].keys():
        DataCenter[0]['ContactPersons'][0]['ContactInformation']['ContactMechanisms'].append(
            {
                'Type': 'ORCID',
                'Value': edpub_json['form_data']['data_producer_info_orcid'],
            }
        )

    if 'same_as_long_term_support_poc_name_data_producer_info_name' in edpub_json['form_data'].keys():
        long_term_same = to_bool(edpub_json['form_data']['same_as_long_term_support_poc_name_data_producer_info_name'])
        if not long_term_same:
            DataCenter.append({
                'Roles': ['ORIGINATOR'],
                'ShortName': edpub_json['form_data']['long_term_support_poc_organization'],
                'ContactPersons': [{
                    'FirstName': edpub_json['form_data']['long_term_support_poc_name'].split()[0],
                    'LastName': edpub_json['form_data']['long_term_support_poc_name'].split()[-1],
                    'ContactInformation':{
                        'ContactInstructions':'Long Term Support Point of Contact',
                        'ContactMechanisms': [
                            {
                                'Type': 'Email',
                                'Value': edpub_json['form_data']['long_term_support_poc_email'],
                            }, {
                                'Type': 'ORCID',
                                'Value': edpub_json['form_data']['long_term_support_poc_orcid'],
                            }
                        ],
                    },
                }]
            })

    poc_same = to_bool(edpub_json['form_data']['same_as_poc_name_data_producer_info_name'])
    if not poc_same:
        DataCenter.append({
            'Roles': ['PRODUCER'],
            'ShortName': edpub_json['form_data']['poc_organization'],
            'ContactPersons': [{
                'FirstName': edpub_json['form_data']['poc_name'].split()[0],
                'LastName': edpub_json['form_data']['poc_name'].split()[-1],
                'ContactInformation':{
                    'ContactMechanisms': [
                        {
                            'Type': 'Email',
                            'Value': edpub_json['form_data']['poc_email'],
                        }, {
                            'Type': 'ORCID',
                            'Value': edpub_json['form_data']['poc_orcid'],
                        }
                    ],
                },
            }]
        })

    # Add DOI (or note lack thereof)
    if 'data_product_doi_value' in edpub_json['form_data'].keys():
        DOI = {
            'DOI': edpub_json['form_data']['data_product_doi_value'],
        }
    else:
        DOI = {
            'MissingReason': 'Not Applicable',
        }

    # Add Additional Attributes
    AdditionalAttributes = []

    # Add EDPub_requiest_id
    if 'id' in edpub_json.keys():
        AdditionalAttributes.append(
            {'Name': 'edpub_request_id',
             'Description': 'Request ID from EDPub',
             'DataType': 'STRING',
             'Value': edpub_json['id'],
            })

    # Add metadata element for 1st versus 2nd response form.
    FormType = 1
    for form in edpub_json['forms']:
        if form['long_name'] == 'Data Publication Request':
            FormType = 2
            break

    AdditionalAttributes.append(
        {'Name': 'FormType',
            'Description': 'Integer indicating to which form these responses refer',
            'DataType': 'INT',
            'Value': FormType,
        })

    # Add Data Producers Info
    if 'data_producers_table' in edpub_json['form_data'].keys():
        for entry in edpub_json['form_data']['data_producers_table']:
            AdditionalAttributes.append(
                {'Name': 'data_producers_for_data_citation',
                'Description': 'Please list the people or groups that were involved in the creation of this data product in the order that they should be credited in the data product citation.',
                'DataType': 'STRING',
                'Value': entry['producer_first_name'] + ' ' + entry['producer_last_name_or_organization'],
                })

    # Add Science Value Description
    if 'science_value_description' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'science_value_description',
             'Description': 'What is the science value of this data product?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['science_value_description'],
            })

    # Add Data Accession Reason Description
    if 'data_accession_reason_description' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_accession_reason_description',
             'Description': 'Why are you requesting to have this data product archived and distributed at the DAAC?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_accession_reason_description'],
            })

    # Add Data Accession Approval Radios
    if 'data_accession_approval_dependencies_radios' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_accession_approval_dependencies_radios',
             'Description': 'Do you have any dependencies related to this data product being approved to be published at the DAAC?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_accession_approval_dependencies_radios'],
            })

    # Add Data Product Documentation URL
    if 'data_product_documentation_url' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_documentation_url',
             'Description': 'Are there any existing documents that you would like to have included in the review of your data product? If "Yes", please provide URLs to the documents.',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_product_documentation_url'],
            })

    # Add Data Product Restrictions Info
    if 'data_product_restrictions_public' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_restrictions_public',
             'Description': 'Can this data product be publicly released in compliance with NASA\'s Open Data Policy?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_product_restrictions_public'],
            })

    if 'data_product_restrictions_explanation' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_restrictions_explanation',
             'Description': 'If No or Not sure, please provide a brief explanation.',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_product_restrictions_explanation'],
            })

    # Add Funding Source Booleans (if present)
    if 'funding_nasa' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_nasa',
             'Description': 'Did NASA help fund the creation of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['funding_nasa']),
            })

    if 'funding_noaa' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_noaa',
             'Description': 'Did NOAA help fund the creation of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['funding_noaa']),
            })

    if 'funding_nsf' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_nsf',
             'Description': 'Did NSF help fund the creation of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['funding_nsf']),
            })

    if 'funding_usgs' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_usgs',
             'Description': 'Did USGS help fund the creation of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['funding_usgs']),
            })

    if 'funding_university' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_university',
             'Description': 'Did a University help fund the creation of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['funding_university']),
            })

    if 'funding_other' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_other',
             'Description': 'Did another organization help fund the creation of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['funding_other']),
            })

    if 'funding_organization_other' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_organization_other',
             'Description': 'Name(s) of University/other organization(s) that funded the creation of this data product',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['funding_organization_other'],
            })

    if 'funding_program_name' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_program_name',
             'Description': 'Under what program or program element within the funding organization was this data product created?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['funding_program_name'],
            })

    if 'funding_grant_number' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'funding_grant_number',
             'Description': 'If available, please provide the grant number for the funding that supported the creation of this data product.',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['funding_grant_number'],
            })

    # Add Data Format Booleans (if present)
    if 'data_format_ascii' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_ascii',
             'Description': 'Was data provided in ASCII format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_ascii']),
            })
    
    if 'data_format_geotiff' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_geotiff',
             'Description': 'Was data provided in GeoTIFF format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_geotiff']),
            })
    
    if 'data_format_hdf5' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_hdf5',
             'Description': 'Was data provided in HDF5 format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_hdf5']),
            })
    
    if 'data_format_hdf_eos' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_hdf_eos',
             'Description': 'Was data provided in HDF-EOS 5 format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_hdf_eos']),
            })
    
    if 'data_format_ogc_kml' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_ogc_kml',
             'Description': 'Was data provided in OGC KML format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_ogc_kml']),
            })
    
    if 'data_format_netcdf_4' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_netcdf_4',
             'Description': 'Was data provided in NetCDF-4 format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_netcdf_4']),
            })
    
    if 'data_format_netcdf_classic' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_format_netcdf_classic',
             'Description': 'Was data provided in NetCDF Classic format?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_netcdf_classic']),
            })

    if 'data_format_other' in edpub_json['form_data'].keys():
        other_format = edpub_json['form_data']['data_format_other_info']
        AdditionalAttributes.append(
            {'Name': 'data_format_other',
             'Description': 'Was data provided in \'%s\' format?' %other_format,
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_format_other']),
            })
    
    # Add number of data files
    if 'data_product_number_of_files' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_number_of_files',
             'Description': 'What is the estimated or actual total number of files in this data product?',
             'DataType': 'INT',
             'Value': int(edpub_json['form_data']['data_product_number_of_files']),
            })

    # Add size of data product
    if 'data_product_volume_amount' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_volume_amount',
             'Description': 'What is the estimated or actual total volume of this data product?',
             'DataType': 'FLOAT',
             'Value': float(edpub_json['form_data']['data_product_volume_amount']),
             'ParameterUnitsOfMeasure':edpub_json['form_data']['data_product_volume_units'],
            })
    
    # Add Data Compression Flag
    if 'data_file_compression_answer' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_file_compression_answer',
             'Description': 'Is internal compression applied to the data files in this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_file_compression_answer']),
            })
    
    # Add Data Product Status
    if 'data_product_status' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_status',
             'Description': 'After this data product has been published at the DAAC, will you continue to collect or create new data to extend the time series?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_product_status']),
            })

    # Add Frequency of Data Deliveries
    if 'data_delivery_frequency' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_delivery_frequency',
             'Description': 'What is the anticipated frequency of additional data deliveries to the DAAC?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_delivery_frequency'],
            })

    # Add Data Production Latency
    if 'data_production_latency_units' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_production_latency_units',
             'Description': 'What is the expected time difference between the latest data observation reference time and the delivery of that data to the DAAC?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_production_latency_units'],
            })

    # Add Data File Temporal Coverage
    if 'file_temporal_coverage_answer' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'file_temporal_coverage_answer',
             'Description': 'On average, how much time is covered by an individual data file?',
             'DataType': 'FLOAT',
             'Value': float(edpub_json['form_data']['file_temporal_coverage_answer']),
             'ParameterUnitsOfMeasure':edpub_json['form_data']['file_temporal_coverage_units'],
            })

    # Add Temporal Resolution
    if 'value_temporal_resolution_answer' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'value_temporal_resolution_answer',
             'Description': 'On average, what is the temporal resolution of an individual data value within the data files?',
             'DataType': 'FLOAT',
             'Value': float(edpub_json['form_data']['value_temporal_resolution_answer']),
             'ParameterUnitsOfMeasure':edpub_json['form_data']['value_temporal_resolution_units'],
            })

    # Add Data Processing Level
    if 'data_processing_level' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_processing_level',
             'Description': 'What is the NASA Data Processing Level of this data product?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['data_processing_level'],
            })

        if edpub_json['form_data']['data_processing_level'] == 'Other/Unsure':
            AdditionalAttributes.append(
                {'Name': 'data_processing_other_info',
                'Description': 'If Data Processing Level is \'Other/Unsure\'...',
                'DataType': 'STRING',
                'Value': edpub_json['form_data']['data_processing_other_info'],
                })

    # Add Primary Variables
    if 'variables_text' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'variables_text',
             'Description': 'What are the primary variables represented in this data product?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['variables_text'],
            })

    # Add Data Product Model Info
    if 'data_product_type_model' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_type_model',
             'Description': 'Are data within this data product model output?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_product_type_model']),
            })

    if 'model_data_product' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'model_data_product',
             'Description': 'What is the name and version of the model used to produce this data product?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['model_data_product'],
            })
    
    # Add Data Product Observation Info
    if 'data_product_type_observational' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'data_product_type_observational',
             'Description': 'Are data within this data product observational?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['data_product_type_observational']),
            })

    if 'platform_instrument' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'platform_instrument',
             'Description': 'What platform(s) and instrument(s) were used to collect the data within this data product?',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['platform_instrument'],
            })

    # Add Sample Data File(s) Info
    if 'example_file_url' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'example_file_url',
             'Description': 'Please provide a URL to a sample file(s).',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['example_file_url'],
            })

    # Add Browse Images Info
    if 'browse_images_provided' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'browse_images_provided',
             'Description': 'Will browse images representing the data be provided as part of this data product?',
             'DataType': 'BOOLEAN',
             'Value': to_bool(edpub_json['form_data']['browse_images_provided']),
            })

    if 'browse_images_other' in edpub_json['form_data'].keys():
        AdditionalAttributes.append(
            {'Name': 'browse_images_other',
             'Description': 'Additional information about browse images',
             'DataType': 'STRING',
             'Value': edpub_json['form_data']['browse_images_other'],
            })

    # Make UMM-C dictionary
    umm_c = {
        'MetadataLanguage': 'English',
        'MetadataSpecification': MetadataSpecification,
        'MetadataDates': MetadataDates,
        'TemporalExtents': TemporalExtents,
        'SpatialExtent': SpatialExtent,
        'EntryTitle': EntryTitle,
        'DOI': DOI,
        'Abstract': Abstract,
        'DataCenters':DataCenter,
        'AdditionalAttributes':AdditionalAttributes,
    }

    return umm_c

if __name__ == "__main__":
    #*** Parse command line arguments **************************************************#
    # Get Input File
    if (len(argv) > 1):
        input_file = argv[1]
        if isinstance(input_file, str):
            if not isfile(input_file):
                print('No file found corresponding to supplied INPUT_FILE argument')
                exit(1)
        else:
            print('Invalid argument for INPUT_FILE')
            exit(1)     
    else:
        input_file = None

    # Get Output File
    if (len(argv) > 2):
        output_file = argv[2]
    else:
        output_file = None

    #*** Do the actual processing work *************************************************#
    if input_file is not None:
        with open(input_file, 'rb') as json_fp:
            # Read EdPub JSON file
            json_file = json.load(json_fp)

            # Convert to UMM-C
            ummc = to_umm_c(json_file)

            # Write results to output
            print(input_file)
            print(output_file)
            
            if output_file is None:
                print(json.dumps(ummc, indent = 4))
            else:
                write_lines(output_file, json.dumps(ummc, indent = 4).split('\n'))

