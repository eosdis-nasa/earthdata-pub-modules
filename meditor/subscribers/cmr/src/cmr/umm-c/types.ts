
// mEditor's schema extends the base UmmC schema
export interface mEditorUmmC extends UmmC {
    EntryID: string
    CmrProvider: string
}

export interface CmrUmmCFailResponse {
    errors: string[]
}

export interface CmrUmmCSuccessResponse {
    'concept-id': string
    'revision-id': number
    warnings: any | null
    'existing-errors': any | null
}

// Type definitions for UMM-C v1.17.0 Unified Metadata Model 
// Generated from JSON schema: https://git.earthdata.nasa.gov/projects/EMFD/repos/unified-metadata-model/browse/collection/v1.17.0

//* Generated with QuickType from schema v1.17.0
export interface UmmC {
    /**
     * A brief description of the collection or service the metadata represents.
     */
    Abstract: string
    /**
     * Allows the author to constrain access to the collection. This includes any special
     * restrictions, legal prerequisites, limitations and/or warnings on obtaining collection
     * data. Some words that may be used in this element's value include: Public, In-house,
     * Limited, None. The value field is used for special ACL rules (Access Control Lists
     * (http://en.wikipedia.org/wiki/Access_control_list)). For example it can be used to hide
     * metadata when it isn't ready for public consumption.
     */
    AccessConstraints?: AccessConstraintsType
    /**
     * The data’s distinctive attributes of the collection (i.e. attributes used to describe the
     * unique characteristics of the collection which extend beyond those defined).
     */
    AdditionalAttributes?: AdditionalAttributeType[]
    /**
     * Allows authors to provide words or phrases outside of the controlled Science Keyword
     * vocabulary, to further describe the collection.
     */
    AncillaryKeywords?: string[]
    /**
     * This element and all of its sub elements exist for display purposes. It allows a data
     * provider to provide archive and distribution information up front to an end user, to help
     * them decide if they can use the product.
     */
    ArchiveAndDistributionInformation?: ArchiveAndDistributionInformationType
    /**
     * This element stores DOIs that are associated with the collection such as from campaigns
     * and other related sources. Note: The values should start with the directory indicator
     * which in ESDIS' case is 10.  If the DOI was registered through ESDIS, the beginning of
     * the string should be 10.5067. The DOI URL is not stored here; it should be stored as a
     * RelatedURL. The DOI organization that is responsible for creating the DOI is described in
     * the Authority element. For ESDIS records the value of https://doi.org/ should be used.
     */
    AssociatedDOIs?: AssociatedDoiType[]
    /**
     * Information required to properly cite the collection in professional scientific
     * literature. This element provides information for constructing a citation for the item
     * itself, and is not designed for listing bibliographic references of scientific research
     * articles arising from search results. A list of references related to the research
     * results should be in the Publication Reference element.
     */
    CollectionCitations?: ResourceCitationType[]
    /**
     * This element is used to identify the collection's ready for end user consumption latency
     * from when the data was acquired by an instrument. NEAR_REAL_TIME is defined to be ready
     * for end user consumption 1 to 3 hours after data acquisition. LOW_LATENCY is defined to
     * be ready for consumption 3 to 24 hours after data acquisition. EXPEDITED is defined to be
     * 1 to 4 days after data acquisition. SCIENCE_QUALITY is defined to mean that a collection
     * has been fully and completely processed which usually takes between 2 to 3 weeks after
     * data acquisition. OTHER is defined for collection where the latency is between EXPEDITED
     * and SCIENCE_QUALITY.
     */
    CollectionDataType?: CollectionDataTypeEnum
    /**
     * This element describes the production status of the data set. There are five choices for
     * Data Providers: PLANNED refers to data sets to be collected in the future and are thus
     * unavailable at the present time. For Example: The Hydro spacecraft has not been launched,
     * but information on planned data sets may be available. ACTIVE refers to data sets
     * currently in production or data that is continuously being collected or updated. For
     * Example: data from the AIRS instrument on Aqua is being collected continuously. COMPLETE
     * refers to data sets in which no updates or further data collection will be made. For
     * Example: Nimbus-7 SMMR data collection has been completed. DEPRECATED refers to data sets
     * that have been retired, but still can be retrieved. Usually newer products exist that
     * replace the retired data set. NOT APPLICABLE refers to data sets in which a collection
     * progress is not applicable such as a calibration collection. There is a sixth value of
     * NOT PROVIDED that should not be used by a data provider. It is currently being used as a
     * value when a correct translation cannot be done with the current valid values, or when
     * the value is not provided by the data provider.
     */
    CollectionProgress: CollectionProgressEnum
    /**
     * Information about the personnel groups responsible for this collection and its metadata.
     */
    ContactGroups?: ContactGroupType[]
    /**
     * Information about the personnel responsible for this collection and its metadata.
     */
    ContactPersons?: ContactPersonType[]
    /**
     * Information about the data centers responsible for this collection and its metadata.
     */
    DataCenters: DataCenterType[]
    /**
     * Dates related to activities involving the collection data.  For example, Creation date is
     * the date that the collection data first entered the data archive system.
     */
    DataDates?: DateType[]
    /**
     * Describes the language used in the preparation, storage, and description of the
     * collection. It is the language of the collection data themselves.   It does not refer to
     * the language used in the metadata record (although this may be the same language).
     */
    DataLanguage?: string
    /**
     * This element allows end users to get direct access to data products that are stored in
     * the Amazon Web Service (AWS) S3 buckets. The sub elements include S3 credentials end
     * point and a documentation URL as well as bucket prefix names and an AWS region.
     */
    DirectDistributionInformation?: DirectDistributionInformationType
    /**
     * Formerly called Internal Directory Name (IDN) Node (IDN_Node). This element has been used
     * historically by the GCMD internally to identify association, responsibility and/or
     * ownership of the dataset, service or supplemental information. Note: This field only
     * occurs in the DIF. When a DIF record is retrieved in the ECHO10 or ISO 19115 formats,
     * this element will not be translated. The controlled vocabulary for directory names is
     * maintained in the Keyword Management System (KMS).
     */
    DirectoryNames?: DirectoryNameType[]
    /**
     * This element stores the DOI (Digital Object Identifier) that identifies the collection.
     * Note: The values should start with the directory indicator which in ESDIS' case is 10.
     * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
     * The DOI URL is not stored here; it should be stored as a RelatedURL. The DOI organization
     * that is responsible for creating the DOI is described in the Authority element. For ESDIS
     * records the value of https://doi.org/ should be used. For those that want to specify that
     * a DOI is not applicable or unknown use the second option.
     */
    DOI: DoiType
    /**
     * The title of the collection or service described by the metadata.
     */
    EntryTitle: string
    /**
     * Identifies the topic categories from the EN ISO 19115-1:2014 Geographic Information –
     * Metadata – Part 1: Fundamentals (http://www.isotc211.org/) Topic Category Code List that
     * pertain to this collection, based on the Science Keywords associated with the collection.
     * An ISO Topic Category is a high-level thematic classification to assist in the grouping
     * of and search for available collections. The controlled vocabulary for ISO topic
     * categories is maintained in the Keyword Management System (KMS).
     */
    ISOTopicCategories?: string[]
    /**
     * Controlled hierarchical keywords used to specify the spatial location of the
     * collection.   The controlled vocabulary for spatial keywords is maintained in the Keyword
     * Management System (KMS).  The Spatial Keyword hierarchy includes one or more of the
     * following layers: Category (e.g., Continent), Type (e.g. Africa), Subregion1 (e.g.,
     * Central Africa), Subregion2 (e.g., Cameroon), and Subregion3. DetailedLocation exists
     * outside the hierarchy.
     */
    LocationKeywords?: LocationKeywordType[]
    /**
     * This element is used to identify other services, collections, visualizations, granules,
     * and other metadata types and resources that are associated with or dependent on the data
     * described by the metadata. This element is also used to identify a parent metadata record
     * if it exists. This usage should be reserved for instances where a group of metadata
     * records are subsets that can be better represented by one parent metadata record, which
     * describes the entire set. In some instances, a child may point to more than one parent.
     * The EntryId is the same as the element described elsewhere in this document where it
     * contains an ID and Version.
     */
    MetadataAssociations?: MetadataAssociationType[]
    /**
     * Dates related to activities involving the metadata record itself.  For example, Future
     * Review date is the date that the metadata record is scheduled to be reviewed.
     */
    MetadataDates?: DateType[]
    /**
     * The language used in the metadata record.
     */
    MetadataLanguage?: string
    /**
     * Requires the client, or user, to add in schema information into every collection record.
     * It includes the schema's name, version, and URL location. The information is controlled
     * through enumerations at the end of this schema.
     */
    MetadataSpecification: MetadataSpecificationType
    /**
     * For paleoclimate or geologic data, PaleoTemporalCoverage is the length of time
     * represented by the data collected. PaleoTemporalCoverage should be used when the data
     * spans time frames earlier than yyyy-mm-dd = 0001-01-01.
     */
    PaleoTemporalCoverages?: PaleoTemporalCoverageType[]
    /**
     * Information about the relevant platform(s) used to acquire the data in the collection.
     * The controlled vocabulary for platform types is maintained in the Keyword Management
     * System (KMS), and includes Spacecraft, Aircraft, Vessel, Buoy, Platform, Station,
     * Network, Human, etc.
     */
    Platforms: PlatformType[]
    /**
     * The identifier for the processing level of the collection (e.g., Level0, Level1A).
     */
    ProcessingLevel: ProcessingLevelType
    /**
     * The name of the scientific program, field campaign, or project from which the data were
     * collected. This element is intended for the non-space assets such as aircraft, ground
     * systems, balloons, sondes, ships, etc. associated with campaigns. This element may also
     * cover a long term project that continuously creates new data sets — like MEaSUREs from
     * ISCCP and NVAP or CMARES from MISR. Project also includes the Campaign sub-element to
     * support multiple campaigns under the same project.
     */
    Projects?: ProjectType[]
    /**
     * Describes key bibliographic citations pertaining to the collection.
     */
    PublicationReferences?: PublicationReferenceType[]
    /**
     * Suggested usage or purpose for the collection data or service.
     */
    Purpose?: string
    /**
     * Free text description of the quality of the collection data.  Description may include: 1)
     * succinct description of the quality of data in the collection; 2) Any quality assurance
     * procedures followed in producing the data in the collection; 3) indicators of collection
     * quality or quality flags - both validated or invalidated; 4) recognized or potential
     * problems with quality; 5) established quality control mechanisms; and 6) established
     * quantitative quality measurements.
     */
    Quality?: string
    /**
     * This element describes any data/service related URLs that include project home pages,
     * services, related data archives/servers, metadata extensions, direct links to online
     * software packages, web mapping services, links to images, or other data.
     */
    RelatedUrls?: RelatedURLType[]
    /**
     * Controlled Science Keywords describing the collection.  The controlled vocabulary for
     * Science Keywords is maintained in the Keyword Management System (KMS).
     */
    ScienceKeywords: ScienceKeywordType[]
    /**
     * The short name associated with the collection.
     */
    ShortName: string
    SpatialExtent: SpatialExtentType
    /**
     * The reference frame or system in which altitudes (elevations) are given. The information
     * contains the datum name, distance units and encoding method, which provide the definition
     * for the system. This field also stores the characteristics of the reference frame or
     * system from which depths are measured. The additional information in the field is
     * geometry reference data etc.
     */
    SpatialInformation?: SpatialInformationType
    /**
     * This is deprecated and will be removed. Use LocationKeywords instead. Controlled
     * hierarchical keywords used to specify the spatial location of the collection.   The
     * controlled vocabulary for spatial keywords is maintained in the Keyword Management System
     * (KMS).  The Spatial Keyword hierarchy includes one or more of the following layers:
     * Location_Category (e.g., Continent), Location_Type (e.g. Africa), Location_Subregion1
     * (e.g., Central Africa), Location_Subregion2 (e.g., Cameroon), and Location_Subregion3.
     */
    SpatialKeywords?: string[]
    /**
     * This element is reserved for NASA records only. A Standard Product is a product that has
     * been vetted to ensure that they are complete, consistent, maintain integrity, and
     * satifies the goals of the Earth Observing System mission. The NASA product owners have
     * also commmitted to archiving and maintaining the data products. More information can be
     * found here:
     * https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-standard-products.
     */
    StandardProduct?: boolean
    /**
     * This class contains attributes which describe the temporal range of a specific
     * collection. Temporal Extent includes a specification of the Temporal Range Type of the
     * collection, which is one of Range Date Time, Single Date Time, or Periodic Date Time
     */
    TemporalExtents: TemporalExtentType[]
    /**
     * One or more words or phrases that describe the temporal resolution of the dataset.
     */
    TemporalKeywords?: string[]
    /**
     * Name of the two-dimensional tiling system for the collection.  Previously called
     * TwoDCoordinateSystem.
     */
    TilingIdentificationSystems?: TilingIdentificationSystemType[]
    /**
     * Designed to protect privacy and/or intellectual property by allowing the author to
     * specify how the collection may or may not be used after access is granted. This includes
     * any special restrictions, legal prerequisites, terms and conditions, and/or limitations
     * on using the item. Providers may request acknowledgement of the item from users and claim
     * no responsibility for quality and completeness. Note: Use Constraints describe how the
     * item may be used once access has been granted; and is distinct from Access Constraints,
     * which refers to any constraints in accessing the item.
     */
    UseConstraints?: UseConstraintsType
    /**
     * The Version of the collection.
     */
    Version: string
    /**
     * The Version Description of the collection.
     */
    VersionDescription?: string
}

