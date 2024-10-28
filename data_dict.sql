CREATE TABLE Account (
    accID VARCHAR(30) NOT NULL,
    contactNo VARCHAR(10) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,

    CONSTRAINT PK_Account PRIMARY KEY (accID)

)

CREATE TABLE Admin (
    adminID VARCHAR (30) NOT NULL,
    CONSTRAINT PK_Admin PRIMARY KEY (adminID),
    CONSTRAINT FK_Admin_Account 
        FOREIGN KEY (adminID) 
        REFERENCES Account (accID) ON DELETE SET NULL
)

CREATE TABLE Operator (
    operatorID VARCHAR (30) NOT NULL,
    CONSTRAINT PK_Operator PRIMARY KEY (operatorID),
    CONSTRAINT FK_Operator_Admin 
        FOREIGN KEY (operatorID) 
        REFERENCES Account (accID) ON DELETE SET NULL
)

CREATE TABLE Analyst (
    analystID VARCHAR (30) NOT NULL,
    CONSTRAINT PK_Analyst PRIMARY KEY (analystID),
    CONSTRAINT FK_Anayst_Admin 
        FOREIGN KEY (analystID) 
        REFERENCES Account (accID) ON DELETE SET NULL
)

CREATE TABLE ContentCreator (
    contentCreatorID VARCHAR (30) NOT NULL,
    CONSTRAINT PK_ContentCreator PRIMARY KEY (contentCreatorID)
)

CREATE TABLE Role (
    roleType Char(20) NOT NULL,
    accID VARCHAR (30) NOT NULL,
    adminID VARCHAR (30) NOT NULL,
    CONSTRAINT PK_Role PRIMARY KEY (roleType,accID),
    CONSTRAINT FK_Role_Account 
        FOREIGN KEY (accID)
        REFERENCES Account (accID) ON DELETE SET NULL,
    CONSTRAINT FK_Admin 
        FOREIGN KEY (adminID)
        REFERENCES Admin (adminID) ON DELETE SET NULL,
    -- Constraint for accepted values
    CONSTRAINT CHK_roleType 
        CHECK 
        (roleType 
            IN ('Admin','Operator','Content Creator','Analyst ')
        ),
)

CREATE TABLE TV (
    tvID VARCHAR (30) NOT NULL,
    tvLocation VARCHAR (30) NOT NULL,
    tvSize TINYINT NOT NULL,
    status VARCHAR (10) NOT NULL,
    --  Constraints 
    CONSTRAINT PK_Tv PRIMARY KEY (tvID),
)

CREATE TABLE TvGroup (
    tvID VARCHAR (30) NOT NULL,
    groupName VARCHAR (30) NOT NULL,
    viewingBehaviour VARCHAR (30) NOT NULL,
    operatorID VARCHAR (30) NOT NULL,
    adminID VARCHAR (30) NOT NULL,
    category VARCHAR (100) NOT NULL,

    -- Constraints for the tv group 

    -- Composite key is  
    CONSTRAINT PK_TvGroup PRIMARY KEY (tvID,groupName),
    CONSTRAINT FK_TvGroup_Tv 
        FOREIGN KEY (tvID)
        REFERENCES Tv(tvID) ON DELETE SET NULL,
    
    CONSTRAINT FK_TVGroup_Operator 
        FOREIGN KEY (operatorID)
        REFERENCES Operator(operatorID) ON DELETE SET NULL,

    CONSTRAINT FK_TvGroup_Admin
        FOREIGN KEY (adminID)
        REFERENCES Admin(adminID) ON DELETE SET NULL,
)

CREATE TABLE Campaign (
    campaignID VARCHAR(30) NOT NULL,
    campaignName VARCHAR(100) NOT NULL,
    startDateTime SMALLDATETIME NOT NULL,
    endDateTime SMALLDATETIME NOT NULL,
    operatorID VARCHAR(30) NULL,  -- Ensure this is nullable
    adminID VARCHAR(30) NULL,      -- Ensure this is nullable

    -- CONSTRAINTS 
    CONSTRAINT PK_Campaign PRIMARY KEY (campaignID),
    CONSTRAINT FK_Campaign_Operator 
        FOREIGN KEY (operatorID)
        REFERENCES Operator(operatorID) ON DELETE SET NULL,
    CONSTRAINT FK_Campaign_Admin
        FOREIGN KEY (adminID)
        REFERENCES Admin(adminID) ON DELETE SET NULL
);

CREATE TABLE Advertisment (
    advertID VARCHAR(30) NOT NULL,
    advertName VARCHAR(30) NOT NULL,
    campaignID VARCHAR(30) NULL,  -- Make campaignID nullable
    
    CONSTRAINT PK_Advertisment PRIMARY KEY (advertID),
    CONSTRAINT FK_Advertisment_Campaign
        FOREIGN KEY (campaignID)
        REFERENCES Campaign(campaignID) ON DELETE SET NULL
);

CREATE TABLE Metric (
    metricsID VARCHAR(30) NOT NULL,
    viewership INT NULL,
    successRate INT NULL,
    analystID VARCHAR(30) NOT NULL,
    advertID VARCHAR(30) NULL,  -- Add advertID for foreign key reference

    -- CONSTRAINTS 
    CONSTRAINT PK_Metric PRIMARY KEY (metricsID),
    CONSTRAINT FK_Metrics_Advertisment
        FOREIGN KEY (advertID)
        REFERENCES Advertisment(advertID) ON DELETE SET NULL,
    CONSTRAINT FK_Metric_Analyst 
        FOREIGN KEY (analystID)
        REFERENCES Analyst(analystID) ON DELETE SET NULL
);
