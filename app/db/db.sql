BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `vehicles` (
	`refId`	integer NOT NULL,
	`jsonData`	text NOT NULL
);
CREATE TABLE IF NOT EXISTS `settings` (
	`username`	varchar ( 30 ) NOT NULL,
	`cid`	varchar ( 10 ) NOT NULL,
	`lastLoginDate`	varchar ( 30 )
);
CREATE TABLE IF NOT EXISTS `records` (
	`id`	integer NOT NULL,
	`officerId`	varchar ( 30 ),
	`type`	varchar ( 30 ) NOT NULL,
  `recordType`	varchar ( 30 ) NOT NULL,
	`jsonData`	text NOT NULL,
	PRIMARY KEY(`id`)
);
CREATE TABLE IF NOT EXISTS `individuals` (
	`refId`	integer NOT NULL,
	`jsonData`	text NOT NULL
);
CREATE TABLE IF NOT EXISTS `attachments` (
	`refId`	integer NOT NULL,
	`filename`	varchar ( 200 ) NOT NULL
);
CREATE TABLE IF NOT EXISTS `accounts` (
	`accountId`	integer NOT NULL,
	`jsonData`	text NOT NULL
);
COMMIT;
