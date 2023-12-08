import sys

class DBCON:
    """A simple class to return database connection information"""

    def __init__(self):
        self.dbuser = "root"
        self.dbpw = "daacome"
        self.daac_ingest_host = "db"
        self.daac_ingest_db = "daac_ingest"