/**
 * Allows the author to constrain access to the collection. This includes any special
 * restrictions, legal prerequisites, limitations and/or warnings on obtaining collection
 * data. Some words that may be used in this element's value include: Public, In-house,
 * Limited, None. The value field is used for special ACL rules (Access Control Lists
 * (http://en.wikipedia.org/wiki/Access_control_list)). For example it can be used to hide
 * metadata when it isn't ready for public consumption.
 *
 * Information about any constraints for accessing the data set. This includes any special
 * restrictions, legal prerequisites, limitations and/or warnings on obtaining the data set.
 */
export interface AccessConstraintsType {
    /**
     * Free-text description of the constraint.  In DIF, this field is called
     * Access_Constraint.   In ECHO, this field is called RestrictionComment.  Examples of text
     * in this field are Public, In-house, Limited.  Additional detailed instructions on how to
     * access the collection data may be entered in this field.
     */
    Description: string
    /**
     * Numeric value that is used with Access Control Language (ACLs) to restrict access to this
     * collection.  For example, a provider might specify a collection level ACL that hides all
     * collections with a value element set to 15.   In ECHO, this field is called
     * RestrictionFlag.  This field does not exist in DIF.
     */
    Value?: number
}

/**
 * Additional unique attributes of the collection, beyond those defined in the UMM model,
 * which the data provider deems useful for end-user understanding of the data in the
 * collection.  Additional attributes are also called Product Specific Attributes (PSAs) or
 * non-core attributes.  Examples are HORIZONTALTILENUMBER, VERTICALTILENUMBER.
 */
export interface AdditionalAttributeType {
    /**
     * Data type of the values of the additional attribute.
     */
    DataType: DataTypeEnum
    /**
     * Free-text description of the additional attribute.
     */
    Description: string
    /**
     * Identifies a namespace for the additional attribute name.
     */
    Group?: string
    /**
     * The smallest unit increment to which the additional attribute value is measured.
     */
    MeasurementResolution?: string
    /**
     * The name (1 word description) of the additional attribute.
     */
    Name: string
    /**
     * The minimum value of the additional attribute over the whole collection.
     */
    ParameterRangeBegin?: string
    /**
     * The maximum value of the additional attribute over the whole collection.
     */
    ParameterRangeEnd?: string
    /**
     * The standard unit of measurement for the additional attribute.  For example, meters,
     * hertz.
     */
    ParameterUnitsOfMeasure?: string
    /**
     * An estimate of the accuracy of the values of the additional attribute. For example, for
     * AVHRR: Measurement error or precision-measurement error or precision of a data product
     * parameter. This can be specified in percent or the unit with which the parameter is
     * measured.
     */
    ParameterValueAccuracy?: string
    /**
     * The date this additional attribute information was updated.
     */
    UpdateDate?: Date
    /**
     * Value of the additional attribute if it is the same for all granules across the
     * collection.  If the value of the additional attribute may differ by granule, leave this
     * collection-level value blank.
     */
    Value?: string
    /**
     * Describes the method used for determining the parameter value accuracy that is given for
     * this additional attribute.
     */
    ValueAccuracyExplanation?: string
}

/**
 * Data type of the values of the additional attribute.
 *
 * This entity contains the additional attribute data types.
 *
 * The datatype of the Characteristic/attribute.
 */
export enum DataTypeEnum {
    Boolean = 'BOOLEAN',
    Date = 'DATE',
    DateString = 'DATE_STRING',
    Datetime = 'DATETIME',
    DatetimeString = 'DATETIME_STRING',
    Float = 'FLOAT',
    Int = 'INT',
    String = 'STRING',
    Time = 'TIME',
    TimeString = 'TIME_STRING',
}

/**
 * This element and all of its sub elements exist for display purposes. It allows a data
 * provider to provide archive and distribution information up front to an end user, to help
 * them decide if they can use the product.
 */
export interface ArchiveAndDistributionInformationType {
    /**
     * This element defines a single archive artifact which a data provider would like to inform
     * an end user that it exists.
     */
    FileArchiveInformation?: FileArchiveInformationType[]
    /**
     * This element defines a single artifact that is distributed by the data provider. This
     * element only includes the distributable artifacts that can be obtained by the user
     * without the user having to invoke a service. These should be documented in the UMM-S
     * specification.
     */
    FileDistributionInformation?: FileDistributionInformationType[]
}

/**
 * This element defines a single archive artifact which a data provider would like to inform
 * an end user that it exists.
 */
export interface FileArchiveInformationType {
    /**
     * An approximate average size of the archivable item. This gives an end user an idea of the
     * magnitude for each archivable file if more than 1 exists.
     */
    AverageFileSize?: number
    /**
     * Unit of measure for the average file size.
     */
    AverageFileSizeUnit?: ArchiveDistributionUnitEnum
    /**
     * Provides the data provider a way to convey more information about the archivable item.
     */
    Description?: string
    /**
     * This element defines a single format for an archival artifact. Examples of format
     * include: ascii, binary, GRIB, BUFR, HDF4, HDF5, HDF-EOS4, HDF-EOS5, jpeg, png, tiff,
     * geotiff, kml. The controlled vocabulary for formats is maintained in the Keyword
     * Management System (KMS).
     */
    Format: string
    /**
     * Allows the record provider to provide supporting documentation about the Format.
     */
    FormatDescription?: string
    /**
     * Allows the provider to state whether the archivable item's format is its native format or
     * another supported format.
     */
    FormatType?: ArchiveDistributionFormatTypeEnum
    /**
     * An approximate total size of all of the archivable items within a collection. This gives
     * an end user an idea of the magnitude for all of archivable files combined.
     */
    TotalCollectionFileSize?: number
    /**
     * Unit of measure for the total collection file size.
     */
    TotalCollectionFileSizeUnit?: ArchiveDistributionUnitEnum
    /**
     * The date of which this collection started to collect data.  This date is used by users to
     * be able to calculate the current total collection file size. The date needs to be in the
     * yyyy-MM-ddTHH:mm:ssZ format; for example: 2018-01-01T10:00:00Z.
     */
    TotalCollectionFileSizeBeginDate?: Date
}

/**
 * Unit of measure for the average file size.
 *
 * Defines the possible values for the archive and distribution size units.
 *
 * Unit of measure for the total collection file size.
 */
export enum ArchiveDistributionUnitEnum {
    GB = 'GB',
    KB = 'KB',
    MB = 'MB',
    Na = 'NA',
    Pb = 'PB',
    TB = 'TB',
}

/**
 * Allows the provider to state whether the archivable item's format is its native format or
 * another supported format.
 *
 * Defines the possible values for the Archive or Distribution file format type.
 *
 * Allows the provider to state whether the distributable item's format is its native format
 * or another supported format.
 */
