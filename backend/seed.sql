CREATE DATABASE githubbies;

CREATE TABLE Account (
    accID VARCHAR(30) NOT NULL,
  name VARCHAR(30) NOT NULL,
    contactNo VARCHAR(10) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,

    CONSTRAINT PK_Account PRIMARY KEY (accID)

);

-- all roles will cascade delete when an account is deleted

CREATE TABLE Admin (
    adminID VARCHAR(30) NOT NULL,
    CONSTRAINT PK_Admin PRIMARY KEY (adminID),
    CONSTRAINT FK_Admin_Account 
        FOREIGN KEY (adminID) 
        REFERENCES Account (accID) ON DELETE CASCADE
);

CREATE TABLE Operator (
    operatorID VARCHAR(30) NOT NULL,
    CONSTRAINT PK_Operator PRIMARY KEY (operatorID),
    CONSTRAINT FK_Operator_Account 
        FOREIGN KEY (operatorID) 
        REFERENCES Account (accID) ON DELETE CASCADE
);

CREATE TABLE Analyst (
    analystID VARCHAR(30) NOT NULL,
    CONSTRAINT PK_Analyst PRIMARY KEY (analystID),
    CONSTRAINT FK_Analyst_Account 
        FOREIGN KEY (analystID) 
        REFERENCES Account (accID) ON DELETE CASCADE
);

CREATE TABLE ContentCreator (
    contentCreatorID VARCHAR(30) NOT NULL,
    CONSTRAINT PK_ContentCreator PRIMARY KEY (contentCreatorID),
  CONSTRAINT FK_ContentCreator_Account 
        FOREIGN KEY (contentCreatorID) 
        REFERENCES Account (accID) ON DELETE CASCADE

);

CREATE TABLE Role (
    roleType VARCHAR(20) NOT NULL,
    accID VARCHAR (30) NOT NULL,
    adminID VARCHAR (30) NOT NULL,
    CONSTRAINT PK_Role PRIMARY KEY (roleType,accID),

    CONSTRAINT FK_Role_Account 
        FOREIGN KEY (accID)
        REFERENCES Account (accID) ON DELETE NO ACTION, -- no action when account is deleted

    CONSTRAINT FK_Admin 
        FOREIGN KEY (adminID)
        REFERENCES Admin (adminID) ON DELETE NO ACTION, -- no action when admin is deleted

    CONSTRAINT CHK_roleType 
        CHECK 
        (roleType IN ('Admin','Operator','Content Creator','Analyst ')),
)

CREATE TABLE TV (
    tvID VARCHAR(30) NOT NULL,
    tvLocation VARCHAR(30) NOT NULL,
    tvSize TINYINT NOT NULL,
    tvGroupID VARCHAR(30) NULL, -- allows TV to not belong to any group initially
    status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'inactive')),

    CONSTRAINT PK_Tv PRIMARY KEY (tvID)
);

CREATE TABLE TvGroup (
    tvGroupID VARCHAR(30) NOT NULL,  -- unique identifier for the group
    groupName VARCHAR(30) NOT NULL,
    operatorID VARCHAR(30) NULL,
    adminID VARCHAR(30) NULL,
    category VARCHAR(100) NOT NULL,
    tvID VARCHAR(30) NULL,  -- tvID is made nullable to allow for no association initially

    CONSTRAINT PK_TvGroup PRIMARY KEY (tvGroupID),
    
    CONSTRAINT FK_TvGroup_Tv 
        FOREIGN KEY (tvID)  -- reference tvID instead of tvGroupID
        REFERENCES TV(tvID) ON DELETE SET NULL,  -- set tvID in TvGroup to NULL if the corresponding TV is deleted
   
    CONSTRAINT FK_TvGroup_Operator 
        FOREIGN KEY (operatorID)
        REFERENCES Operator(operatorID) ON DELETE NO ACTION,

    CONSTRAINT FK_TvGroup_Admin
        FOREIGN KEY (adminID)
        REFERENCES Admin(adminID) ON DELETE NO ACTION
);

CREATE TABLE Campaign (
    campaignID VARCHAR(30) NOT NULL,
    campaignName VARCHAR(100) NOT NULL,
    startDateTime SMALLDATETIME NOT NULL,
    endDateTime SMALLDATETIME NOT NULL,
    operatorID VARCHAR(30) NULL, 
    adminID VARCHAR(30) NULL,   

    CONSTRAINT PK_Campaign PRIMARY KEY (campaignID),

    CONSTRAINT FK_Campaign_Operator 
        FOREIGN KEY (operatorID)
        REFERENCES Operator(operatorID) ON DELETE NO ACTION ,

    CONSTRAINT FK_Campaign_Admin
        FOREIGN KEY (adminID)
        REFERENCES Admin(adminID) ON DELETE NO ACTION,
);

CREATE TABLE Advertisement (
    advertID VARCHAR(30) NOT NULL,
    advertName VARCHAR(100) NOT NULL,
    campaignID VARCHAR(30) NULL,  
    
    CONSTRAINT PK_Advertisement PRIMARY KEY (advertID),
    CONSTRAINT FK_Advertisement_Campaign
        FOREIGN KEY (campaignID)
        REFERENCES Campaign(campaignID) ON DELETE SET NULL
);

