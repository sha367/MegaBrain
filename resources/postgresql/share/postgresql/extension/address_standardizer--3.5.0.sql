---------------------------------------------------------------------
-- Core types to access the PAGC address standardizer
-- Author: Stephen Woodbridge <woodbri@imaptools.com>
---------------------------------------------------------------------

CREATE TYPE stdaddr AS (
    building text,
    house_num text,
    predir text,
    qual text,
    pretype text,
    name text,
    suftype text,
    sufdir text,
    ruralroute text,
    extra text,
    city text,
    state text,
    country text,
    postcode text,
    box text,
    unit text
);

---------------------------------------------------------------------
-- Core function to access the PAGC address standardizer
-- Author: Stephen Woodbridge <woodbri@imaptools.com>
---------------------------------------------------------------------

-- Availability: 3.4.0
CREATE FUNCTION debug_standardize_address(
        lextab text,
        gaztab text,
        rultab text,
        micro text,
        macro text DEFAULT NULL )
    RETURNS text
    AS  '$libdir/address_standardizer-3', 'debug_standardize_address'
    LANGUAGE 'c' IMMUTABLE COST 200;

CREATE FUNCTION standardize_address(
        lextab text,
        gaztab text,
        rultab text,
        micro text,
        macro text )
    RETURNS stdaddr
    AS  '$libdir/address_standardizer-3', 'standardize_address'
    LANGUAGE 'c' IMMUTABLE STRICT COST 200;

CREATE FUNCTION standardize_address(
        lextab text,
        gaztab text,
        rultab text,
        address text )
    RETURNS stdaddr
    AS  '$libdir/address_standardizer-3', 'standardize_address1'
    LANGUAGE 'c' IMMUTABLE STRICT COST 200;

CREATE FUNCTION parse_address(IN text,
        OUT num text,
        OUT street text,
        OUT street2 text,
        OUT address1 text,
        OUT city text,
        OUT state text,
        OUT zip text,
        OUT zipplus text,
        OUT country text)
    RETURNS record
    AS  '$libdir/address_standardizer-3', 'parse_address'
    LANGUAGE 'c' IMMUTABLE STRICT;