export enum ArchiveDistributionFormatTypeEnum {
    Native = 'Native',
    Supported = 'Supported',
}

/**
 * This element defines a single artifact that is distributed by the data provider. This
 * element only includes the distributable artifacts that can be obtained by the user
 * without the user having to invoke a service. These should be documented in the UMM-S
 * specification.
 */
export interface FileDistributionInformationType {
    /**
     * An approximate average size of the distributable item. This gives an end user an idea of
     * the magnitude for each distributable file if more than 1 exists.
     */
    AverageFileSize?: number
    /**
     * Unit of measure for the average file size.
     */
    AverageFileSizeUnit?: ArchiveDistributionUnitEnum
    /**
     * Provides the data provider a way to convey more information about the distributable item.
     */
    Description?: string
    /**
     * Conveys the price one has to pay to obtain the distributable item.
     */
    Fees?: string
    /**
     * This element defines a single format for a distributable artifact. Examples of format
     * include: ascii, binary, GRIB, BUFR, HDF4, HDF5, HDF-EOS4, HDF-EOS5, jpeg, png, tiff,
     * geotiff, kml.
     */
    Format: string
    /**
     * Allows the record provider to provide supporting documentation about the Format.
     */
    FormatDescription?: string
    /**
     * Allows the provider to state whether the distributable item's format is its native format
     * or another supported format.
     */
    FormatType?: ArchiveDistributionFormatTypeEnum
    /**
     * This element defines the media by which the end user can obtain the distributable item.
     * Each media type is listed separately. Examples of media include: CD-ROM, 9 track tape,
     * diskettes, hard drives, online, transparencies, hardcopy, etc.
     */
    Media?: string[]
    /**
     * An approximate total size of all of the distributable items within a collection. This
     * gives an end user an idea of the magnitude for all of distributable files combined.
     */
    TotalCollectionFileSize?: number
    /**
     * Unit of measure for the total collection file size.
     */
    TotalCollectionFileSizeUnit?: ArchiveDistributionUnitEnum
    /**
     * The date of which this collection started to collect data.  This date is used by users to
     * be able to calculate the current total collection file size. The date needs to be in the
     * yyyy-MM-ddTHH:mm:ssZ format; for example: 2018-01-01T10:00:00Z.
     */
    TotalCollectionFileSizeBeginDate?: Date
}

/**
 * This element stores the DOI (Digital Object Identifier) that identifies the collection.
 * Note: The values should start with the directory indicator which in ESDIS' case is 10.
 * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
 * The DOI URL is not stored here; it should be stored as a RelatedURL. The DOI organization
 * that is responsible for creating the DOI is described in the Authority element. For ESDIS
 * records the value of https://doi.org/ should be used. NASA metadata providers are
 * strongly encouraged to include DOI and DOI Authority for their collections using
 * CollectionDOI property.
 */
export interface AssociatedDoiType {
    /**
     * The DOI organization that is responsible for creating the DOI is described in the
     * Authority element. For ESDIS records the value of https://doi.org/ should be used.
     */
    Authority?: string
    /**
     * This element stores the DOI (Digital Object Identifier) that identifies the collection.
     * Note: The values should start with the directory indicator which in ESDIS' case is 10.
     * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
     * The DOI URL is not stored here; it should be stored as a RelatedURL.
     */
    DOI: string
    /**
     * The title of the DOI landing page. The title describes the DOI object to a user, so they
     * don't have to look it up themselves to understand the association.
     */
    Title?: string
}

/**
 * Building block text fields used to construct the recommended language for citing the
 * collection in professional scientific literature.  The citation language constructed from
 * these fields references the collection itself, and is not designed for listing
 * bibliographic references of scientific research articles arising from search results. A
 * list of references related to the research results should be in the Publication Reference
 * element.
 */
export interface ResourceCitationType {
    /**
     * The name of the organization(s) or individual(s) with primary intellectual responsibility
     * for the collection's development.
     */
    Creator?: string
    /**
     * The mode in which the data are represented, e.g. atlas, image, profile, text, etc.
     */
    DataPresentationForm?: string
    /**
     * The individual(s) responsible for changing the data in the collection.
     */
    Editor?: string
    /**
     * The volume or issue number of the publication (if applicable).
     */
    IssueIdentification?: string
    /**
     * The URL of the landing page for the collection.
     */
    OnlineResource?: OnlineResourceType
    /**
     * Additional free-text citation information.
     */
    OtherCitationDetails?: string
    /**
     * The name of the individual or organization that made the collection available for release.
     */
    Publisher?: string
    /**
     * The date when the collection was made available for release.
     */
    ReleaseDate?: Date
    /**
     * The name of the city (and state or province and country if needed) where the collection
     * was made available for release.
     */
    ReleasePlace?: string
    /**
     * The name of the data series, or aggregate data of which the data is a part.
     */
    SeriesName?: string
    /**
     * The title of the collection; this is the same as the collection Entry Title.
     */
    Title?: string
    /**
     * The version of the collection.
     */
    Version?: string
}

/**
 * The URL of the landing page for the collection.
 *
 * Describes the online resource pertaining to the data.
 *
 * The URL of the website related to the bibliographic citation.
 *
 * This element holds the URL and associated information to access the License on the web.
 * If this element is used the LicenseText element cannot be used.
 */
export interface OnlineResourceType {
    /**
     * The application profile holds the name of the application that can service the data. For
     * example if the URL points to a word document, then the applicationProfile is MS-Word.
     */
    ApplicationProfile?: string
    /**
     * The description of the online resource.
     */
    Description?: string
    /**
     * The function of the online resource. In ISO where this class originated the valid values
     * are: download, information, offlineAccess, order, and search.
     */
    Function?: string
    /**
     * The URL of the website related to the online resource.
     */
    Linkage: string
    /**
     * The mime type of the online resource.
     */
    MimeType?: URLMIMETypeEnum
    /**
     * The name of the online resource.
     */
    Name?: string
    /**
     * The protocol of the linkage for the online resource, such as https, svn, ftp, etc.
     */
    Protocol?: string
}

/**
 * The mime type of the online resource.
 *
 * The mime type of the service.
 */
export enum URLMIMETypeEnum {
    ApplicationGMLXML = 'application/gml+xml',
    ApplicationJSON = 'application/json',
    ApplicationOctetStream = 'application/octet-stream',
    ApplicationOpensearchdescriptionXML = 'application/opensearchdescription+xml',
    ApplicationPDF = 'application/pdf',
    ApplicationVndGoogleEarthKmlXML = 'application/vnd.google-earth.kml+xml',
    ApplicationVndGoogleEarthKmz = 'application/vnd.google-earth.kmz',
    ApplicationXHdf = 'application/x-hdf',
    ApplicationXML = 'application/xml',
    ApplicationXNetcdf = 'application/x-netcdf',
    ApplicationXhdf5 = 'application/xhdf5',
    ImageBMP = 'image/bmp',
    ImageGIF = 'image/gif',
    ImageJPEG = 'image/jpeg',
    ImagePNG = 'image/png',
    ImageTiff = 'image/tiff',
    ImageVndColladaXML = 'image/vnd.collada+xml',
    NotProvided = 'Not provided',
    TextCSV = 'text/csv',
    TextHTML = 'text/html',
    TextPlain = 'text/plain',
    TextXML = 'text/xml',
}

/**
 * This element is used to identify the collection's ready for end user consumption latency
 * from when the data was acquired by an instrument. NEAR_REAL_TIME is defined to be ready
 * for end user consumption 1 to 3 hours after data acquisition. LOW_LATENCY is defined to
 * be ready for consumption 3 to 24 hours after data acquisition. EXPEDITED is defined to be
 * 1 to 4 days after data acquisition. SCIENCE_QUALITY is defined to mean that a collection
 * has been fully and completely processed which usually takes between 2 to 3 weeks after
 * data acquisition. OTHER is defined for collection where the latency is between EXPEDITED
 * and SCIENCE_QUALITY.
 */
export enum CollectionDataTypeEnum {
    Expedited = 'EXPEDITED',
    LowLatency = 'LOW_LATENCY',
    NearRealTime = 'NEAR_REAL_TIME',
    Other = 'OTHER',
    ScienceQuality = 'SCIENCE_QUALITY',
}

/**
 * This element describes the production status of the data set. There are five choices for
 * Data Providers: PLANNED refers to data sets to be collected in the future and are thus
 * unavailable at the present time. For Example: The Hydro spacecraft has not been launched,
 * but information on planned data sets may be available. ACTIVE refers to data sets
 * currently in production or data that is continuously being collected or updated. For
 * Example: data from the AIRS instrument on Aqua is being collected continuously. COMPLETE
 * refers to data sets in which no updates or further data collection will be made. For
 * Example: Nimbus-7 SMMR data collection has been completed. DEPRECATED refers to data sets
 * that have been retired, but still can be retrieved. Usually newer products exist that
 * replace the retired data set. NOT APPLICABLE refers to data sets in which a collection
 * progress is not applicable such as a calibration collection. There is a sixth value of
 * NOT PROVIDED that should not be used by a data provider. It is currently being used as a
 * value when a correct translation cannot be done with the current valid values, or when
 * the value is not provided by the data provider.
 */
export enum CollectionProgressEnum {
    Active = 'ACTIVE',
    Complete = 'COMPLETE',
    Deprecated = 'DEPRECATED',
    NotApplicable = 'NOT APPLICABLE',
    NotProvided = 'NOT PROVIDED',
    Planned = 'PLANNED',
}

export interface ContactGroupType {
    /**
     * This is the contact information of the data contact.
     */
    ContactInformation?: ContactInformationType
    /**
     * This is the contact group name.
     */
    GroupName: string
    /**
     * This is the contact person or group that is not affiliated with the data centers.
     */
    NonDataCenterAffiliation?: string
    /**
     * This is the roles of the data contact.
     */
    Roles: DataContactRoleEnum[]
    /**
     * Uuid of the data contact.
     */
    Uuid?: string
}

/**
 * This is the contact information of the data contact.
 *
 * Defines the contact information of a data center or data contact.
 *
 * This is the contact information of the data center.
 */