CREATE TABLE Metric (
    metricsID VARCHAR(30) NOT NULL,
    viewership INT NULL,
    successRate INT NULL,
    analystID VARCHAR(30) NOT NULL,
    advertID VARCHAR(30) NULL,  --  advertID for foreign key reference
 
    CONSTRAINT PK_Metric PRIMARY KEY (metricsID),
    CONSTRAINT FK_Metrics_Advertisement
        FOREIGN KEY (advertID)
        REFERENCES Advertisement(advertID) ON DELETE SET NULL,

    CONSTRAINT FK_Metric_Analyst 
        FOREIGN KEY (analystID)
        REFERENCES Analyst(analystID) ON DELETE NO ACTION,
);

CREATE TABLE TvTimeSlot (
  referenceID VARCHAR(30) NOT NULL,
  scheduleType VARCHAR(30) NOT NULL CHECK (scheduleType IN ('Advertisement', 'Campaign')),
  startDate DATE NOT NULL,
  startTime TIME NOT NULL,
    endDate DATE NOT NULL,
    endTime TIME NOT NULL,
  repeatInterval VARCHAR(30) NULL,
  tagName VARCHAR(30) NULL,
  tvID VARCHAR(30) NOT NULL, -- reference to the tv / tv group
  adminID VARCHAR(30) NOT NULL,

  CONSTRAINT PK_TvTimeSlot PRIMARY KEY (referenceID, startDate, startTime),  
  CONSTRAINT FK_TvTimeSlot_TV 
    FOREIGN KEY (tvID)
    REFERENCES TV(tvID) ON DELETE CASCADE,

  CONSTRAINT FK_TvTimeSlot_Admin
    FOREIGN KEY (adminID)
    REFERENCES Admin(adminID) ON DELETE NO ACTION,

  CONSTRAINT CHK_Times 
    CHECK (startDate <= endDate),

  CONSTRAINT CHK_StartEndTime 
    CHECK (startTime < endTime)  
);

INSERT INTO Account (accID, name, contactNo, password, email) VALUES
('ADM001', 'Elsa', '9876 5432', 'password123', 'elsa123@hmail.com'),
('OPT001', 'Anna', '8765 4321', 'mypassword', 'anna@hmail.com'),
('ANL001', 'Olaf', '7654 3210', 'nopassword', 'olaf@hmail.com'),
('CCR001', 'Sven', '6543 2109', 'wordpass', 'sven@hmail.com');

INSERT INTO Admin (AdminID) VALUES
('ADM001');

INSERT INTO Operator (operatorID) VALUES
('OPT001'); 

INSERT INTO Analyst (analystID) VALUES
('ANL001');  

INSERT INTO ContentCreator (contentCreatorID) VALUES
('CCR001');

INSERT INTO Role (roleType, accID, AdminID) VALUES
('Admin', 'ADM001', 'ADM001'),  
('Admin', 'OPT001', 'ADM001'), 
('Operator', 'ANL001', 'ADM001'), 
('Content Creator', 'CCR001', 'ADM001');

INSERT INTO TV (tvID, tvLocation, tvSize, tvGroupID, status) VALUES
('tv001', 'Front Door', 55, NULL, 'active'),
('tv002', 'Behind Counter', 55, NULL, 'inactive');

INSERT INTO TvGroup (tvGroupID, groupName, operatorID, AdminID, category, tvID) VALUES
('tvgrp001', 'CBD Area', 'OPT001', 'ADM001', 'Location', 'tv001'),
('tvgrp002', 'Student Specials', 'OPT001', 'ADM001', 'Demographics', 'tv002');

-- Insert into Campaign
INSERT INTO Campaign (campaignID, campaignName, startDateTime, endDateTime, operatorID, AdminID) VALUES
('camp001', 'Halloween Deals', '2024-10-28 09:00', '2024-10-31 12:00', 'OPT001', 'ADM001');

-- Insert into Advertisment
INSERT INTO Advertisement (advertID, advertName, campaignID) VALUES
('adv001', 'Spooktacular Savings Buy One Get One', 'camp001'),
('adv002', 'Free Pumpkin Latte With Every Meal', 'camp001'),
('adv003', 'Family Feast', NULL);

-- Insert into Metric
INSERT INTO Metric (metricsID, viewership, successRate, analystID, advertID) VALUES
('met001', 1000, 75, 'ANL001', 'adv001'),
('met002', 1500, 85, 'ANL001', 'adv002');

INSERT INTO TvTimeSlot (referenceID, scheduleType, startDate, startTime, endDate, endTime, repeatInterval, tagName, tvID, adminID) VALUES
('camp001', 'Campaign', '2024-10-28', '09:00', '2024-10-30', '11:00', 'Daily', 'Halloween Deals', 'tv001', 'ADM001'),
('camp001', 'Campaign', '2024-10-28', '15:00', '2024-10-30', '16:00', 'Daily', 'Halloween Deals', 'tv001', 'ADM001'),
('adv003', 'Advertisement', '2024-11-01', '12:00', '2024-11-30', '20:00', 'Hourly', 'Weekly Special', 'tv002', 'ADM001');

SELECT * FROM Account;
SELECT * FROM Admin;
SELECT * FROM Operator;
SELECT * FROM Analyst;
SELECT * FROM ContentCreator;
SELECT * FROM Role;
SELECT * FROM TV;
SELECT * FROM TvGroup;
SELECT * FROM Campaign;
SELECT * FROM Advertisement;  
SELECT * FROM Metric;
SELECT * FROM TvTimeSlot;