export interface ContactInformationType {
    /**
     * Contact addresses.
     */
    Addresses?: AddressType[]
    /**
     * Supplemental instructions on how or when to contact the responsible party.
     */
    ContactInstruction?: string
    /**
     * Mechanisms of contacting.
     */
    ContactMechanisms?: ContactMechanismType[]
    /**
     * A URL associated with the contact, e.g., the home page for the DAAC which is responsible
     * for the collection.
     */
    RelatedUrls?: RelatedURLType[]
    /**
     * Time period when the contact answers questions or provides services.
     */
    ServiceHours?: string
}

/**
 * This entity contains the physical address details for the contact.
 */
export interface AddressType {
    /**
     * The city portion of the physical address.
     */
    City?: string
    /**
     * The country of the physical address.
     */
    Country?: string
    /**
     * The zip or other postal code portion of the physical address.
     */
    PostalCode?: string
    /**
     * The state or province portion of the physical address.
     */
    StateProvince?: string
    /**
     * An address line for the street address, used for mailing or physical addresses of
     * organizations or individuals who serve as contacts for the collection.
     */
    StreetAddresses?: string[]
}

/**
 * Method for contacting the data contact. A contact can be available via phone, email,
 * Facebook, or Twitter.
 */
export interface ContactMechanismType {
    /**
     * This is the method type for contacting the responsible party - phone, email, Facebook, or
     * Twitter.
     */
    Type: ContactMechanismTypeEnum
    /**
     * This is the contact phone number, email address, Facebook address, or Twitter handle
     * associated with the contact method.
     */
    Value: string
}

/**
 * This is the method type for contacting the responsible party - phone, email, Facebook, or
 * Twitter.
 *
 * Defines the possible contact mechanism types.
 */
export enum ContactMechanismTypeEnum {
    DirectLine = 'Direct Line',
    Email = 'Email',
    Facebook = 'Facebook',
    Fax = 'Fax',
    Mobile = 'Mobile',
    Modem = 'Modem',
    Other = 'Other',
    Primary = 'Primary',
    TDDTTYPhone = 'TDD/TTY Phone',
    Telephone = 'Telephone',
    Twitter = 'Twitter',
    USTollFree = 'U.S. toll free',
}

/**
 * Represents Internet sites that contain information related to the data, as well as
 * related Internet sites such as project home pages, related data archives/servers,
 * metadata extensions, online software packages, web mapping services, and
 * calibration/validation data.
 */
export interface RelatedURLType {
    /**
     * Description of the web page at this URL.
     */
    Description?: string
    /**
     * The data distribution information for the relevant web page (e.g., browse, media).
     */
    GetData?: GetDataType
    /**
     * The service distribution for the relevant web page (e.g., OPeNDAP, OpenSearch, WCS, WFS,
     * WMS).
     */
    GetService?: GetServiceType
    /**
     * A keyword describing the subtype of the online resource to this resource. This further
     * helps the GUI to know what to do with this resource. (e.g., 'MEDIA', 'BROWSE', 'OPENDAP',
     * 'OPENSEARCH', 'WEB COVERAGE SERVICES', 'WEB FEATURE SERVICES', 'WEB MAPPING SERVICES',
     * 'SSW', 'ESI'). The valid values are contained in the KMS System:
     * https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/all/8759ab63-ac04-4136-bc25-0c00eece1096?gtm_keyword=Related%20URL%20Content%20Types&gtm_scheme=rucontenttype.
     */
    Subtype?: string
    /**
     * A keyword describing the type of the online resource to this resource. This helps the GUI
     * to know what to do with this resource. (e.g., 'GET DATA', 'GET SERVICE', 'GET
     * VISUALIZATION'). The valid values are contained in the KMS System:
     * https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/all/8759ab63-ac04-4136-bc25-0c00eece1096?gtm_keyword=Related%20URL%20Content%20Types&gtm_scheme=rucontenttype.
     */
    Type: string
    /**
     * The URL for the relevant web page (e.g., the URL of the responsible organization's home
     * page, the URL of the collection landing page, the URL of the download site for the
     * collection).
     */
    URL: string
    /**
     * A keyword describing the distinct content type of the online resource to this resource.
     * (e.g., 'DATACENTER URL', 'DATA CONTACT URL', 'DISTRIBUTION URL'). The valid values are
     * contained in the KMS System:
     * https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/all/8759ab63-ac04-4136-bc25-0c00eece1096?gtm_keyword=Related%20URL%20Content%20Types&gtm_scheme=rucontenttype.
     */
    URLContentType: string
}

/**
 * The data distribution information for the relevant web page (e.g., browse, media).
 *
 * Represents the information needed for a DistributionURL where data is retrieved.
 */
export interface GetDataType {
    /**
     * The checksum, usually a SHA1 or md5 checksum for the data file.
     */
    Checksum?: string
    /**
     * The fee for ordering the collection data.  The fee is entered as a number, in US Dollars.
     */
    Fees?: string
    /**
     * The format of the data.  The controlled vocabulary for formats is maintained in the
     * Keyword Management System (KMS)
     */
    Format: string
    /**
     * The mime type of the service.
     */
    MimeType?: URLMIMETypeEnum
    /**
     * The size of the data.
     */
    Size: number
    /**
     * Unit of information, together with Size determines total size in bytes of the data.
     */
    Unit: Unit
}

/**
 * Unit of information, together with Size determines total size in bytes of the data.
 */
export enum Unit {
    GB = 'GB',
    KB = 'KB',
    MB = 'MB',
    Pb = 'PB',
    TB = 'TB',
}

/**
 * The service distribution for the relevant web page (e.g., OPeNDAP, OpenSearch, WCS, WFS,
 * WMS).
 *
 * Represents a Service through a URL where the service will act on data and return the
 * result to the caller.
 */
export interface GetServiceType {
    /**
     * The data identifier of the data provided by the service. Typically, this is a file name.
     */
    DataID: string
    /**
     * The data type of the data provided by the service.
     */
    DataType: string
    /**
     * The format of the data.
     */
    Format?: GetServiceTypeFormatEnum
    /**
     * The full name of the service.
     */
    FullName: string
    /**
     * The mime type of the service.
     */
    MimeType: URLMIMETypeEnum
    /**
     * The protocol of the service.
     */
    Protocol: Protocol
    /**
     * The URI of the data provided by the service.
     */
    URI?: string[]
}

/**
 * The format of the data.
 */
export enum GetServiceTypeFormatEnum {
    ASCII = 'ascii',
    Binary = 'binary',
    Bufr = 'BUFR',
    Geotiff = 'geotiff',
    Grib = 'GRIB',
    Hdf4 = 'HDF4',
    Hdf5 = 'HDF5',
    HdfEos4 = 'HDF-EOS4',
    HdfEos5 = 'HDF-EOS5',
    JPEG = 'jpeg',
    Kml = 'kml',
    NotProvided = 'Not provided',
    PNG = 'png',
    Tiff = 'tiff',
}

/**
 * The protocol of the service.
 */
export enum Protocol {
    FTP = 'FTP',
    Ftps = 'FTPS',
    HTTP = 'HTTP',
    HTTPS = 'HTTPS',
    NotProvided = 'Not provided',
}

/**
 * Defines the possible values of a data contact role.
 */
export enum DataContactRoleEnum {
    DataCenterContact = 'Data Center Contact',
    Investigator = 'Investigator',
    MetadataAuthor = 'Metadata Author',
    ScienceContact = 'Science Contact',
    ScienceSoftwareDevelopment = 'Science Software Development',
    TechnicalContact = 'Technical Contact',
    UserServices = 'User Services',
}

export interface ContactPersonType {
    /**
     * This is the contact information of the data contact.
     */
    ContactInformation?: ContactInformationType
    /**
     * First name of the individual.
     */
    FirstName?: string
    /**
     * Last name of the individual.
     */
    LastName: string
    /**
     * Middle name of the individual.
     */
    MiddleName?: string
    /**
     * This is the contact person or group that is not affiliated with the data centers.
     */
    NonDataCenterAffiliation?: string
    /**
     * This is the roles of the data contact.
     */
    Roles: DataContactRoleEnum[]
    /**
     * Uuid of the data contact.
     */
    Uuid?: string
}

/**
 * This element stores the DOI (Digital Object Identifier) that identifies the collection.
 * Note: The values should start with the directory indicator which in ESDIS' case is 10.
 * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
 * The DOI URL is not stored here; it should be stored as a RelatedURL. The DOI organization
 * that is responsible for creating the DOI is described in the Authority element. For ESDIS
 * records the value of https://doi.org/ should be used. For those that want to specify that
 * a DOI is not applicable or unknown use the second option.
 *
 * This element stores the DOI (Digital Object Identifier) that identifies the collection.
 * Note: The values should start with the directory indicator which in ESDIS' case is 10.
 * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
 * The DOI URL is not stored here; it should be stored as a RelatedURL. The DOI organization
 * that is responsible for creating the DOI is described in the Authority element. For ESDIS
 * records the value of https://doi.org/ should be used. For those that want to specify that
 * a DOI is not applicable or unknown for their record, use the second option.
 *
 * This element stores the fact that the DOI (Digital Object Identifier) is not applicable
 * or is unknown.
 */
export interface DoiType {
    /**
     * The DOI organization that is responsible for creating the DOI is described in the
     * Authority element. For ESDIS records the value of https://doi.org/ should be used.
     */
    Authority?: string
    /**
     * This element stores the DOI (Digital Object Identifier) that identifies the collection.
     * Note: The values should start with the directory indicator which in ESDIS' case is 10.
     * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
     * The DOI URL is not stored here; it should be stored as a RelatedURL.
     */
    DOI?: string
    /**
     * This element describes the reason the DOI is not applicable or unknown.
     */
    Explanation?: string
    /**
     * This element stores the fact that a DOI (Digital Object Identifier) is not applicable or
     * is unknown for this record.
     */
    MissingReason?: MissingReason
}

/**
 * This element stores the fact that a DOI (Digital Object Identifier) is not applicable or
 * is unknown for this record.
 */
export enum MissingReason {
    NotApplicable = 'Not Applicable',
    Unknown = 'Unknown',
}

/**
 * Defines a data center which is either an organization or institution responsible for
 * distributing, archiving, or processing the data, etc.
 */
export interface DataCenterType {
    /**
     * This is the contact groups of the data center.
     */
    ContactGroups?: ContactGroupType[]
    /**
     * This is the contact information of the data center.
     */
    ContactInformation?: ContactInformationType
    /**
     * This is the contact persons of the data center.
     */
    ContactPersons?: ContactPersonType[]
    /**
     * This is the long name of the data center.
     */
    LongName?: string
    /**
     * This is the roles of the data center.
     */
    Roles: DataCenterRoleEnum[]
    /**
     * This is the short name of the data center. The controlled vocabulary for data center
     * short names is maintained in the Keyword Management System (KMS).
     */
    ShortName: string
    /**
     * Uuid of the data center.
     */
    Uuid?: string
}

/**
 * Defines the possible values of a data center role.
 */
export enum DataCenterRoleEnum {
    Archiver = 'ARCHIVER',
    Distributor = 'DISTRIBUTOR',
    Originator = 'ORIGINATOR',
    Processor = 'PROCESSOR',
}

/**
 * Specifies the date and its type.
 */
export interface DateType {
    /**
     * This is the date that an event associated with the collection or its metadata occurred.
     */
    Date: Date
    /**
     * This is the type of event associated with the date.  For example, Creation, Last
     * Revision.  Type is chosen from a picklist.
     */
    Type: LineageDateEnum
}

/**
 * This is the type of event associated with the date.  For example, Creation, Last
 * Revision.  Type is chosen from a picklist.
 *
 * The name of supported lineage date types
 */
export enum LineageDateEnum {
    Create = 'CREATE',
    Delete = 'DELETE',
    Review = 'REVIEW',
    Update = 'UPDATE',
}

/**
 * This element allows end users to get direct access to data products that are stored in
 * the Amazon Web Service (AWS) S3 buckets. The sub elements include S3 credentials end
 * point and a documentation URL as well as bucket prefix names and an AWS region.
 */
export interface DirectDistributionInformationType {
    /**
     * Defines the possible values for the Amazon Web Service US Regions where the data product
     * resides.
     */
    Region: DirectDistributionInformationRegionEnum
    /**
     * Defines the possible values for the Amazon Web Service US S3 bucket and/or object prefix
     * names.
     */
    S3BucketAndObjectPrefixNames?: string[]
    /**
     * Defines the URL where the credential documentation are stored.
     */
    S3CredentialsAPIDocumentationURL: string
    /**
     * Defines the URL where the credentials are stored.
     */
    S3CredentialsAPIEndpoint: string
}

/**
 * Defines the possible values for the Amazon Web Service US Regions where the data product
 * resides.
 */
export enum DirectDistributionInformationRegionEnum {
    UsEast1 = 'us-east-1',
    UsEast2 = 'us-east-2',
    UsWest1 = 'us-west-1',
    UsWest2 = 'us-west-2',
}

/**
 * Formerly called Internal Directory Name (IDN) Node (IDN_Node). This element has been used
 * historically by the GCMD internally to identify association, responsibility and/or
 * ownership of the dataset, service or supplemental information. Note: This field only
 * occurs in the DIF. When a DIF record is retrieved in the ECHO10 or ISO 19115 formats,
 * this element will not be translated.
 */
export interface DirectoryNameType {
    LongName?: string
    ShortName: string
}

/**
 * This element defines a hierarchical location list. It replaces SpatialKeywords. The
 * controlled vocabulary for location keywords is maintained in the Keyword Management
 * System (KMS). Each tier must have data in the tier above it.
 */
export interface LocationKeywordType {
    /**
     * Top-level controlled keyword hierarchical level that contains the largest general
     * location where the collection data was taken from.
     */
    Category: string
    /**
     * Uncontrolled keyword hierarchical level that contains the specific location where the
     * collection data was taken from. Exists outside the hierarchy.
     */
    DetailedLocation?: string
    /**
     * Third-tier controlled keyword hierarchical level that contains the regional sub-location
     * where the collection data was taken from
     */
    Subregion1?: string
    /**
     * Fourth-tier controlled keyword hierarchical level that contains the regional sub-location
     * where the collection data was taken from
     */
    Subregion2?: string
    /**
     * Fifth-tier controlled keyword hierarchical level that contains the regional sub-location
     * where the collection data was taken from
     */
    Subregion3?: string
    /**
     * Second-tier controlled keyword hierarchical level that contains the regional location
     * where the collection data was taken from
     */
    Type?: string
}

/**
 * Used to identify other services, collections, visualizations, granules, and other
 * metadata types and resources that are associated with or dependent on this collection,
 * including parent-child relationships.
 */
export interface MetadataAssociationType {
    /**
     * Free-text description of the association between this collection record and the target
     * metadata record.
     */
    Description?: string
    /**
     * ShortName of the target metadata record that is associated with this collection record.
     */
    EntryId: string
    /**
     * The type of association between this collection metadata record and the target metadata
     * record.   Choose type from the drop-down list.
     */
    Type?: MetadataAssociateTypeEnum
    /**
     * The version of the target metadata record that is associated with this collection record.
     */
    Version?: string
}

/**
 * The type of association between this collection metadata record and the target metadata
 * record.   Choose type from the drop-down list.
 *
 * The set of supported values for MetadataAssociationType.Type.
 */
export enum MetadataAssociateTypeEnum {
    Child = 'CHILD',
    Dependent = 'DEPENDENT',
    Input = 'INPUT',
    LargerCitationWorks = 'LARGER CITATION WORKS',
    Parent = 'PARENT',
    Related = 'RELATED',
    ScienceAssociated = 'SCIENCE ASSOCIATED',
}

/**
 * Requires the client, or user, to add in schema information into every collection record.
 * It includes the schema's name, version, and URL location. The information is controlled
 * through enumerations at the end of this schema.
 *
 * This object requires any metadata record that is validated by this schema to provide
 * information about the schema.
 */
export interface MetadataSpecificationType {
    /**
     * This element represents the name of the schema.
     */
    Name: Name
    /**
     * This element represents the URL where the schema lives. The schema can be downloaded.
     */
    URL: URL
    /**
     * This element represents the version of the schema.
     */
    Version: Version
}

/**
 * This element represents the name of the schema.
 */
export enum Name {
    UmmC = 'UMM-C',
}

/**
 * This element represents the URL where the schema lives. The schema can be downloaded.
 */
export enum URL {
    HTTPSCDNEarthdataNasaGovUmmCollectionV1170 = 'https://cdn.earthdata.nasa.gov/umm/collection/v1.17.0',
}

/**
 * This element represents the version of the schema.
 */
export enum Version {
    The1170 = '1.17.0',
}

/**
 * For paleoclimate or geologic data, PaleoTemporalCoverage is the length of time
 * represented by the data collected. PaleoTemporalCoverage should be used when the data
 * spans time frames earlier than yyyy-mm-dd = 0001-01-01.
 */
export interface PaleoTemporalCoverageType {
    /**
     * Hierarchy of terms indicating units of geologic time, i.e., eon (e.g, Phanerozoic), era
     * (e.g., Cenozoic), period (e.g., Paleogene), epoch (e.g., Oligocene), and stage or age
     * (e.g, Chattian).
     */
    ChronostratigraphicUnits?: ChronostratigraphicUnitType[]
    /**
     * A string indicating the number of years closest to the present time, including units,
     * e.g., 10 ka.  Units may be Ga (billions of years before present), Ma (millions of years
     * before present), ka (thousands of years before present) or ybp (years before present).
     */
    EndDate?: string
    /**
     * A string indicating the number of years furthest back in time, including units, e.g., 100
     * Ga.  Units may be Ga (billions of years before present), Ma (millions of years before
     * present), ka (thousands of years before present) or ybp (years before present).
     */
    StartDate?: string
}

export interface ChronostratigraphicUnitType {
    DetailedClassification?: string
    Eon: string
    Epoch?: string
    Era?: string
    Period?: string
    Stage?: string
}

/**
 * Describes the relevant platforms used to acquire the data in the collection. The
 * controlled vocabularies for platform types and names are maintained in the Keyword
 * Management System (KMS).
 */
export interface PlatformType {
    /**
     * Platform-specific characteristics, e.g., Equator Crossing Time, Inclination Angle,
     * Orbital Period. The characteristic names must be unique on this platform; however the
     * names do not have to be unique across platforms.
     */
    Characteristics?: CharacteristicType[]
    Instruments?: InstrumentType[]
    LongName?: string
    ShortName: string
    /**
     * The most relevant platform type.
     */
    Type?: string
}

/**
 * This entity is used to define characteristics.
 */
export interface CharacteristicType {
    /**
     * The datatype of the Characteristic/attribute.
     */
    DataType: DataTypeEnum
    /**
     * Description of the Characteristic attribute.
     */
    Description: string
    /**
     * The name of the characteristic attribute.
     */
    Name: string
    /**
     * Units associated with the Characteristic attribute value.
     */
    Unit: string
    /**
     * The value of the Characteristic attribute.
     */
    Value: string
}

/**
 * Information about the device used to measure or record data in this collection, including
 * direct human observation. In cases where instruments have a single child instrument or
 * the instrument and child instrument are used synonymously (e.g. AVHRR), both Instrument
 * and ComposedOf should be recorded. The child instrument information is represented in a
 * separate section. The controlled vocabulary for instrument names is maintained in the
 * Keyword Management System (KMS).
 */
export interface InstrumentType {
    /**
     * Instrument-specific characteristics, e.g., Wavelength, SwathWidth, Field of View. The
     * characteristic names must be unique on this instrument; however the names do not have to
     * be unique across instruments.
     */
    Characteristics?: CharacteristicType[]
    ComposedOf?: InstrumentChildType[]
    LongName?: string
    /**
     * Number of instruments used on the instrument when acquiring the granule data.
     */
    NumberOfInstruments?: number
    /**
     * The operation mode applied on the instrument when acquiring the granule data.
     */
    OperationalModes?: string[]
    ShortName: string
    /**
     * The expanded name of the primary sensory instrument. (e.g. Advanced Spaceborne Thermal
     * Emission and Reflective Radiometer, Clouds and the Earth's Radiant Energy System, Human
     * Observation).
     */
    Technique?: string
}

/**
 * Child object on an instrument. Has all the same fields as instrument, minus the list of
 * child instruments.
 */
export interface InstrumentChildType {
    /**
     * Instrument-specific characteristics, e.g., Wavelength, SwathWidth, Field of View. The
     * characteristic names must be unique on this instrument; however the names do not have to
     * be unique across instruments.
     */
    Characteristics?: CharacteristicType[]
    LongName?: string
    ShortName: string
    /**
     * The expanded name of the primary sensory instrument. (e.g. Advanced Spaceborne Thermal
     * Emission and Reflective Radiometer, Clouds and the Earth's Radiant Energy System, Human
     * Observation).
     */
    Technique?: string
}

/**
 * The identifier for the processing level of the collection (e.g., Level0, Level1A).
 *
 * This element contains the Processing Level Id and the Processing Level Description
 */
export interface ProcessingLevelType {
    /**
     * An identifier indicating the level at which the data in the collection are processed,
     * ranging from Level0 (raw instrument data at full resolution) to Level4 (model output or
     * analysis results).  The value of Processing Level Id is chosen from a controlled
     * vocabulary.
     */
    Id: string
    /**
     * Description of the meaning of the Processing Level Id, e.g., the Description for the
     * Level4 Processing Level Id might be 'Model output or results from analyses of lower level
     * data'
     */
    ProcessingLevelDescription?: string
}

/**
 * Information describing the scientific endeavor(s) with which the collection is
 * associated. Scientific endeavors include campaigns, projects, interdisciplinary science
 * investigations, missions, field experiments, etc. The controlled vocabularies for project
 * names are maintained in the Keyword Management System (KMS)
 */
export interface ProjectType {
    /**
     * The name of the campaign/experiment (e.g. Global climate observing system).
     */
    Campaigns?: string[]
    /**
     * The ending data of the campaign.
     */
    EndDate?: Date
    /**
     * The expanded name of the campaign/experiment (e.g. Global climate observing system).
     */
    LongName?: string
    /**
     * The unique identifier by which a project or campaign/experiment is known. The
     * campaign/project is the scientific endeavor associated with the acquisition of the
     * collection. Collections may be associated with multiple campaigns.
     */
    ShortName: string
    /**
     * The starting date of the campaign.
     */
    StartDate?: Date
}

/**
 * Describes key bibliographic citations pertaining to the data.
 */
export interface PublicationReferenceType {
    /**
     * The author of the publication.
     */
    Author?: string
    /**
     * The Digital Object Identifier (DOI) of the publication.
     */
    DOI?: DoiDoiType
    /**
     * The edition of the publication.
     */
    Edition?: string
    /**
     * The ISBN of the publication.
     */
    ISBN?: string
    /**
     * The issue of the publication.
     */
    Issue?: string
    /**
     * The URL of the website related to the bibliographic citation.
     */
    OnlineResource?: OnlineResourceType
    /**
     * Additional free-text reference information about the publication.
     */
    OtherReferenceDetails?: string
    /**
     * The publication pages that are relevant.
     */
    Pages?: string
    /**
     * The date of the publication.
     */
    PublicationDate?: Date
    /**
     * The publication place of the publication.
     */
    PublicationPlace?: string
    /**
     * The publisher of the publication.
     */
    Publisher?: string
    /**
     * The report number of the publication.
     */
    ReportNumber?: string
    /**
     * The name of the series of the publication.
     */
    Series?: string
    /**
     * The title of the publication in the bibliographic citation.
     */
    Title?: string
    /**
     * The publication volume number.
     */
    Volume?: string
}

/**
 * The Digital Object Identifier (DOI) of the publication.
 *
 * This element stores the DOI (Digital Object Identifier) that identifies the collection.
 * Note: The values should start with the directory indicator which in ESDIS' case is 10.
 * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
 * The DOI URL is not stored here; it should be stored as a RelatedURL. The DOI organization
 * that is responsible for creating the DOI is described in the Authority element. For ESDIS
 * records the value of https://doi.org/ should be used. NASA metadata providers are
 * strongly encouraged to include DOI and DOI Authority for their collections using
 * CollectionDOI property.
 */
export interface DoiDoiType {
    /**
     * The DOI organization that is responsible for creating the DOI is described in the
     * Authority element. For ESDIS records the value of https://doi.org/ should be used.
     */
    Authority?: string
    /**
     * This element stores the DOI (Digital Object Identifier) that identifies the collection.
     * Note: The values should start with the directory indicator which in ESDIS' case is 10.
     * If the DOI was registered through ESDIS, the beginning of the string should be 10.5067.
     * The DOI URL is not stored here; it should be stored as a RelatedURL.
     */
    DOI: string
}

/**
 * Enables specification of Earth science keywords related to the collection.  The
 * controlled vocabulary for Science Keywords is maintained in the Keyword Management System
 * (KMS).
 */
export interface ScienceKeywordType {
    Category: string
    DetailedVariable?: string
    Term: string
    Topic: string
    VariableLevel1?: string
    VariableLevel2?: string
    VariableLevel3?: string
}

/**
 * Specifies the geographic and vertical (altitude, depth) coverage of the data.
 */
export interface SpatialExtentType {
    GranuleSpatialRepresentation: GranuleSpatialRepresentationEnum
    HorizontalSpatialDomain?: HorizontalSpatialDomainType
    OrbitParameters?: OrbitParametersType
    /**
     * Denotes whether the collection's spatial coverage requires horizontal, vertical,
     * horizontal and vertical, orbit, or vertical and orbit in the spatial domain and
     * coordinate system definitions.
     */
    SpatialCoverageType?: SpatialCoverageTypeEnum
    VerticalSpatialDomains?: VerticalSpatialDomainType[]
}

export enum GranuleSpatialRepresentationEnum {
    Cartesian = 'CARTESIAN',
    Geodetic = 'GEODETIC',
    NoSpatial = 'NO_SPATIAL',
    Orbit = 'ORBIT',
}

/**
 * Information about a collection with horizontal spatial coverage.
 */
export interface HorizontalSpatialDomainType {
    Geometry: GeometryType
    /**
     * Specifies the horizontal spatial extents coordinate system and its resolution.
     */
    ResolutionAndCoordinateSystem?: ResolutionAndCoordinateSystemType
    /**
     * The appropriate numeric or alpha code used to identify the various zones in the
     * collection's grid coordinate system.
     */
    ZoneIdentifier?: string
}

export interface GeometryType {
    BoundingRectangles?: BoundingRectangleType[]
    CoordinateSystem: CoordinateSystemEnum
    GPolygons?: GPolygonType[]
    Lines?: LineType[]
    Points?: PointType[]
}

export interface BoundingRectangleType {
    EastBoundingCoordinate: number
    NorthBoundingCoordinate: number
    SouthBoundingCoordinate: number
    WestBoundingCoordinate: number
}

export enum CoordinateSystemEnum {
    Cartesian = 'CARTESIAN',
    Geodetic = 'GEODETIC',
}

export interface GPolygonType {
    Boundary: BoundaryType
    ExclusiveZone?: ExclusiveZoneType
}

/**
 * A boundary is set of points connected by straight lines representing a polygon on the
 * earth. It takes a minimum of three points to make a boundary. Points must be specified in
 * counter-clockwise order and closed (the first and last vertices are the same).
 */
export interface BoundaryType {
    Points: PointType[]
}

/**
 * The longitude and latitude values of a spatially referenced point in degrees.
 */
export interface PointType {
    Latitude: number
    Longitude: number
}

/**
 * Contains the excluded boundaries from the GPolygon.
 */
export interface ExclusiveZoneType {
    Boundaries: BoundaryType[]
}

export interface LineType {
    Points: PointType[]
}

/**
 * Specifies the horizontal spatial extents coordinate system and its resolution.
 *
 * This class defines the horizontal spatial extents coordinate system and the data
 * product's horizontal data resolution. The horizontal data resolution is defined as the
 * smallest horizontal distance between successive elements of data in a dataset. This is
 * synonymous with terms such as ground sample distance, sample spacing and pixel size. It
 * is to be noted that the horizontal data resolution could be different in the two
 * horizontal dimensions. Also, it is different from the spatial resolution of an
 * instrument, which is the minimum distance between points that an instrument can see as
 * distinct.
 */
export interface ResolutionAndCoordinateSystemType {
    /**
     * This element holds a description about the resolution and coordinate system for people to
     * read.
     */
    Description?: string
    /**
     * This element describes the geodetic model for the data product.
     */
    GeodeticModel?: GeodeticModelType
    /**
     * This class defines a number of the data products horizontal data resolution. The
     * horizontal data resolution is defined as the smallest horizontal distance between
     * successive elements of data in a dataset. This is synonymous with terms such as ground
     * sample distance, sample spacing and pixel size. It is to be noted that the horizontal
     * data resolution could be different in the two horizontal dimensions. Also, it is
     * different from the spatial resolution of an instrument, which is the minimum distance
     * between points that an instrument can see as distinct.
     */
    HorizontalDataResolution?: HorizontalDataResolutionType
    /**
     * This element describes the local coordinate system for the data product.
     */
    LocalCoordinateSystem?: LocalCoordinateSystemType
}

/**
 * This element describes the geodetic model for the data product.
 */
export interface GeodeticModelType {
    /**
     * The ratio of the Earth's major axis to the difference between the major and the minor.
     */
    DenominatorOfFlatteningRatio?: number
    /**
     * Identification given to established representation of the Earth's shape.
     */
    EllipsoidName?: string
    /**
     * The identification given to the reference system used for defining the coordinates of
     * points.
     */
    HorizontalDatumName?: string
    /**
     * Radius of the equatorial axis of the ellipsoid.
     */
    SemiMajorAxis?: number
}

/**
 * This class defines a number of the data products horizontal data resolution. The
 * horizontal data resolution is defined as the smallest horizontal distance between
 * successive elements of data in a dataset. This is synonymous with terms such as ground
 * sample distance, sample spacing and pixel size. It is to be noted that the horizontal
 * data resolution could be different in the two horizontal dimensions. Also, it is
 * different from the spatial resolution of an instrument, which is the minimum distance
 * between points that an instrument can see as distinct.
 */
export interface HorizontalDataResolutionType {
    /**
     * Generic Resolutions object describes general resolution data for a data product where it
     * is not known if a data product is gridded or not.
     */
    GenericResolutions?: HorizontalDataGenericResolutionType[]
    /**
     * Gridded Range Resolutions object describes range resolution data for gridded data
     * products.
     */
    GriddedRangeResolutions?: HorizontalDataResolutionGriddedRangeType[]
    /**
     * Gridded Resolutions object describes resolution data for gridded data products.
     */
    GriddedResolutions?: HorizontalDataResolutionGriddedType[]
    /**
     * Non Gridded Range Resolutions object describes range resolution data for non gridded data
     * products.
     */
    NonGriddedRangeResolutions?: HorizontalDataResolutionNonGriddedRangeType[]
    /**
     * Non Gridded Resolutions object describes resolution data for non gridded data products.
     */
    NonGriddedResolutions?: HorizontalDataResolutionNonGriddedType[]
    /**
     * Point Resolution object describes a data product that is from a point source.
     */
    PointResolution?: HorizontalDataResolutionPointType
    /**
     * Varies Resolution object describes a data product that has a number of resolution values.
     */
    VariesResolution?: HorizontalDataResolutionVariesType
}

/**
 * Generic Resolutions object describes general resolution data for a data product where it
 * is not known if a data product is gridded or not.
 */
export interface HorizontalDataGenericResolutionType {
    /**
     * Units of measure used for the XDimension and YDimension values.
     */
    Unit: HorizontalDataResolutionUnitEnum
    /**
     * The minimum difference between two adjacent values on a horizontal plane in the X axis.
     * In most cases this is along the longitudinal axis.
     */
    XDimension?: number
    /**
     * The minimum difference between two adjacent values on a horizontal plan in the Y axis. In
     * most cases this is along the latitudinal axis.
     */
    YDimension?: number
}

/**
 * Units of measure used for the XDimension and YDimension values.
 *
 * Units of measure used for the geodetic latitude and longitude resolution values (e.g.,
 * decimal degrees).
 */
export enum HorizontalDataResolutionUnitEnum {
    DecimalDegrees = 'Decimal Degrees',
    Kilometers = 'Kilometers',
    Meters = 'Meters',
    NauticalMiles = 'Nautical Miles',
    NotProvided = 'Not provided',
    StatuteMiles = 'Statute Miles',
}

/**
 * Gridded Range Resolutions object describes range resolution data for gridded data
 * products.
 */
export interface HorizontalDataResolutionGriddedRangeType {
    /**
     * The maximum, minimum difference between two adjacent values on a horizontal plane in the
     * X axis. In most cases this is along the longitudinal axis.
     */
    MaximumXDimension?: number
    /**
     * The maximum, minimum difference between two adjacent values on a horizontal plan in the Y
     * axis. In most cases this is along the latitudinal axis.
     */
    MaximumYDimension?: number
    /**
     * The minimum, minimum difference between two adjacent values on a horizontal plane in the
     * X axis. In most cases this is along the longitudinal axis.
     */
    MinimumXDimension?: number
    /**
     * The minimum, minimum difference between two adjacent values on a horizontal plan in the Y
     * axis. In most cases this is along the latitudinal axis.
     */
    MinimumYDimension?: number
    /**
     * Units of measure used for the XDimension and YDimension values.
     */
    Unit: HorizontalDataResolutionUnitEnum
}

/**
 * Gridded Resolutions object describes resolution data for gridded data products.
 */
export interface HorizontalDataResolutionGriddedType {
    /**
     * Units of measure used for the XDimension and YDimension values.
     */
    Unit: HorizontalDataResolutionUnitEnum
    /**
     * The minimum difference between two adjacent values on a horizontal plane in the X axis.
     * In most cases this is along the longitudinal axis.
     */
    XDimension?: number
    /**
     * The minimum difference between two adjacent values on a horizontal plan in the Y axis. In
     * most cases this is along the latitudinal axis.
     */
    YDimension?: number
}

/**
 * Non Gridded Range Resolutions object describes range resolution data for non gridded data
 * products.
 */
export interface HorizontalDataResolutionNonGriddedRangeType {
    /**
     * The maximum, minimum difference between two adjacent values on a horizontal plane in the
     * X axis. In most cases this is along the longitudinal axis.
     */
    MaximumXDimension?: number
    /**
     * The maximum, minimum difference between two adjacent values on a horizontal plan in the Y
     * axis. In most cases this is along the latitudinal axis.
     */
    MaximumYDimension?: number
    /**
     * The minimum, minimum difference between two adjacent values on a horizontal plane in the
     * X axis. In most cases this is along the longitudinal axis.
     */
    MinimumXDimension?: number
    /**
     * The minimum, minimum difference between two adjacent values on a horizontal plan in the Y
     * axis. In most cases this is along the latitudinal axis.
     */
    MinimumYDimension?: number
    /**
     * This element describes the instrument scanning direction.
     */
    ScanDirection?: HorizontalResolutionScanDirectionType
    /**
     * Units of measure used for the XDimension and YDimension values.
     */
    Unit: HorizontalDataResolutionUnitEnum
    /**
     * This element describes the angle of the measurement with respect to the instrument that
     * gives an understanding of the specified resolution.
     */
    ViewingAngleType?: HorizontalResolutionViewingAngleType
}

/**
 * This element describes the instrument scanning direction.
 */
export enum HorizontalResolutionScanDirectionType {
    AlongTrack = 'Along Track',
    CrossTrack = 'Cross Track',
}

/**
 * This element describes the angle of the measurement with respect to the instrument that
 * gives an understanding of the specified resolution.
 *
 * This element describes the angle of the measurement with respect to the instrument that
 * give an understanding of the specified resolution.
 */
export enum HorizontalResolutionViewingAngleType {
    AtNadir = 'At Nadir',
    ScanExtremes = 'Scan Extremes',
}

/**
 * Non Gridded Resolutions object describes resolution data for non gridded data products.
 */
export interface HorizontalDataResolutionNonGriddedType {
    /**
     * This element describes the instrument scanning direction.
     */
    ScanDirection?: HorizontalResolutionScanDirectionType
    /**
     * Units of measure used for the XDimension and YDimension values.
     */
    Unit: HorizontalDataResolutionUnitEnum
    /**
     * This element describes the angle of the measurement with respect to the instrument that
     * gives an understanding of the specified resolution.
     */
    ViewingAngleType?: HorizontalResolutionViewingAngleType
    /**
     * The minimum difference between two adjacent values on a horizontal plane in the X axis.
     * In most cases this is along the longitudinal axis.
     */
    XDimension?: number
    /**
     * The minimum difference between two adjacent values on a horizontal plan in the Y axis. In
     * most cases this is along the latitudinal axis.
     */
    YDimension?: number
}

/**
 * Point Resolution object describes a data product that is from a point source.
 */
export enum HorizontalDataResolutionPointType {
    Point = 'Point',
}

/**
 * Varies Resolution object describes a data product that has a number of resolution values.
 */
export enum HorizontalDataResolutionVariesType {
    Varies = 'Varies',
}

/**
 * This element describes the local coordinate system for the data product.
 */
export interface LocalCoordinateSystemType {
    /**
     * A description of the Local Coordinate System and geo-reference information.
     */
    Description?: string
    /**
     * The information provided to register the local system to the Earth (e.g. control points,
     * satellite ephemeral data, and inertial navigation data).
     */
    GeoReferenceInformation?: string
}

/**
 * Orbit parameters for the collection used by the Orbital Backtrack Algorithm.
 */
export interface OrbitParametersType {
    /**
     * A list of instrument footprints or field of views. A footprint holds the largest width of
     * the described footprint as measured on the earths surface along with the width's unit. An
     * optional description element exists to be able to distinguish between the footprints, if
     * that is desired. This element is optional. If this element is used at least 1 footprint
     * must exist in the list.
     */
    Footprints?: FootprintType[]
    /**
     * The heading of the satellite as it crosses the equator on the ascending pass. This is the
     * same as (180-declination) and also the same as the highest latitude achieved by the
     * satellite.
     */
    InclinationAngle: number
    /**
     * The InclinationAngle value's unit.
     */
    InclinationAngleUnit: EUnit
    /**
     * The number of full orbits composing each granule. This may be a fraction of an orbit.
     */
    NumberOfOrbits: number
    /**
     * The time in decimal minutes the satellite takes to make one full orbit.
     */
    OrbitPeriod: number
    /**
     * The Orbit Period value's unit.
     */
    OrbitPeriodUnit: OrbitPeriodUnit
    /**
     * The latitude start of the orbit relative to the equator. This is used by the backtrack
     * search algorithm to treat the orbit as if it starts from the specified latitude. This is
     * optional and will default to 0 if not specified.
     */
    StartCircularLatitude?: number
    /**
     * The StartCircularLatitude value's unit.
     */
    StartCircularLatitudeUnit?: EUnit
    /**
     * Total observable width of the satellite sensor nominally measured at the equator.
     */
    SwathWidth?: number
    /**
     * The SwathWidth value's unit.
     */
    SwathWidthUnit?: SwathWidthUnitEnum
}

/**
 * The largest width of an instrument's footprint as measured on the Earths surface. The
 * largest Footprint takes the place of SwathWidth in the Orbit Backtrack Algorithm if
 * SwathWidth does not exist. The optional description element allows the user of the record
 * to be able to distinguish between the different footprints of an instrument if it has
 * more than 1.
 */
export interface FootprintType {
    /**
     * The description element allows the user of the record to be able to distinguish between
     * the different footprints of an instrument if it has more than 1.
     */
    Description?: string
    /**
     * The largest width of an instrument's footprint as measured on the Earths surface. The
     * largest Footprint takes the place of SwathWidth in the Orbit Backtrack Algorithm if
     * SwathWidth does not exist.
     */
    Footprint: number
    /**
     * The Footprint value's unit.
     */
    FootprintUnit: SwathWidthUnitEnum
}

/**
 * The Footprint value's unit.
 *
 * The SwathWidth value's unit.
 */
export enum SwathWidthUnitEnum {
    Kilometer = 'Kilometer',
    Meter = 'Meter',
}

/**
 * The InclinationAngle value's unit.
 *
 * The StartCircularLatitude value's unit.
 */
export enum EUnit {
    Degree = 'Degree',
}

/**
 * The Orbit Period value's unit.
 */
export enum OrbitPeriodUnit {
    DecimalMinute = 'Decimal Minute',
}

/**
 * Denotes whether the collection's spatial coverage requires horizontal, vertical,
 * horizontal and vertical, orbit, or vertical and orbit in the spatial domain and
 * coordinate system definitions.
 */
export enum SpatialCoverageTypeEnum {
    Horizontal = 'HORIZONTAL',
    HorizontalOrbital = 'HORIZONTAL_ORBITAL',
    HorizontalVertical = 'HORIZONTAL_VERTICAL',
    HorizontalVerticalOrbital = 'HORIZONTAL_VERTICAL_ORBITAL',
    Orbital = 'ORBITAL',
    OrbitalVertical = 'ORBITAL_VERTICAL',
    Vertical = 'VERTICAL',
}

export interface VerticalSpatialDomainType {
    /**
     * Describes the type of the area of vertical space covered by the collection locality.
     */
    Type: VerticalSpatialDomainTypeEnum
    /**
     * Describes the extent of the area of vertical space covered by the collection. Must be
     * accompanied by an Altitude Encoding Method description. The datatype for this attribute
     * is the value of the attribute VerticalSpatialDomainType. The unit for this attribute is
     * the value of either DepthDistanceUnits or AltitudeDistanceUnits.
     */
    Value: string
}

/**
 * Describes the type of the area of vertical space covered by the collection locality.
 */
export enum VerticalSpatialDomainTypeEnum {
    AtmosphereLayer = 'Atmosphere Layer',
    MaximumAltitude = 'Maximum Altitude',
    MaximumDepth = 'Maximum Depth',
    MinimumAltitude = 'Minimum Altitude',
    MinimumDepth = 'Minimum Depth',
}

/**
 * The reference frame or system in which altitudes (elevations) are given. The information
 * contains the datum name, distance units and encoding method, which provide the definition
 * for the system. This field also stores the characteristics of the reference frame or
 * system from which depths are measured. The additional information in the field is
 * geometry reference data etc.
 *
 * This entity stores the reference frame or system from which horizontal and vertical
 * spatial domains are measured. The horizontal reference frame includes a Geodetic Model,
 * Geographic Coordinates, and Local Coordinates. The Vertical reference frame includes
 * altitudes (elevations) and depths.
 */
export interface SpatialInformationType {
    /**
     * Denotes whether the spatial coverage of the collection is horizontal, vertical,
     * horizontal and vertical, orbit, or vertical and orbit.
     */
    SpatialCoverageType: string
    VerticalCoordinateSystem?: VerticalCoordinateSystemType
}

export interface VerticalCoordinateSystemType {
    AltitudeSystemDefinition?: AltitudeSystemDefinitionType
    DepthSystemDefinition?: DepthSystemDefinitionType
}

/**
 * The reference frame or system from which altitude is measured. The term 'altitude' is
 * used instead of the common term 'elevation' to conform to the terminology in Federal
 * Information Processing Standards 70-1 and 173. The information contains the datum name,
 * distance units and encoding method, which provide the definition for the system.
 */
export interface AltitudeSystemDefinitionType {
    /**
     * The identification given to the level surface taken as the surface of reference from
     * which measurements are compared.
     */
    DatumName?: string
    /**
     * The units in which measurements are recorded.
     */
    DistanceUnits?: AltitudeDistanceUnitsEnum
    /**
     * The minimum distance possible between two adjacent values, expressed in distance units of
     * measure for the collection.
     */
    Resolutions?: number[]
}

/**
 * The units in which measurements are recorded.
 *
 * The units in which altitude measurements are recorded.
 */
export enum AltitudeDistanceUnitsEnum {
    HectoPascals = 'HectoPascals',
    Kilometers = 'Kilometers',
    Millibars = 'Millibars',
}

/**
 * The reference frame or system from which depth is measured. The information contains the
 * datum name, distance units and encoding method, which provide the definition for the
 * system.
 */
export interface DepthSystemDefinitionType {
    /**
     * The identification given to the level surface taken as the surface of reference from
     * which measurements are compared.
     */
    DatumName?: string
    /**
     * The units in which measurements are recorded.
     */
    DistanceUnits?: DepthDistanceUnitsEnum
    /**
     * The minimum distance possible between two adjacent values, expressed in distance units of
     * measure for the collection.
     */
    Resolutions?: number[]
}

/**
 * The units in which measurements are recorded.
 *
 * The units in which depth measurements are recorded.
 */
export enum DepthDistanceUnitsEnum {
    Fathoms = 'Fathoms',
    Feet = 'Feet',
    HectoPascals = 'HectoPascals',
    Meters = 'Meters',
    Millibars = 'Millibars',
}

/**
 * Information which describes the temporal range or extent of a specific collection.
 */
export interface TemporalExtentType {
    /**
     * Setting the Ends At Present Flag to 'True' indicates that a data collection which covers,
     * temporally, a discontinuous range, currently ends at the present date.  Setting the Ends
     * at Present flag to 'True' eliminates the need to continuously update the Range Ending
     * Time for collections where granules are continuously being added to the collection
     * inventory.
     */
    EndsAtPresentFlag?: boolean
    /**
     * Temporal information about a collection having granules collected at a regularly
     * occurring period.   Information includes the start and end dates of the period, duration
     * unit and value, and cycle duration unit and value.
     */
    PeriodicDateTimes?: PeriodicDateTimeType[]
    /**
     * The precision (position in number of places to right of decimal point) of seconds used in
     * measurement.
     */
    PrecisionOfSeconds?: number
    /**
     * Stores the start and end date/time of a collection.
     */
    RangeDateTimes?: RangeDateTimeType[]
    SingleDateTimes?: Date[]
}

/**
 * Information about Periodic Date Time collections, including the name of the temporal
 * period in addition to the start and end dates, duration unit and value, and cycle
 * duration unit and value.
 */
export interface PeriodicDateTimeType {
    /**
     * The unit specification for the period duration.
     */
    DurationUnit: DurationUnitEnum
    /**
     * The number of PeriodDurationUnits in the RegularPeriodic period. e.g. the RegularPeriodic
     * event 'Spring-North Hemi' might have a PeriodDurationUnit='MONTH' PeriodDurationValue='3'
     * PeriodCycleDurationUnit='YEAR' PeriodCycleDurationValue='1' indicating that Spring-North
     * Hemi lasts for 3 months and has a cycle duration of 1 year. The unit for the attribute is
     * the value of the attribute PeriodDurationValue.
     */
    DurationValue: number
    /**
     * The date (day and time) of the end occurrence of this regularly occurring period which is
     * relevant to the collection coverage.
     */
    EndDate: Date
    /**
     * The name given to the recurring time period. e.g. 'spring - north hemi.'
     */
    Name: string
    /**
     * The unit specification of the period cycle duration.
     */
    PeriodCycleDurationUnit: DurationUnitEnum
    PeriodCycleDurationValue: number
    /**
     * The date (day and time) of the first occurrence of this regularly occurring period which
     * is relevant to the collection coverage.
     */
    StartDate: Date
}

/**
 * The unit specification for the period duration.
 *
 * The unit specification of the period cycle duration.
 */
export enum DurationUnitEnum {
    Day = 'DAY',
    Month = 'MONTH',
    Year = 'YEAR',
}

/**
 * Stores the start and end date/time of a collection.
 */
export interface RangeDateTimeType {
    /**
     * The time when the temporal coverage period being described began.
     */
    BeginningDateTime: Date
    /**
     * The time when the temporal coverage period being described ended.
     */
    EndingDateTime?: Date
}

/**
 * Information about a two-dimensional tiling system related to this collection.
 */
export interface TilingIdentificationSystemType {
    Coordinate1: TilingCoordinateType
    Coordinate2: TilingCoordinateType
    TilingIdentificationSystemName: TilingIdentificationSystemNameEnum
}

/**
 * Defines the minimum and maximum value for one dimension of a two dimensional coordinate
 * system.
 */
export interface TilingCoordinateType {
    MaximumValue?: number
    MinimumValue?: number
}

export enum TilingIdentificationSystemNameEnum {
    Calipso = 'CALIPSO',
    MODISTileEASE = 'MODIS Tile EASE',
    MODISTileSIN = 'MODIS Tile SIN',
    MilitaryGridReferenceSystem = 'Military Grid Reference System',
    Misr = 'MISR',
    WELDAlaskaTile = 'WELD Alaska Tile',
    WELDCONUSTile = 'WELD CONUS Tile',
    Wrs1 = 'WRS-1',
    Wrs2 = 'WRS-2',
}

/**
 * Designed to protect privacy and/or intellectual property by allowing the author to
 * specify how the collection may or may not be used after access is granted. This includes
 * any special restrictions, legal prerequisites, terms and conditions, and/or limitations
 * on using the item. Providers may request acknowledgement of the item from users and claim
 * no responsibility for quality and completeness. Note: Use Constraints describe how the
 * item may be used once access has been granted; and is distinct from Access Constraints,
 * which refers to any constraints in accessing the item.
 *
 * This element defines how the data may or may not be used after access is granted to
 * assure the protection of privacy or intellectual property. This includes license text,
 * license URL, or any special restrictions, legal prerequisites, terms and conditions,
 * and/or limitations on using the data set. Data providers may request acknowledgement of
 * the data from users and claim no responsibility for quality and completeness of data.
 */
export interface UseConstraintsType {
    Description?: string
    FreeAndOpenData?: boolean
    /**
     * This element holds the URL and associated information to access the License on the web.
     * If this element is used the LicenseText element cannot be used.
     */
    LicenseURL?: OnlineResourceType
    /**
     * This element holds the actual license text. If this element is used the LicenseUrl
     * element cannot be used.
     */
    LicenseText?: string
}
