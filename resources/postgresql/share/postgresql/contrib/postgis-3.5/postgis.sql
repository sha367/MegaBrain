-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--
--
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
-- Copyright 2001-2003 Refractions Research Inc.
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--
-- WARNING: Any change in this file must be evaluated for compatibility.
--		Changes cleanly handled by postgis_upgrade.sql are fine,
--		other changes will require a bump in Major version.
--		Currently only function replaceble by CREATE OR REPLACE
--		are cleanly handled.
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -






   




   



   













-- INSTALL VERSION: '3.5.0'

BEGIN;
SET LOCAL client_min_messages TO warning;

DO $$
DECLARE
	pgver text;
BEGIN
	SELECT pg_catalog.substring(pg_catalog.version(), E'PostgreSQL ([0-9\\.]+)') INTO pgver;

	IF 170::text != ( SELECT CASE
		WHEN pg_catalog.split_part(s,'.',1)::integer > 9
			THEN pg_catalog.split_part(s,'.',1) || '0'
		ELSE
			pg_catalog.split_part(s,'.', 1) || pg_catalog.split_part(s,'.', 2)
		END
		FROM pg_catalog.substring(pg_catalog.version(), E'PostgreSQL ([0-9\\.]+)') AS s )
	THEN
		RAISE EXCEPTION 'PostGIS built for PostgreSQL % cannot be loaded in PostgreSQL %',
			17.0, pgver;
	END IF;
END;
$$;


-- Check that no other postgis is installed
DO $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
	SELECT n.nspname, p.proname FROM pg_catalog.pg_proc p, pg_catalog.pg_namespace n
	WHERE p.proname = 'postgis_version'
	AND p.pronamespace = n.oid
  LOOP
	RAISE EXCEPTION 'PostGIS is already installed in schema ''%''', rec.nspname;
  END LOOP;
END
$$ LANGUAGE 'plpgsql';


-- Let the user know about a deprecated signature and its new name, if any
CREATE OR REPLACE FUNCTION _postgis_deprecate(oldname text, newname text, version text)
RETURNS void AS
$$
DECLARE
  curver_text text;
BEGIN
  --
  -- Raises a NOTICE if it was deprecated in this version,
  -- a WARNING if in a previous version (only up to minor version checked)
  --
	curver_text := '3.5.0';
	IF pg_catalog.split_part(curver_text,'.',1)::int > pg_catalog.split_part(version,'.',1)::int OR
	   ( pg_catalog.split_part(curver_text,'.',1) = pg_catalog.split_part(version,'.',1) AND
		 pg_catalog.split_part(curver_text,'.',2) != split_part(version,'.',2) )
	THEN
	  RAISE WARNING '% signature was deprecated in %. Please use %', oldname, version, newname;
	ELSE
	  RAISE DEBUG '% signature was deprecated in %. Please use %', oldname, version, newname;
	END IF;
END;
$$ LANGUAGE 'plpgsql' IMMUTABLE STRICT COST 250;

-------------------------------------------------------------------
--  SPHEROID TYPE
-------------------------------------------------------------------
CREATE OR REPLACE FUNCTION spheroid_in(cstring)
	RETURNS spheroid
	AS '$libdir/postgis-3','ellipsoid_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE OR REPLACE FUNCTION spheroid_out(spheroid)
	RETURNS cstring
	AS '$libdir/postgis-3','ellipsoid_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 0.5.0
CREATE TYPE spheroid (
	alignment = double,
	internallength = 65,
	input = spheroid_in,
	output = spheroid_out
);

-------------------------------------------------------------------
--  GEOMETRY TYPE (lwgeom)
-------------------------------------------------------------------
CREATE OR REPLACE FUNCTION geometry_in(cstring)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE OR REPLACE FUNCTION geometry_out(geometry)
	RETURNS cstring
	AS '$libdir/postgis-3','LWGEOM_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_typmod_in(cstring[])
	RETURNS integer
	AS '$libdir/postgis-3','geometry_typmod_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_typmod_out(integer)
	RETURNS cstring
	AS '$libdir/postgis-3','postgis_typmod_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE OR REPLACE FUNCTION geometry_analyze(internal)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_analyze_nd'
	LANGUAGE 'c' VOLATILE STRICT;

CREATE OR REPLACE FUNCTION geometry_recv(internal)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_recv'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE OR REPLACE FUNCTION geometry_send(geometry)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_send'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 0.1.0
CREATE TYPE geometry (
	internallength = variable,
	input = geometry_in,
	output = geometry_out,
	send = geometry_send,
	receive = geometry_recv,
	typmod_in = geometry_typmod_in,
	typmod_out = geometry_typmod_out,
	delimiter = ':',
	alignment = double,
	analyze = geometry_analyze,
	storage = main
);

-- Availability: 2.0.0
-- Special cast for enforcing the typmod restrictions
CREATE OR REPLACE FUNCTION geometry(geometry, integer, boolean)
	RETURNS geometry
	AS '$libdir/postgis-3','geometry_enforce_typmod'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE CAST (geometry AS geometry) WITH FUNCTION geometry(geometry, integer, boolean) AS IMPLICIT;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION geometry(point)
	RETURNS geometry
	AS '$libdir/postgis-3','point_to_geometry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION point(geometry)
	RETURNS point
	AS '$libdir/postgis-3','geometry_to_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION geometry(path)
	RETURNS geometry
	AS '$libdir/postgis-3','path_to_geometry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION path(geometry)
	RETURNS path
	AS '$libdir/postgis-3','geometry_to_path'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION geometry(polygon)
	RETURNS geometry
	AS '$libdir/postgis-3','polygon_to_geometry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION polygon(geometry)
	RETURNS polygon
	AS '$libdir/postgis-3','geometry_to_polygon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE CAST (geometry AS point) WITH FUNCTION point(geometry);
CREATE CAST (point AS geometry) WITH FUNCTION geometry(point);
CREATE CAST (geometry AS path) WITH FUNCTION path(geometry);
CREATE CAST (path AS geometry) WITH FUNCTION geometry(path);
CREATE CAST (geometry AS polygon) WITH FUNCTION polygon(geometry);
CREATE CAST (polygon AS geometry) WITH FUNCTION geometry(polygon);

-------------------------------------------------------------------
--  BOX3D TYPE
-- Point coordinate data access
-------------------------------------------
-- PostGIS equivalent function: X(geometry)
CREATE OR REPLACE FUNCTION ST_X(geometry)
	RETURNS float8
	AS '$libdir/postgis-3','LWGEOM_x_point'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE COST 1;

-- PostGIS equivalent function: Y(geometry)
CREATE OR REPLACE FUNCTION ST_Y(geometry)
	RETURNS float8
	AS '$libdir/postgis-3','LWGEOM_y_point'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Z(geometry)
	RETURNS float8
	AS '$libdir/postgis-3','LWGEOM_z_point'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_M(geometry)
	RETURNS float8
	AS '$libdir/postgis-3','LWGEOM_m_point'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE COST 1;

-------------------------------------------------------------------

CREATE OR REPLACE FUNCTION box3d_in(cstring)
	RETURNS box3d
	AS '$libdir/postgis-3', 'BOX3D_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE OR REPLACE FUNCTION box3d_out(box3d)
	RETURNS cstring
	AS '$libdir/postgis-3', 'BOX3D_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 0.1.0
CREATE TYPE box3d (
	alignment = double,
	internallength = 52,
	input = box3d_in,
	output = box3d_out
);

-----------------------------------------------------------------------
-- BOX2D
-----------------------------------------------------------------------

CREATE OR REPLACE FUNCTION box2d_in(cstring)
	RETURNS box2d
	AS '$libdir/postgis-3','BOX2D_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

CREATE OR REPLACE FUNCTION box2d_out(box2d)
	RETURNS cstring
	AS '$libdir/postgis-3','BOX2D_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 0.8.2
CREATE TYPE box2d (
	internallength = 65,
	input = box2d_in,
	output = box2d_out,
	storage = plain
);

-------------------------------------------------------------------
--  BOX2DF TYPE (INTERNAL ONLY)
-------------------------------------------------------------------
--
-- Box2Df type is used by the GiST index bindings.
-- In/out functions are stubs, as all access should be internal.
---
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION box2df_in(cstring)
	RETURNS box2df
	AS '$libdir/postgis-3','box2df_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION box2df_out(box2df)
	RETURNS cstring
	AS '$libdir/postgis-3','box2df_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE TYPE box2df (
	internallength = 16,
	input = box2df_in,
	output = box2df_out,
	storage = plain,
	alignment = double
);

-------------------------------------------------------------------
--  GIDX TYPE (INTERNAL ONLY)
-------------------------------------------------------------------
--
-- GIDX type is used by the N-D and GEOGRAPHY GiST index bindings.
-- In/out functions are stubs, as all access should be internal.
---

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION gidx_in(cstring)
	RETURNS gidx
	AS '$libdir/postgis-3','gidx_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION gidx_out(gidx)
	RETURNS cstring
	AS '$libdir/postgis-3','gidx_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE TYPE gidx (
	internallength = variable,
	input = gidx_in,
	output = gidx_out,
	storage = plain,
	alignment = double
);

-------------------------------------------------------------------
-- BTREE indexes
-------------------------------------------------------------------
CREATE OR REPLACE FUNCTION geometry_lt(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'lwgeom_lt'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION geometry_le(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'lwgeom_le'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION geometry_gt(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'lwgeom_gt'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION geometry_ge(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'lwgeom_ge'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION geometry_eq(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'lwgeom_eq'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION geometry_neq(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'lwgeom_neq'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION geometry_cmp(geom1 geometry, geom2 geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'lwgeom_cmp'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_sortsupport(internal)
	RETURNS void
	AS '$libdir/postgis-3', 'lwgeom_sortsupport'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

--
-- Sorting operators for Btree
--

-- Availability: 0.9.0
CREATE OPERATOR < (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_lt,
	COMMUTATOR = '>', NEGATOR = '>=',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 0.9.0
CREATE OPERATOR <= (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_le,
	COMMUTATOR = '>=', NEGATOR = '>',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 0.9.0
CREATE OPERATOR = (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_eq,
	COMMUTATOR = '=', NEGATOR = '<>',
	RESTRICT = contsel, JOIN = contjoinsel, HASHES, MERGES
);

-- Availability: 3.5.0
CREATE OPERATOR <> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_neq,
	COMMUTATOR = '<>', NEGATOR = '=',
	RESTRICT = contsel, JOIN = contjoinsel, HASHES, MERGES
);

-- Availability: 0.9.0
CREATE OPERATOR >= (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_ge,
	COMMUTATOR = '<=', NEGATOR = '<',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 0.9.0
CREATE OPERATOR > (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_gt,
	COMMUTATOR = '<', NEGATOR = '<=',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 0.9.0
CREATE OPERATOR CLASS btree_geometry_ops
	DEFAULT FOR TYPE geometry USING btree AS
	OPERATOR	1	< ,
	OPERATOR	2	<= ,
	OPERATOR	3	= ,
	OPERATOR	4	>= ,
	OPERATOR	5	> ,
	FUNCTION	1	geometry_cmp (geom1 geometry, geom2 geometry),
	-- Availability: 3.0.0
	FUNCTION	2	geometry_sortsupport(internal);

--
-- Sorting operators for Btree
--

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_hash(geometry)
	RETURNS integer
	AS '$libdir/postgis-3','lwgeom_hash'
	LANGUAGE 'c' STRICT IMMUTABLE PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OPERATOR CLASS hash_geometry_ops
	DEFAULT FOR TYPE geometry USING hash AS
	OPERATOR	1   = ,
	FUNCTION	1   geometry_hash(geometry);

-----------------------------------------------------------------------------
-- GiST 2D GEOMETRY-over-GSERIALIZED INDEX
-----------------------------------------------------------------------------

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- GiST Support Functions
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_distance_2d(internal,geometry,integer)
	RETURNS float8
	AS '$libdir/postgis-3' ,'gserialized_gist_distance_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_consistent_2d(internal,geometry,integer)
	RETURNS bool
	AS '$libdir/postgis-3' ,'gserialized_gist_consistent_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_compress_2d(internal)
	RETURNS internal
	AS '$libdir/postgis-3','gserialized_gist_compress_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_penalty_2d(internal,internal,internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_penalty_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_picksplit_2d(internal, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_picksplit_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_union_2d(bytea, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_union_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_same_2d(geom1 geometry, geom2 geometry, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_same_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_decompress_2d(internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_decompress_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION geometry_gist_sortsupport_2d(internal)
	RETURNS void
	AS '$libdir/postgis-3', 'gserialized_gist_sortsupport_2d'
	LANGUAGE 'c' STRICT;

-----------------------------------------------------------------------------

-- Availability: 2.1.0
-- Given a table, column and query geometry, returns the estimate of what proportion
-- of the table would be returned by a query using the &&/&&& operators. The mode
-- changes whether the estimate is in x/y only or in all available dimensions.
CREATE OR REPLACE FUNCTION _postgis_selectivity(tbl regclass, att_name text, geom geometry, mode text default '2')
	RETURNS float8
	AS '$libdir/postgis-3', '_postgis_gserialized_sel'
	LANGUAGE 'c' STRICT PARALLEL SAFE;

-- Availability: 2.1.0
-- Given a two tables and columns, returns estimate of the proportion of rows
-- a &&/&&& join will return relative to the number of rows an unconstrained
-- table join would return. Mode flips result between evaluation in x/y only
-- and evaluation in all available dimensions.
CREATE OR REPLACE FUNCTION _postgis_join_selectivity(regclass, text, regclass, text, text default '2')
	RETURNS float8
	AS '$libdir/postgis-3', '_postgis_gserialized_joinsel'
	LANGUAGE 'c' STRICT PARALLEL SAFE;

-- Availability: 2.1.0
-- Given a table and a column, returns the statistics information stored by
-- PostgreSQL, in a JSON text form. Mode determines whether the 2D statistics
-- or the ND statistics are returned.
CREATE OR REPLACE FUNCTION _postgis_stats(tbl regclass, att_name text, text default '2')
	RETURNS text
	AS '$libdir/postgis-3', '_postgis_gserialized_stats'
	LANGUAGE 'c' STRICT PARALLEL SAFE;

-- Availability: 2.5.0
-- Given a table and a column, returns the extent of all boxes in the
-- first page of the index (the head of the index)
CREATE OR REPLACE FUNCTION _postgis_index_extent(tbl regclass, col text)
	RETURNS box2d
	AS '$libdir/postgis-3','_postgis_gserialized_index_extent'
	LANGUAGE 'c' STABLE STRICT;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION gserialized_gist_sel_2d (internal, oid, internal, integer)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_gist_sel_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION gserialized_gist_sel_nd (internal, oid, internal, integer)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_gist_sel_nd'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION gserialized_gist_joinsel_2d (internal, oid, internal, smallint)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_gist_joinsel_2d'
	LANGUAGE 'c' PARALLEL SAFE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION gserialized_gist_joinsel_nd (internal, oid, internal, smallint)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_gist_joinsel_nd'
	LANGUAGE 'c' PARALLEL SAFE;


-----------------------------------------------------------------------------
-- GEOMETRY Operators
-----------------------------------------------------------------------------

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- 2D GEOMETRY Operators
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_overlaps(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_overlaps_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
-- Changed: 2.0.0 use gserialized selectivity estimators
CREATE OPERATOR && (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_overlaps,
	COMMUTATOR = '&&',
	RESTRICT = gserialized_gist_sel_2d,
	JOIN = gserialized_gist_joinsel_2d
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_same(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_same_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR ~= (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_same,
	RESTRICT = contsel, JOIN = contjoinsel
);

-- As of 2.2.0 this no longer returns the centroid/centroid distance, it
-- returns the actual distance, to support the 'recheck' functionality
-- enabled in the KNN operator
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_distance_centroid(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_Distance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_distance_box(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_distance_box_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OPERATOR <-> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_distance_centroid,
	COMMUTATOR = '<->'
);

-- Availability: 2.0.0
CREATE OPERATOR <#> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_distance_box,
	COMMUTATOR = '<#>'
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_contains(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_contains_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_within(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_within_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
-- Updated: 3.4.0 changed to use selectivity estimates
CREATE OPERATOR @ (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_within,
	COMMUTATOR = '~',
	-- Updated: 3.4.0 to use selectivity estimator
	RESTRICT = gserialized_gist_sel_2d,
	-- Updated: 3.4.0 to use join selectivity estimator
	JOIN = gserialized_gist_joinsel_2d
);

-- Availability: 0.1.0
-- Updated: 3.4.0 changed to use selectivity estimates
CREATE OPERATOR ~ (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_contains,
	COMMUTATOR = '@',
	-- Updated: 3.4.0 to use specialized selectivity estimator
	RESTRICT = gserialized_gist_sel_2d,
	-- Updated: 3.4.0 to use join specialized selectivity estimator
	JOIN = gserialized_gist_joinsel_2d
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_left(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_left_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR << (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_left,
	COMMUTATOR = '>>',
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_overleft(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_overleft_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR &< (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_overleft,
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_below(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_below_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR <<| (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_below,
	COMMUTATOR = '|>>',
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_overbelow(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_overbelow_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR &<| (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_overbelow,
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_overright(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_overright_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR &> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_overright,
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_right(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_right_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR >> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_right,
	COMMUTATOR = '<<',
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_overabove(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_overabove_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR |&> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_overabove,
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_above(geom1 geometry, geom2 geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_above_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 0.1.0
CREATE OPERATOR |>> (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_above,
	COMMUTATOR = '<<|',
	RESTRICT = positionsel, JOIN = positionjoinsel
);

-- Availability: 2.0.0
CREATE OPERATOR CLASS gist_geometry_ops_2d
	DEFAULT FOR TYPE geometry USING GIST AS
	STORAGE box2df,
	OPERATOR        1        <<  ,
	OPERATOR        2        &<	 ,
	OPERATOR        3        &&  ,
	OPERATOR        4        &>	 ,
	OPERATOR        5        >>	 ,
	OPERATOR        6        ~=	 ,
	OPERATOR        7        ~	 ,
	OPERATOR        8        @	 ,
	OPERATOR        9        &<| ,
	OPERATOR        10       <<| ,
	OPERATOR        11       |>> ,
	OPERATOR        12       |&> ,
	OPERATOR        13       <-> FOR ORDER BY pg_catalog.float_ops,
	OPERATOR        14       <#> FOR ORDER BY pg_catalog.float_ops,
--
-- Sort support in bulk indexing not included in the default
-- opclass for PostgreSQL versions <15 due to query performance
-- degradation caused by GiST index page overlap.
-- Since PostgreSQL 15 sorting build uses picksplit function to
-- find better partitioning for index records. This allows to
-- build indices performing similarly to those produced by default
-- method while still reducing index build time significantly.
--
-- To enable sortsupport:
--   alter operator family gist_geometry_ops_2d using gist
--     add function 11 (geometry)
--     geometry_gist_sortsupport_2d (internal);
--
-- To remove sortsupport:
--   alter operator family gist_geometry_ops_2d using gist
--     drop function 11 (geometry);
--

	FUNCTION        11       geometry_gist_sortsupport_2d (internal),

	FUNCTION        8        geometry_gist_distance_2d (internal, geometry, integer),
	FUNCTION        1        geometry_gist_consistent_2d (internal, geometry, integer),
	FUNCTION        2        geometry_gist_union_2d (bytea, internal),
	FUNCTION        3        geometry_gist_compress_2d (internal),
	FUNCTION        4        geometry_gist_decompress_2d (internal),
	FUNCTION        5        geometry_gist_penalty_2d (internal, internal, internal),
	FUNCTION        6        geometry_gist_picksplit_2d (internal, internal),
	FUNCTION        7        geometry_gist_same_2d (geom1 geometry, geom2 geometry, internal);

-----------------------------------------------------------------------------
-- GiST ND GEOMETRY-over-GSERIALIZED
-----------------------------------------------------------------------------

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- GiST Support Functions
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_consistent_nd(internal,geometry,integer)
	RETURNS bool
	AS '$libdir/postgis-3' ,'gserialized_gist_consistent'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_compress_nd(internal)
	RETURNS internal
	AS '$libdir/postgis-3','gserialized_gist_compress'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_penalty_nd(internal,internal,internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_penalty'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_picksplit_nd(internal, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_picksplit'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_union_nd(bytea, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_union'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_same_nd(geometry, geometry, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_same'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_gist_decompress_nd(internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_decompress'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- N-D GEOMETRY Operators
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geometry_overlaps_nd(geometry, geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_overlaps'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OPERATOR &&& (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_overlaps_nd,
	COMMUTATOR = '&&&',
	RESTRICT = gserialized_gist_sel_nd,
	JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_contains_nd(geometry, geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_contains'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.0.0
CREATE OPERATOR ~~ (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_contains_nd,
	COMMUTATOR = '@@',
	RESTRICT = gserialized_gist_sel_nd,
	JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_within_nd(geometry, geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_within'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.0.0
CREATE OPERATOR @@ (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_within_nd,
	COMMUTATOR = '~~',
	RESTRICT = gserialized_gist_sel_nd,
	JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_same_nd(geometry, geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_same'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.0.0
CREATE OPERATOR ~~= (
	LEFTARG = geometry, RIGHTARG = geometry, PROCEDURE = geometry_same_nd,
	COMMUTATOR = '~~=',
	RESTRICT = gserialized_gist_sel_nd,
	JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION geometry_distance_centroid_nd(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_distance_nd'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.2.0
CREATE OPERATOR <<->> (
	LEFTARG = geometry, RIGHTARG = geometry,
	PROCEDURE = geometry_distance_centroid_nd,
	COMMUTATOR = '<<->>'
);

--
-- This is for use with |=| operator, which does not directly use
-- ST_DistanceCPA just in case it'll ever need to change behavior
-- (operators definition cannot be altered)
--
-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION geometry_distance_cpa(geometry, geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_DistanceCPA'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OPERATOR |=| (
	LEFTARG = geometry, RIGHTARG = geometry,
	PROCEDURE = geometry_distance_cpa,
	COMMUTATOR = '|=|'
);

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION geometry_gist_distance_nd(internal,geometry,integer)
	RETURNS float8
	AS '$libdir/postgis-3', 'gserialized_gist_distance'
	LANGUAGE 'c' PARALLEL SAFE
	COST 1;

-- Availability: 2.0.0
CREATE OPERATOR CLASS gist_geometry_ops_nd
	FOR TYPE geometry USING GIST AS
	STORAGE 	gidx,
	OPERATOR        3        &&&	,
	-- Availability: 3.0.0
	OPERATOR        6        ~~=	,
	-- Availability: 3.0.0
	OPERATOR        7        ~~	,
	-- Availability: 3.0.0
	OPERATOR        8        @@	,
	-- Availability: 2.2.0
	OPERATOR        13       <<->> FOR ORDER BY pg_catalog.float_ops,
	-- Availability: 2.2.0
	OPERATOR        20       |=| FOR ORDER BY pg_catalog.float_ops,
	-- Availability: 2.2.0
	FUNCTION        8        geometry_gist_distance_nd (internal, geometry, integer),
	FUNCTION        1        geometry_gist_consistent_nd (internal, geometry, integer),
	FUNCTION        2        geometry_gist_union_nd (bytea, internal),
	FUNCTION        3        geometry_gist_compress_nd (internal),
	FUNCTION        4        geometry_gist_decompress_nd (internal),
	FUNCTION        5        geometry_gist_penalty_nd (internal, internal, internal),
	FUNCTION        6        geometry_gist_picksplit_nd (internal, internal),
	FUNCTION        7        geometry_gist_same_nd (geometry, geometry, internal);

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_ShiftLongitude(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_longitude_shift'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_WrapX(geom geometry, wrap float8, move float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_WrapX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-----------------------------------------------------------------------------
--  BOX3D FUNCTIONS
-----------------------------------------------------------------------------

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_XMin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','BOX3D_xmin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_YMin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','BOX3D_ymin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_ZMin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','BOX3D_zmin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_XMax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','BOX3D_xmax'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_YMax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','BOX3D_ymax'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_ZMax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','BOX3D_zmax'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-----------------------------------------------------------------------------
--  BOX2D FUNCTIONS
-----------------------------------------------------------------------------

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Expand(box2d,float8)
	RETURNS box2d
	AS '$libdir/postgis-3', 'BOX2D_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Expand(box box2d, dx float8, dy float8)
	RETURNS box2d
	AS '$libdir/postgis-3', 'BOX2D_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_getbbox(geometry)
	RETURNS box2d
	AS '$libdir/postgis-3','LWGEOM_to_BOX2DF'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakeBox2d(geom1 geometry, geom2 geometry)
	RETURNS box2d
	AS '$libdir/postgis-3', 'BOX2D_construct'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-----------------------------------------------------------------------
-- ST_ESTIMATED_EXTENT( <schema name>, <table name>, <column name> )
-----------------------------------------------------------------------

-- Availability: 2.3.0
-- Changed: 3.4.0 drop security definer
CREATE OR REPLACE FUNCTION ST_EstimatedExtent(text,text,text,boolean) RETURNS box2d AS
	'$libdir/postgis-3', 'gserialized_estimated_extent'
	LANGUAGE 'c' STABLE STRICT;

-- Availability: 2.1.0
-- Changed: 3.4.0 drop security definer
CREATE OR REPLACE FUNCTION ST_EstimatedExtent(text,text,text) RETURNS box2d AS
	'$libdir/postgis-3', 'gserialized_estimated_extent'
	LANGUAGE 'c' STABLE STRICT;

-----------------------------------------------------------------------
-- ST_ESTIMATED_EXTENT( <table name>, <column name> )
-----------------------------------------------------------------------

-- Availability: 2.1.0
-- Changed: 3.4.0 drop security definer
CREATE OR REPLACE FUNCTION ST_EstimatedExtent(text,text) RETURNS box2d AS
	'$libdir/postgis-3', 'gserialized_estimated_extent'
	LANGUAGE 'c' STABLE STRICT;

-----------------------------------------------------------------------
-- FIND_EXTENT( <schema name>, <table name>, <column name> )
-----------------------------------------------------------------------

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_FindExtent(text,text,text) RETURNS box2d AS
$$
DECLARE
	schemaname alias for $1;
	tablename alias for $2;
	columnname alias for $3;
	myrec RECORD;
BEGIN
	FOR myrec IN EXECUTE 'SELECT ST_Extent("' || columnname || '") As extent FROM "' || schemaname || '"."' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT PARALLEL SAFE;

-----------------------------------------------------------------------
-- FIND_EXTENT( <table name>, <column name> )
-----------------------------------------------------------------------

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_FindExtent(text,text) RETURNS box2d AS
$$
DECLARE
	tablename alias for $1;
	columnname alias for $2;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT ST_Extent("' || columnname || '") As extent FROM "' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT PARALLEL SAFE;


-------------------------------------------
-- other lwgeom functions
-------------------------------------------
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_addbbox(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_addBBOX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_dropbbox(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_dropBBOX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_hasbbox(geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'LWGEOM_hasBBOX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_QuantizeCoordinates(g geometry, prec_x int, prec_y int DEFAULT NULL, prec_z int DEFAULT NULL, prec_m int DEFAULT NULL)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_QuantizeCoordinates'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

------------------------------------------------------------------------
-- DEBUG
------------------------------------------------------------------------

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_MemSize(geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_mem_size'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Summary(geometry)
	RETURNS text
	AS '$libdir/postgis-3', 'LWGEOM_summary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_NPoints(geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_npoints'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_NRings(geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_nrings'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

------------------------------------------------------------------------
-- Measures
------------------------------------------------------------------------
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_3DLength(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'LWGEOM_length_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Length2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'LWGEOM_length2d_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: length2d(geometry)
CREATE OR REPLACE FUNCTION ST_Length(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'LWGEOM_length2d_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability in 2.2.0
CREATE OR REPLACE FUNCTION ST_LengthSpheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','LWGEOM_length_ellipsoid_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_Length2DSpheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','LWGEOM_length2d_ellipsoid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_3DPerimeter(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'LWGEOM_perimeter_poly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_perimeter2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'LWGEOM_perimeter2d_poly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: perimeter2d(geometry)
CREATE OR REPLACE FUNCTION ST_Perimeter(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'LWGEOM_perimeter2d_poly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
-- Deprecation in 1.3.4
CREATE OR REPLACE FUNCTION ST_Area2D(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'ST_Area'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: area(geometry)
CREATE OR REPLACE FUNCTION ST_Area(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','ST_Area'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_IsPolygonCW(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_IsPolygonCW'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_IsPolygonCCW(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_IsPolygonCCW'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_DistanceSpheroid(geom1 geometry, geom2 geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','LWGEOM_distance_ellipsoid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION ST_DistanceSpheroid(geom1 geometry, geom2 geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','LWGEOM_distance_ellipsoid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Minimum distance. 2D only.
CREATE OR REPLACE FUNCTION ST_Distance(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_Distance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_PointInsideCircle(geometry,float8,float8,float8)
	RETURNS bool
	AS '$libdir/postgis-3', 'LWGEOM_inside_circle_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_azimuth(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'LWGEOM_azimuth'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_Project(geom1 geometry, distance float8, azimuth float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'geometry_project_direction'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_Project(geom1 geometry, geom2 geometry, distance float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'geometry_project_geometry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_Angle(pt1 geometry, pt2 geometry, pt3 geometry, pt4 geometry default 'POINT EMPTY'::geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'LWGEOM_angle'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineExtend(geom geometry, distance_forward float8, distance_backward float8 DEFAULT 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'geometry_line_extend'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: Future
-- CREATE OR REPLACE FUNCTION _ST_DistanceRectTree(g1 geometry, g2 geometry)
--	RETURNS float8
--	AS '$libdir/postgis-3', 'ST_DistanceRectTree'
--	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
--  COST 250;

-- Availability: Future
-- CREATE OR REPLACE FUNCTION _ST_DistanceRectTreeCached(g1 geometry, g2 geometry)
--	RETURNS float8
--	AS '$libdir/postgis-3', 'ST_DistanceRectTreeCached'
--	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
--  COST 250;

------------------------------------------------------------------------
-- MISC
------------------------------------------------------------------------

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_Force2D(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.1.0
-- Changed: 3.1.0 - add zvalue=0.0 parameter
-- Replaces ST_Force3DZ(geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Force3DZ(geom geometry, zvalue float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_3dz'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.1.0
-- Changed: 3.1.0 - add zvalue=0.0 parameter
-- Replaces ST_Force3D(geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Force3D(geom geometry, zvalue float8 default 0.0)
	RETURNS geometry
	AS 'SELECT ST_Force3DZ($1, $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.1.0
-- Changed: 3.1.0 - add mvalue=0.0 parameter
-- Replaces ST_Force3DM(geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Force3DM(geom geometry, mvalue float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_3dm'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.1.0
-- Changed: 3.1.0 - add zvalue=0.0 and mvalue=0.0 parameters
-- Replaces ST_Force4D(geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Force4D(geom geometry, zvalue float8 default 0.0, mvalue float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_4d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_ForceCollection(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_collection'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_CollectionExtract(geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CollectionExtract'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_CollectionExtract(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CollectionExtract'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_CollectionHomogenize(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CollectionHomogenize'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Multi(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_multi'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_ForceCurve(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_curve'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_ForceSFS(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_sfs'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_ForceSFS(geometry, version text)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_sfs'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Expand(box3d,float8)
	RETURNS box3d
	AS '$libdir/postgis-3', 'BOX3D_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Expand(box box3d, dx float8, dy float8, dz float8 DEFAULT 0)
	RETURNS box3d
	AS '$libdir/postgis-3', 'BOX3D_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Expand(geometry,float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Expand(geom geometry, dx float8, dy float8, dz float8 DEFAULT 0, dm float8 DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: envelope(geometry)
CREATE OR REPLACE FUNCTION ST_Envelope(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_envelope'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_BoundingDiagonal(geom geometry, fits boolean DEFAULT false)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_BoundingDiagonal'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Reverse(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_reverse'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_Scroll(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Scroll'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_ForcePolygonCW(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_clockwise_poly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_ForcePolygonCCW(geometry)
	RETURNS geometry
	AS $$ SELECT ST_Reverse(ST_ForcePolygonCW($1)) $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_ForceRHR(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_force_clockwise_poly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_noop(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_noop'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION postgis_geos_noop(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'GEOSnoop'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Normalize(geom geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Normalize'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Deprecation in 1.5.0
CREATE OR REPLACE FUNCTION ST_zmflag(geometry)
	RETURNS smallint
	AS '$libdir/postgis-3', 'LWGEOM_zmflag'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_NDims(geometry)
	RETURNS smallint
	AS '$libdir/postgis-3', 'LWGEOM_ndims'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION ST_HasZ(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_hasz'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION ST_HasM(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_hasm'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AsEWKT(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asEWKT'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_AsEWKT(geometry, integer)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asEWKT'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_AsTWKB(geom geometry, prec integer default NULL, prec_z integer default NULL, prec_m integer default NULL, with_sizes boolean default NULL, with_boxes boolean default NULL)
	RETURNS bytea
	AS '$libdir/postgis-3','TWKBFromLWGEOM'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_AsTWKB(geom geometry[], ids bigint[], prec integer default NULL, prec_z integer default NULL, prec_m integer default NULL, with_sizes boolean default NULL, with_boxes boolean default NULL)
	RETURNS bytea
	AS '$libdir/postgis-3','TWKBFromLWGEOMArray'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AsEWKB(geometry)
	RETURNS BYTEA
	AS '$libdir/postgis-3','WKBFromLWGEOM'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AsHEXEWKB(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asHEXEWKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AsHEXEWKB(geometry, text)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asHEXEWKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AsEWKB(geometry,text)
	RETURNS bytea
	AS '$libdir/postgis-3','WKBFromLWGEOM'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_AsLatLonText(geom geometry, tmpl text DEFAULT '')
	RETURNS text
	AS '$libdir/postgis-3','LWGEOM_to_latlon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Deprecation in 1.2.3
CREATE OR REPLACE FUNCTION GeomFromEWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOMFromEWKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomFromEWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOMFromEWKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2
CREATE OR REPLACE FUNCTION ST_GeomFromTWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOMFromTWKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Deprecation in 1.2.3
CREATE OR REPLACE FUNCTION GeomFromEWKT(text)
	RETURNS geometry
	AS '$libdir/postgis-3','parse_WKT_lwgeom'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomFromEWKT(text)
	RETURNS geometry
	AS '$libdir/postgis-3','parse_WKT_lwgeom'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_cache_bbox()
	RETURNS trigger
	AS '$libdir/postgis-3', 'cache_bbox'
	LANGUAGE 'c';

------------------------------------------------------------------------
-- CONSTRUCTORS
------------------------------------------------------------------------

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakePoint(float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakePoint(float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakePoint(float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.3.4
CREATE OR REPLACE FUNCTION ST_MakePointM(float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoint3dm'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_3DMakeBox(geom1 geometry, geom2 geometry)
	RETURNS box3d
	AS '$libdir/postgis-3', 'BOX3D_construct'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_MakeLine (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makeline_garray'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_LineFromMultiPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_line_from_mpoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakeLine(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makeline'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AddPoint(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_addpoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AddPoint(geom1 geometry, geom2 geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_addpoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_RemovePoint(geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_removepoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SetPoint(geometry, integer, geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_setpoint_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
-- Availability: 2.0.0 - made srid optional
CREATE OR REPLACE FUNCTION ST_MakeEnvelope(float8, float8, float8, float8, integer DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_MakeEnvelope'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.0.0
-- Changed: 3.1.0 - add margin=0.0 parameter
-- Replaces ST_TileEnvelope(zoom integer, x integer, y integer, bounds geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_TileEnvelope(zoom integer, x integer, y integer, bounds geometry DEFAULT 'SRID=3857;LINESTRING(-20037508.342789244 -20037508.342789244, 20037508.342789244 20037508.342789244)'::geometry, margin float8 DEFAULT 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_TileEnvelope'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakePolygon(geometry, geometry[])
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MakePolygon(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_BuildArea(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_BuildArea'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_Polygonize (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-3', 'polygonize_garray'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2
CREATE OR REPLACE FUNCTION ST_ClusterIntersecting(geometry[])
	RETURNS geometry[]
	AS '$libdir/postgis-3',  'clusterintersecting_garray'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2
CREATE OR REPLACE FUNCTION ST_ClusterWithin(geometry[], float8)
	RETURNS geometry[]
	AS '$libdir/postgis-3',  'cluster_within_distance_garray'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3
CREATE OR REPLACE FUNCTION ST_ClusterDBSCAN (geometry, eps float8, minpoints int)
	RETURNS int
	AS '$libdir/postgis-3', 'ST_ClusterDBSCAN'
	LANGUAGE 'c' IMMUTABLE STRICT WINDOW PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_ClusterWithinWin(geometry, distance float8)
	RETURNS int
	AS '$libdir/postgis-3', 'ST_ClusterWithinWin'
	LANGUAGE 'c' IMMUTABLE STRICT WINDOW PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_ClusterIntersectingWin(geometry)
	RETURNS int
	AS '$libdir/postgis-3', 'ST_ClusterIntersectingWin'
	LANGUAGE 'c' IMMUTABLE STRICT WINDOW PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_LineMerge(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'linemerge'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION ST_LineMerge(geometry, boolean)
	RETURNS geometry
	AS '$libdir/postgis-3', 'linemerge'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;


-----------------------------------------------------------------------------
-- Affine transforms
-----------------------------------------------------------------------------

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Affine(geometry,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_affine'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Affine(geometry,float8,float8,float8,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1,  $2, $3, 0,  $4, $5, 0,  0, 0, 1,  $6, $7, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Rotate(geometry,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1,  cos($2), -sin($2), 0,  sin($2), cos($2), 0,  0, 0, 1,  0, 0, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Rotate(geometry,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1,  cos($2), -sin($2), 0,  sin($2),  cos($2), 0, 0, 0, 1,	$3 - cos($2) * $3 + sin($2) * $4, $4 - sin($2) * $3 - cos($2) * $4, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Rotate(geometry,float8,geometry)
	RETURNS geometry
	AS 'SELECT ST_Affine($1,  cos($2), -sin($2), 0,  sin($2),  cos($2), 0, 0, 0, 1, ST_X($3) - cos($2) * ST_X($3) + sin($2) * ST_Y($3), ST_Y($3) - sin($2) * ST_X($3) - cos($2) * ST_Y($3), 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_RotateZ(geometry,float8)
	RETURNS geometry
	AS 'SELECT ST_Rotate($1, $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_RotateX(geometry,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1, 1, 0, 0, 0, cos($2), -sin($2), 0, sin($2), cos($2), 0, 0, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_RotateY(geometry,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1,  cos($2), 0, sin($2),  0, 1, 0,  -sin($2), 0, cos($2), 0,  0, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Translate(geometry,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1, 1, 0, 0, 0, 1, 0, 0, 0, 1, $2, $3, $4)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Translate(geometry,float8,float8)
	RETURNS geometry
	AS 'SELECT ST_Translate($1, $2, $3, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_Scale(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Scale'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_Scale(geometry,geometry,origin geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Scale'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Scale(geometry,float8,float8,float8)
	RETURNS geometry
	--AS 'SELECT ST_Affine($1,  $2, 0, 0,  0, $3, 0,  0, 0, $4,  0, 0, 0)'
	AS 'SELECT ST_Scale($1, ST_MakePoint($2, $3, $4))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Scale(geometry,float8,float8)
	RETURNS geometry
	AS 'SELECT ST_Scale($1, $2, $3, 1)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Transscale(geometry,float8,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT ST_Affine($1,  $4, 0, 0,  0, $5, 0,
		0, 0, 1,  $2 * $4, $3 * $5, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-----------------------------------------------------------------------
-- Dumping
-----------------------------------------------------------------------

-- Availability: 1.0.0
CREATE TYPE geometry_dump AS (
	path integer[],
	geom geometry
);

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Dump(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-3', 'LWGEOM_dump'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_DumpRings(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-3', 'LWGEOM_dump_rings'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- ST_DumpPoints()
-----------------------------------------------------------------------
-- This function mimics that of ST_Dump for collections, but this function
-- that returns a path and all the points that make up a particular geometry.
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_DumpPoints(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-3', 'LWGEOM_dumppoints'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_DumpSegments(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-3', 'LWGEOM_dumpsegments'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-------------------------------------------------------------------
-- SPATIAL_REF_SYS
-------------------------------------------------------------------
CREATE TABLE spatial_ref_sys (
	 srid integer not null primary key
		check (srid > 0 and srid <= 998999),
	 auth_name varchar(256),
	 auth_srid integer,
	 srtext varchar(2048),
	 proj4text varchar(2048)
);

-----------------------------------------------------------------------
-- POPULATE_GEOMETRY_COLUMNS()
-----------------------------------------------------------------------
-- Truncates and refills the geometry_columns table from all tables and
-- views in the database that contain geometry columns. This function
-- is a simple wrapper for populate_geometry_columns(oid).  In essence,
-- this function ensures every geometry column in the database has the
-- appropriate spatial constraints (for tables) and exists in the
-- geometry_columns table.
-- Availability: 1.4.0
-- Revised: 2.0.0 -- no longer deletes from geometry_columns
-- Has new use_typmod option that defaults to true.
-- If use typmod is  set to false will use old constraint behavior.
-- Will only touch table missing typmod or geometry constraints
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION populate_geometry_columns(use_typmod boolean DEFAULT true)
	RETURNS text AS
$$
DECLARE
	inserted	integer;
	oldcount	integer;
	probed	  integer;
	stale	   integer;
	gcs		 RECORD;
	gc		  RECORD;
	gsrid	   integer;
	gndims	  integer;
	gtype	   text;
	query	   text;
	gc_is_valid boolean;

BEGIN
	SELECT count(*) INTO oldcount FROM geometry_columns;
	inserted := 0;

	-- Count the number of geometry columns in all tables and views
	SELECT count(DISTINCT c.oid) INTO probed
	FROM pg_class c,
		 pg_attribute a,
		 pg_type t,
		 pg_namespace n
	WHERE c.relkind IN('r','v','f', 'p')
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND n.nspname NOT ILIKE 'pg_temp%' AND c.relname != 'raster_columns' ;

	-- Iterate through all non-dropped geometry columns
	RAISE DEBUG 'Processing Tables.....';

	FOR gcs IN
	SELECT DISTINCT ON (c.oid) c.oid, n.nspname, c.relname
		FROM pg_class c,
			 pg_attribute a,
			 pg_type t,
			 pg_namespace n
		WHERE c.relkind IN( 'r', 'f', 'p')
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND n.nspname NOT ILIKE 'pg_temp%' AND c.relname != 'raster_columns'
	LOOP

		inserted := inserted + populate_geometry_columns(gcs.oid, use_typmod);
	END LOOP;

	IF oldcount > inserted THEN
		stale = oldcount-inserted;
	ELSE
		stale = 0;
	END IF;

	RETURN 'probed:' ||probed|| ' inserted:'||inserted;
END

$$
LANGUAGE 'plpgsql' VOLATILE;

-----------------------------------------------------------------------
-- POPULATE_GEOMETRY_COLUMNS(tbl_oid oid)
-----------------------------------------------------------------------
-- DELETEs from and reINSERTs into the geometry_columns table all entries
-- associated with the oid of a particular table or view.
--
-- If the provided oid is for a table, this function tries to determine
-- the srid, dimension, and geometry type of the all geometries
-- in the table, adding constraints as necessary to the table.  If
-- successful, an appropriate row is inserted into the geometry_columns
-- table, otherwise, the exception is caught and an error notice is
-- raised describing the problem. (This is so the wrapper function
-- populate_geometry_columns() can apply spatial constraints to all
-- geometry columns across an entire database at once without erroring
-- out)
--
-- If the provided oid is for a view, as with a table oid, this function
-- tries to determine the srid, dimension, and type of all the geometries
-- in the view, inserting appropriate entries into the geometry_columns
-- table.
-- Availability: 1.4.0
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION populate_geometry_columns(tbl_oid oid, use_typmod boolean DEFAULT true)
	RETURNS integer AS
$$
DECLARE
	gcs		 RECORD;
	gc		  RECORD;
	gc_old	  RECORD;
	gsrid	   integer;
	gndims	  integer;
	gtype	   text;
	query	   text;
	gc_is_valid boolean;
	inserted	integer;
	constraint_successful boolean := false;

BEGIN
	inserted := 0;

	-- Iterate through all geometry columns in this table
	FOR gcs IN
	SELECT n.nspname, c.relname, a.attname, c.relkind
		FROM pg_class c,
			 pg_attribute a,
			 pg_type t,
			 pg_namespace n
		WHERE c.relkind IN('r', 'f', 'p')
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND n.nspname NOT ILIKE 'pg_temp%'
		AND c.oid = tbl_oid
	LOOP

		RAISE DEBUG 'Processing column %.%.%', gcs.nspname, gcs.relname, gcs.attname;

		gc_is_valid := true;
		-- Find the srid, coord_dimension, and type of current geometry
		-- in geometry_columns -- which is now a view

		SELECT type, srid, coord_dimension, gcs.relkind INTO gc_old
			FROM geometry_columns
			WHERE f_table_schema = gcs.nspname AND f_table_name = gcs.relname AND f_geometry_column = gcs.attname;

		IF upper(gc_old.type) = 'GEOMETRY' THEN
		-- This is an unconstrained geometry we need to do something
		-- We need to figure out what to set the type by inspecting the data
			EXECUTE 'SELECT ST_srid(' || quote_ident(gcs.attname) || ') As srid, GeometryType(' || quote_ident(gcs.attname) || ') As type, ST_NDims(' || quote_ident(gcs.attname) || ') As dims ' ||
					 ' FROM ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) ||
					 ' WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1;'
				INTO gc;
			IF gc IS NULL THEN -- there is no data so we can not determine geometry type
				RAISE WARNING 'No data in table %.%, so no information to determine geometry type and srid', gcs.nspname, gcs.relname;
				RETURN 0;
			END IF;
			gsrid := gc.srid; gtype := gc.type; gndims := gc.dims;

			IF use_typmod THEN
				BEGIN
					EXECUTE 'ALTER TABLE ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || ' ALTER COLUMN ' || quote_ident(gcs.attname) ||
						' TYPE geometry(' || postgis_type_name(gtype, gndims, true) || ', ' || gsrid::text  || ') ';
					inserted := inserted + 1;
				EXCEPTION
						WHEN invalid_parameter_value OR feature_not_supported THEN
						RAISE WARNING 'Could not convert ''%'' in ''%.%'' to use typmod with srid %, type %: %', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname), gsrid, postgis_type_name(gtype, gndims, true), SQLERRM;
							gc_is_valid := false;
				END;

			ELSE
				-- Try to apply srid check to column
				constraint_successful = false;
				IF (gsrid > 0 AND postgis_constraint_srid(gcs.nspname, gcs.relname,gcs.attname) IS NULL ) THEN
					BEGIN
						EXECUTE 'ALTER TABLE ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) ||
								 ' ADD CONSTRAINT ' || quote_ident('enforce_srid_' || gcs.attname) ||
								 ' CHECK (ST_srid(' || quote_ident(gcs.attname) || ') = ' || gsrid || ')';
						constraint_successful := true;
					EXCEPTION
						WHEN check_violation THEN
							RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not apply constraint CHECK (st_srid(%) = %)', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname), quote_ident(gcs.attname), gsrid;
							gc_is_valid := false;
					END;
				END IF;

				-- Try to apply ndims check to column
				IF (gndims IS NOT NULL AND postgis_constraint_dims(gcs.nspname, gcs.relname,gcs.attname) IS NULL ) THEN
					BEGIN
						EXECUTE 'ALTER TABLE ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
								 ADD CONSTRAINT ' || quote_ident('enforce_dims_' || gcs.attname) || '
								 CHECK (st_ndims(' || quote_ident(gcs.attname) || ') = '||gndims||')';
						constraint_successful := true;
					EXCEPTION
						WHEN check_violation THEN
							RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not apply constraint CHECK (st_ndims(%) = %)', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname), quote_ident(gcs.attname), gndims;
							gc_is_valid := false;
					END;
				END IF;

				-- Try to apply geometrytype check to column
				IF (gtype IS NOT NULL AND postgis_constraint_type(gcs.nspname, gcs.relname,gcs.attname) IS NULL ) THEN
					BEGIN
						EXECUTE 'ALTER TABLE ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
						ADD CONSTRAINT ' || quote_ident('enforce_geotype_' || gcs.attname) || '
						CHECK (geometrytype(' || quote_ident(gcs.attname) || ') = ' || quote_literal(gtype) || ')';
						constraint_successful := true;
					EXCEPTION
						WHEN check_violation THEN
							-- No geometry check can be applied. This column contains a number of geometry types.
							RAISE WARNING 'Could not add geometry type check (%) to table column: %.%.%', gtype, quote_ident(gcs.nspname),quote_ident(gcs.relname),quote_ident(gcs.attname);
					END;
				END IF;
				 --only count if we were successful in applying at least one constraint
				IF constraint_successful THEN
					inserted := inserted + 1;
				END IF;
			END IF;
		END IF;

	END LOOP;

	RETURN inserted;
END

$$
LANGUAGE 'plpgsql' VOLATILE;

-----------------------------------------------------------------------
-- ADDGEOMETRYCOLUMN
--   <catalogue>, <schema>, <table>, <column>, <srid>, <type>, <dim>
-----------------------------------------------------------------------
--
-- Type can be one of GEOMETRY, GEOMETRYCOLLECTION, POINT, MULTIPOINT, POLYGON,
-- MULTIPOLYGON, LINESTRING, or MULTILINESTRING.
--
-- Geometry types (except GEOMETRY) are checked for consistency using a CHECK constraint.
-- Uses an ALTER TABLE command to add the geometry column to the table.
-- Adds a row to geometry_columns.
-- Adds a constraint on the table that all the geometries MUST have the same
-- SRID. Checks the coord_dimension to make sure its between 0 and 3.
-- Should also check the precision grid (future expansion).
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION AddGeometryColumn(catalog_name varchar,schema_name varchar,table_name varchar,column_name varchar,new_srid_in integer,new_type varchar,new_dim integer, use_typmod boolean DEFAULT true)
	RETURNS text
	AS
$$
DECLARE
	rec RECORD;
	sr varchar;
	real_schema name;
	sql text;
	new_srid integer;

BEGIN

	-- Verify geometry type
	IF (postgis_type_name(new_type,new_dim) IS NULL )
	THEN
		RAISE EXCEPTION 'Invalid type name "%(%)" - valid ones are:
	POINT, MULTIPOINT,
	LINESTRING, MULTILINESTRING,
	POLYGON, MULTIPOLYGON,
	CIRCULARSTRING, COMPOUNDCURVE, MULTICURVE,
	CURVEPOLYGON, MULTISURFACE,
	GEOMETRY, GEOMETRYCOLLECTION,
	POINTM, MULTIPOINTM,
	LINESTRINGM, MULTILINESTRINGM,
	POLYGONM, MULTIPOLYGONM,
	CIRCULARSTRINGM, COMPOUNDCURVEM, MULTICURVEM
	CURVEPOLYGONM, MULTISURFACEM, TRIANGLE, TRIANGLEM,
	POLYHEDRALSURFACE, POLYHEDRALSURFACEM, TIN, TINM
	or GEOMETRYCOLLECTIONM', new_type, new_dim;
		RETURN 'fail';
	END IF;

	-- Verify dimension
	IF ( (new_dim >4) OR (new_dim <2) ) THEN
		RAISE EXCEPTION 'invalid dimension';
		RETURN 'fail';
	END IF;

	IF ( (new_type LIKE '%M') AND (new_dim!=3) ) THEN
		RAISE EXCEPTION 'TypeM needs 3 dimensions';
		RETURN 'fail';
	END IF;

	-- Verify SRID
	IF ( new_srid_in > 0 ) THEN
		IF new_srid_in > 998999 THEN
			RAISE EXCEPTION 'AddGeometryColumn() - SRID must be <= %', 998999;
		END IF;
		new_srid := new_srid_in;
		SELECT SRID INTO sr FROM spatial_ref_sys WHERE SRID = new_srid;
		IF NOT FOUND THEN
			RAISE EXCEPTION 'AddGeometryColumn() - invalid SRID';
			RETURN 'fail';
		END IF;
	ELSE
		new_srid := ST_SRID('POINT EMPTY'::geometry);
		IF ( new_srid_in != new_srid ) THEN
			RAISE NOTICE 'SRID value % converted to the officially unknown SRID value %', new_srid_in, new_srid;
		END IF;
	END IF;

	-- Verify schema
	IF ( schema_name IS NOT NULL AND schema_name != '' ) THEN
		sql := 'SELECT nspname FROM pg_namespace ' ||
			'WHERE text(nspname) = ' || quote_literal(schema_name) ||
			'LIMIT 1';
		RAISE DEBUG '%', sql;
		EXECUTE sql INTO real_schema;

		IF ( real_schema IS NULL ) THEN
			RAISE EXCEPTION 'Schema % is not a valid schemaname', quote_literal(schema_name);
			RETURN 'fail';
		END IF;
	END IF;

	IF ( real_schema IS NULL ) THEN
		RAISE DEBUG 'Detecting schema';
		sql := 'SELECT n.nspname AS schemaname ' ||
			'FROM pg_catalog.pg_class c ' ||
			  'JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace ' ||
			'WHERE c.relkind = ' || quote_literal('r') ||
			' AND n.nspname NOT IN (' || quote_literal('pg_catalog') || ', ' || quote_literal('pg_toast') || ')' ||
			' AND pg_catalog.pg_table_is_visible(c.oid)' ||
			' AND c.relname = ' || quote_literal(table_name);
		RAISE DEBUG '%', sql;
		EXECUTE sql INTO real_schema;

		IF ( real_schema IS NULL ) THEN
			RAISE EXCEPTION 'Table % does not occur in the search_path', quote_literal(table_name);
			RETURN 'fail';
		END IF;
	END IF;

	-- Add geometry column to table
	IF use_typmod THEN
		 sql := 'ALTER TABLE ' ||
			quote_ident(real_schema) || '.' || quote_ident(table_name)
			|| ' ADD COLUMN ' || quote_ident(column_name) ||
			' geometry(' || postgis_type_name(new_type, new_dim) || ', ' || new_srid::text || ')';
		RAISE DEBUG '%', sql;
	ELSE
		sql := 'ALTER TABLE ' ||
			quote_ident(real_schema) || '.' || quote_ident(table_name)
			|| ' ADD COLUMN ' || quote_ident(column_name) ||
			' geometry ';
		RAISE DEBUG '%', sql;
	END IF;
	EXECUTE sql;

	IF NOT use_typmod THEN
		-- Add table CHECKs
		sql := 'ALTER TABLE ' ||
			quote_ident(real_schema) || '.' || quote_ident(table_name)
			|| ' ADD CONSTRAINT '
			|| quote_ident('enforce_srid_' || column_name)
			|| ' CHECK (st_srid(' || quote_ident(column_name) ||
			') = ' || new_srid::text || ')' ;
		RAISE DEBUG '%', sql;
		EXECUTE sql;

		sql := 'ALTER TABLE ' ||
			quote_ident(real_schema) || '.' || quote_ident(table_name)
			|| ' ADD CONSTRAINT '
			|| quote_ident('enforce_dims_' || column_name)
			|| ' CHECK (st_ndims(' || quote_ident(column_name) ||
			') = ' || new_dim::text || ')' ;
		RAISE DEBUG '%', sql;
		EXECUTE sql;

		IF ( NOT (new_type = 'GEOMETRY')) THEN
			sql := 'ALTER TABLE ' ||
				quote_ident(real_schema) || '.' || quote_ident(table_name) || ' ADD CONSTRAINT ' ||
				quote_ident('enforce_geotype_' || column_name) ||
				' CHECK (GeometryType(' ||
				quote_ident(column_name) || ')=' ||
				quote_literal(new_type) || ' OR (' ||
				quote_ident(column_name) || ') is null)';
			RAISE DEBUG '%', sql;
			EXECUTE sql;
		END IF;
	END IF;

	RETURN
		real_schema || '.' ||
		table_name || '.' || column_name ||
		' SRID:' || new_srid::text ||
		' TYPE:' || new_type ||
		' DIMS:' || new_dim::text || ' ';
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

----------------------------------------------------------------------------
-- ADDGEOMETRYCOLUMN ( <schema>, <table>, <column>, <srid>, <type>, <dim> )
----------------------------------------------------------------------------
--
-- This is a wrapper to the real AddGeometryColumn, for use
-- when catalogue is undefined
--
----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION AddGeometryColumn(schema_name varchar,table_name varchar,column_name varchar,new_srid integer,new_type varchar,new_dim integer, use_typmod boolean DEFAULT true) RETURNS text AS $$
DECLARE
	ret  text;
BEGIN
	SELECT AddGeometryColumn('',$1,$2,$3,$4,$5,$6,$7) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;

----------------------------------------------------------------------------
-- ADDGEOMETRYCOLUMN ( <table>, <column>, <srid>, <type>, <dim> )
----------------------------------------------------------------------------
--
-- This is a wrapper to the real AddGeometryColumn, for use
-- when catalogue and schema are undefined
--
----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION AddGeometryColumn(table_name varchar,column_name varchar,new_srid integer,new_type varchar,new_dim integer, use_typmod boolean DEFAULT true) RETURNS text AS $$
DECLARE
	ret  text;
BEGIN
	SELECT AddGeometryColumn('','',$1,$2,$3,$4,$5, $6) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- DROPGEOMETRYCOLUMN
--   <catalogue>, <schema>, <table>, <column>
-----------------------------------------------------------------------
--
-- Removes geometry column reference from geometry_columns table.
-- Drops the column with pgsql >= 73.
-- Make some silly enforcements on it for pgsql < 73
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION DropGeometryColumn(catalog_name varchar, schema_name varchar,table_name varchar,column_name varchar)
	RETURNS text
	AS
$$
DECLARE
	myrec RECORD;
	okay boolean;
	real_schema name;

BEGIN

	-- Find, check or fix schema_name
	IF ( schema_name != '' ) THEN
		okay = false;

		FOR myrec IN SELECT nspname FROM pg_namespace WHERE text(nspname) = schema_name LOOP
			okay := true;
		END LOOP;

		IF ( okay <>  true ) THEN
			RAISE NOTICE 'Invalid schema name - using current_schema()';
			SELECT current_schema() into real_schema;
		ELSE
			real_schema = schema_name;
		END IF;
	ELSE
		SELECT current_schema() into real_schema;
	END IF;

	-- Find out if the column is in the geometry_columns table
	okay = false;
	FOR myrec IN SELECT * from geometry_columns where f_table_schema = text(real_schema) and f_table_name = table_name and f_geometry_column = column_name LOOP
		okay := true;
	END LOOP;
	IF (okay <> true) THEN
		RAISE EXCEPTION 'column not found in geometry_columns table';
		RETURN false;
	END IF;

	-- Remove table column
	EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) || '.' ||
		quote_ident(table_name) || ' DROP COLUMN ' ||
		quote_ident(column_name);

	RETURN real_schema || '.' || table_name || '.' || column_name ||' effectively removed.';

END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- DROPGEOMETRYCOLUMN
--   <schema>, <table>, <column>
-----------------------------------------------------------------------
--
-- This is a wrapper to the real DropGeometryColumn, for use
-- when catalogue is undefined
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION DropGeometryColumn(schema_name varchar, table_name varchar,column_name varchar)
	RETURNS text
	AS
$$
DECLARE
	ret text;
BEGIN
	SELECT DropGeometryColumn('',$1,$2,$3) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- DROPGEOMETRYCOLUMN
--   <table>, <column>
-----------------------------------------------------------------------
--
-- This is a wrapper to the real DropGeometryColumn, for use
-- when catalogue and schema is undefined.
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION DropGeometryColumn(table_name varchar, column_name varchar)
	RETURNS text
	AS
$$
DECLARE
	ret text;
BEGIN
	SELECT DropGeometryColumn('','',$1,$2) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- DROPGEOMETRYTABLE
--   <catalogue>, <schema>, <table>
-----------------------------------------------------------------------
--
-- Drop a table and all its references in geometry_columns
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION DropGeometryTable(catalog_name varchar, schema_name varchar, table_name varchar)
	RETURNS text
	AS
$$
DECLARE
	real_schema name;

BEGIN

	IF ( schema_name = '' ) THEN
		SELECT current_schema() into real_schema;
	ELSE
		real_schema = schema_name;
	END IF;

	-- TODO: Should we warn if table doesn't exist probably instead just saying dropped
	-- Remove table
	EXECUTE 'DROP TABLE IF EXISTS '
		|| quote_ident(real_schema) || '.' ||
		quote_ident(table_name) || ' RESTRICT';

	RETURN
		real_schema || '.' ||
		table_name ||' dropped.';

END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- DROPGEOMETRYTABLE
--   <schema>, <table>
-----------------------------------------------------------------------
--
-- Drop a table and all its references in geometry_columns
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION DropGeometryTable(schema_name varchar, table_name varchar) RETURNS text AS
$$ SELECT DropGeometryTable('',$1,$2) $$
LANGUAGE 'sql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- DROPGEOMETRYTABLE
--   <table>
-----------------------------------------------------------------------
--
-- Drop a table and all its references in geometry_columns
-- For PG>=73 use current_schema()
--
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION DropGeometryTable(table_name varchar) RETURNS text AS
$$ SELECT DropGeometryTable('','',$1) $$
LANGUAGE 'sql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- UPDATEGEOMETRYSRID
--   <catalogue>, <schema>, <table>, <column>, <srid>
-----------------------------------------------------------------------
--
-- Change SRID of all features in a spatially-enabled table
--
-----------------------------------------------------------------------
-- Changed: 2.1.4 check against real_schema
CREATE OR REPLACE FUNCTION UpdateGeometrySRID(catalogn_name varchar,schema_name varchar,table_name varchar,column_name varchar,new_srid_in integer)
	RETURNS text
	AS
$$
DECLARE
	myrec RECORD;
	okay boolean;
	cname varchar;
	real_schema name;
	unknown_srid integer;
	new_srid integer := new_srid_in;

BEGIN

	-- Find, check or fix schema_name
	IF ( schema_name != '' ) THEN
		okay = false;

		FOR myrec IN SELECT nspname FROM pg_namespace WHERE text(nspname) = schema_name LOOP
			okay := true;
		END LOOP;

		IF ( okay <> true ) THEN
			RAISE EXCEPTION 'Invalid schema name';
		ELSE
			real_schema = schema_name;
		END IF;
	ELSE
		SELECT INTO real_schema current_schema()::text;
	END IF;

	-- Ensure that column_name is in geometry_columns
	okay = false;
	FOR myrec IN SELECT type, coord_dimension FROM geometry_columns WHERE f_table_schema = text(real_schema) and f_table_name = table_name and f_geometry_column = column_name LOOP
		okay := true;
	END LOOP;
	IF (NOT okay) THEN
		RAISE EXCEPTION 'column not found in geometry_columns table';
		RETURN false;
	END IF;

	-- Ensure that new_srid is valid
	IF ( new_srid > 0 ) THEN
		IF ( SELECT count(*) = 0 from spatial_ref_sys where srid = new_srid ) THEN
			RAISE EXCEPTION 'invalid SRID: % not found in spatial_ref_sys', new_srid;
			RETURN false;
		END IF;
	ELSE
		unknown_srid := ST_SRID('POINT EMPTY'::geometry);
		IF ( new_srid != unknown_srid ) THEN
			new_srid := unknown_srid;
			RAISE NOTICE 'SRID value % converted to the officially unknown SRID value %', new_srid_in, new_srid;
		END IF;
	END IF;

	IF postgis_constraint_srid(real_schema, table_name, column_name) IS NOT NULL THEN
	-- srid was enforced with constraints before, keep it that way.
		-- Make up constraint name
		cname = 'enforce_srid_'  || column_name;

		-- Drop enforce_srid constraint
		EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) ||
			'.' || quote_ident(table_name) ||
			' DROP constraint ' || quote_ident(cname);

		-- Update geometries SRID
		EXECUTE 'UPDATE ' || quote_ident(real_schema) ||
			'.' || quote_ident(table_name) ||
			' SET ' || quote_ident(column_name) ||
			' = ST_SetSRID(' || quote_ident(column_name) ||
			', ' || new_srid::text || ')';

		-- Reset enforce_srid constraint
		EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) ||
			'.' || quote_ident(table_name) ||
			' ADD constraint ' || quote_ident(cname) ||
			' CHECK (st_srid(' || quote_ident(column_name) ||
			') = ' || new_srid::text || ')';
	ELSE
		-- We will use typmod to enforce if no srid constraints
		-- We are using postgis_type_name to lookup the new name
		-- (in case Paul changes his mind and flips geometry_columns to return old upper case name)
		EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) || '.' || quote_ident(table_name) ||
		' ALTER COLUMN ' || quote_ident(column_name) || ' TYPE  geometry(' || postgis_type_name(myrec.type, myrec.coord_dimension, true) || ', ' || new_srid::text || ') USING ST_SetSRID(' || quote_ident(column_name) || ',' || new_srid::text || ');' ;
	END IF;

	RETURN real_schema || '.' || table_name || '.' || column_name ||' SRID changed to ' || new_srid::text;

END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- UPDATEGEOMETRYSRID
--   <schema>, <table>, <column>, <srid>
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION UpdateGeometrySRID(varchar,varchar,varchar,integer)
	RETURNS text
	AS $$
DECLARE
	ret  text;
BEGIN
	SELECT UpdateGeometrySRID('',$1,$2,$3,$4) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- UPDATEGEOMETRYSRID
--   <table>, <column>, <srid>
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION UpdateGeometrySRID(varchar,varchar,integer)
	RETURNS text
	AS $$
DECLARE
	ret  text;
BEGIN
	SELECT UpdateGeometrySRID('','',$1,$2,$3) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

-----------------------------------------------------------------------
-- FIND_SRID( <schema>, <table>, <geom col> )
-----------------------------------------------------------------------
-- Changed: 2.1.8 improve performance
CREATE OR REPLACE FUNCTION find_srid(varchar,varchar,varchar) RETURNS integer AS
$$
DECLARE
	schem varchar =  $1;
	tabl varchar = $2;
	sr int4;
BEGIN
-- if the table contains a . and the schema is empty
-- split the table into a schema and a table
-- otherwise drop through to default behavior
	IF ( schem = '' and strpos(tabl,'.') > 0 ) THEN
	 schem = substr(tabl,1,strpos(tabl,'.')-1);
	 tabl = substr(tabl,length(schem)+2);
	END IF;

	select SRID into sr from geometry_columns where (f_table_schema = schem or schem = '') and f_table_name = tabl and f_geometry_column = $3;
	IF NOT FOUND THEN
	   RAISE EXCEPTION 'find_srid() - could not find the corresponding SRID - is the geometry registered in the GEOMETRY_COLUMNS table?  Is there an uppercase/lowercase mismatch?';
	END IF;
	return sr;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT PARALLEL SAFE;

---------------------------------------------------------------
-- PROJ support
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_proj4_from_srid(integer) RETURNS text AS
	$$
	BEGIN
	RETURN proj4text::text FROM spatial_ref_sys WHERE srid= $1;
	END;
	$$
	LANGUAGE 'plpgsql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SetSRID(geom geometry, srid integer)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_set_srid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION ST_SRID(geom geometry)
	RETURNS integer
	AS '$libdir/postgis-3','LWGEOM_get_srid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

CREATE OR REPLACE FUNCTION postgis_transform_geometry(geom geometry, text, text, int)
	RETURNS geometry
	AS '$libdir/postgis-3','transform_geom'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

------------------------------------------------------------------------

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION postgis_srs_codes(auth_name text)
	RETURNS SETOF TEXT
	AS '$libdir/postgis-3', 'postgis_srs_codes'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION postgis_srs(auth_name text, auth_srid text)
	RETURNS TABLE(
		auth_name TEXT,
		auth_srid TEXT,
		srname TEXT,
		srtext TEXT,
		proj4text TEXT,
		point_sw GEOMETRY,
		point_ne GEOMETRY
		)
	AS '$libdir/postgis-3', 'postgis_srs_entry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION postgis_srs_all()
	RETURNS TABLE(
		auth_name TEXT,
		auth_srid TEXT,
		srname TEXT,
		srtext TEXT,
		proj4text TEXT,
		point_sw GEOMETRY,
		point_ne GEOMETRY
		)
	AS '$libdir/postgis-3', 'postgis_srs_entry_all'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION postgis_srs_search(
		bounds geometry,
		authname text DEFAULT 'EPSG')
	RETURNS TABLE(
		auth_name TEXT,
		auth_srid TEXT,
		srname TEXT,
		srtext TEXT,
		proj4text TEXT,
		point_sw GEOMETRY,
		point_ne GEOMETRY
		)
	AS '$libdir/postgis-3', 'postgis_srs_search'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;


------------------------------------------------------------------------

-- PostGIS equivalent of old function: transform(geometry,integer)
CREATE OR REPLACE FUNCTION ST_Transform(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-3','transform'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Transform(geom geometry, to_proj text)
	RETURNS geometry AS
	'SELECT postgis_transform_geometry($1, proj4text, $2, 0)
	FROM spatial_ref_sys WHERE srid=ST_SRID($1);'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Transform(geom geometry, from_proj text, to_proj text)
	RETURNS geometry AS
	'SELECT postgis_transform_geometry($1, $2, $3, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Transform(geom geometry, from_proj text, to_srid integer)
	RETURNS geometry AS
	'SELECT postgis_transform_geometry($1, $2, proj4text, $3)
	FROM spatial_ref_sys WHERE srid=$3;'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION postgis_transform_pipeline_geometry(geom geometry, pipeline text, forward boolean, to_srid integer)
	RETURNS geometry
	AS '$libdir/postgis-3','transform_pipeline_geom'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.4.0

CREATE OR REPLACE FUNCTION ST_TransformPipeline(geom geometry, pipeline text, to_srid integer DEFAULT 0)
	RETURNS geometry AS
	'SELECT postgis_transform_pipeline_geometry($1, $2, TRUE, $3)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0

CREATE OR REPLACE FUNCTION ST_InverseTransformPipeline(geom geometry, pipeline text, to_srid integer DEFAULT 0)
	RETURNS geometry AS
	'SELECT postgis_transform_pipeline_geometry($1, $2, FALSE, $3)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0

-----------------------------------------------------------------------
-- POSTGIS_VERSION()
-----------------------------------------------------------------------

CREATE OR REPLACE FUNCTION postgis_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE
	COST 1;

CREATE OR REPLACE FUNCTION postgis_liblwgeom_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE
	COST 1;

CREATE OR REPLACE FUNCTION postgis_proj_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE
	COST 1;

CREATE OR REPLACE FUNCTION postgis_proj_compiled_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE
	COST 1;

CREATE OR REPLACE FUNCTION postgis_wagyu_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE
	COST 1;

--
-- IMPORTANT:
-- Starting at 1.1.0 this function is used by create_upgrade.pl
-- to extract version of postgis being installed.
-- Do not modify this w/out also changing create_upgrade.pl
--
CREATE OR REPLACE FUNCTION postgis_scripts_installed() RETURNS text
	AS $$ SELECT trim('3.5.0'::text || $rev$ v2.6.7-235-g3b0a45f $rev$) AS version $$
	LANGUAGE 'sql' IMMUTABLE;

CREATE OR REPLACE FUNCTION postgis_lib_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE; -- a new lib will require a new session

-- NOTE: from 1.1.0 to 1.5.x this was the same of postgis_lib_version()
-- NOTE: from 2.0.0 up it includes postgis revision
CREATE OR REPLACE FUNCTION postgis_scripts_released() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE;

CREATE OR REPLACE FUNCTION postgis_geos_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION postgis_geos_compiled_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE;

--- Availability: 3.1.0
CREATE OR REPLACE FUNCTION postgis_lib_revision() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE;

--- Availability: 2.0.0
--- Deprecation in 3.1.0
CREATE OR REPLACE FUNCTION postgis_svn_version()
RETURNS text AS $$
	SELECT _postgis_deprecate(
		'postgis_svn_version', 'postgis_lib_revision', '3.1.0');
	SELECT postgis_lib_revision();
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;



CREATE OR REPLACE FUNCTION postgis_libxml_version() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE;

CREATE OR REPLACE FUNCTION postgis_scripts_build_date() RETURNS text
	AS 'SELECT ''2024-11-14 00:30:28''::text AS version'
	LANGUAGE 'sql' IMMUTABLE;

CREATE OR REPLACE FUNCTION postgis_lib_build_date() RETURNS text
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE;

CREATE OR REPLACE FUNCTION _postgis_scripts_pgsql_version() RETURNS text
	AS 'SELECT ''170''::text AS version'
	LANGUAGE 'sql' IMMUTABLE;

CREATE OR REPLACE FUNCTION _postgis_pgsql_version() RETURNS text
AS $$
	SELECT CASE WHEN pg_catalog.split_part(s,'.',1)::integer > 9 THEN pg_catalog.split_part(s,'.',1) || '0'
	ELSE pg_catalog.split_part(s,'.', 1) || pg_catalog.split_part(s,'.', 2) END AS v
	FROM pg_catalog.substring(version(), E'PostgreSQL ([0-9\\.]+)') AS s;
$$ LANGUAGE 'sql' STABLE;

-- Availability: 2.5.0
-- Changed: 3.3.0 support for upgrades from any PostGIS version
-- Changed: 3.0.1 install from unpackaged should include postgis schema #4581
-- Changed: 3.0.0 also upgrade postgis_raster if it exists
-- Changed: 3.4.0 to add target_version argument
-- Replaces postgis_extensions_upgrade() deprecated in 3.4.0
CREATE OR REPLACE FUNCTION postgis_extensions_upgrade(target_version text DEFAULT NULL) RETURNS text
AS $BODY$
DECLARE
	rec record;
	sql text;
	var_schema text;
BEGIN

	FOR rec IN
		SELECT name, default_version, installed_version
		FROM pg_catalog.pg_available_extensions
		WHERE name IN (
			'postgis',
			'postgis_raster',
			'postgis_sfcgal',
			'postgis_topology',
			'postgis_tiger_geocoder'
		)
		ORDER BY length(name) -- this is to make sure 'postgis' is first !
	LOOP --{

		IF target_version IS NULL THEN
			target_version := rec.default_version;
		END IF;

		IF rec.installed_version IS NULL THEN --{
			-- If the support installed by available extension
			-- is found unpackaged, we package it
			IF --{
				 -- PostGIS is always available (this function is part of it)
				 rec.name = 'postgis'

				 -- PostGIS raster is available if type 'raster' exists
				 OR ( rec.name = 'postgis_raster' AND EXISTS (
							SELECT 1 FROM pg_catalog.pg_type
							WHERE typname = 'raster' ) )

				 -- PostGIS SFCGAL is available if
				 -- 'postgis_sfcgal_version' function exists
				 OR ( rec.name = 'postgis_sfcgal' AND EXISTS (
							SELECT 1 FROM pg_catalog.pg_proc
							WHERE proname = 'postgis_sfcgal_version' ) )

				 -- PostGIS Topology is available if
				 -- 'topology.topology' table exists
				 -- NOTE: watch out for https://trac.osgeo.org/postgis/ticket/2503
				 OR ( rec.name = 'postgis_topology' AND EXISTS (
							SELECT 1 FROM pg_catalog.pg_class c
							JOIN pg_catalog.pg_namespace n ON (c.relnamespace = n.oid )
							WHERE n.nspname = 'topology' AND c.relname = 'topology') )

				 OR ( rec.name = 'postgis_tiger_geocoder' AND EXISTS (
							SELECT 1 FROM pg_catalog.pg_class c
							JOIN pg_catalog.pg_namespace n ON (c.relnamespace = n.oid )
							WHERE n.nspname = 'tiger' AND c.relname = 'geocode_settings') )
			THEN --}{ -- the code is unpackaged
				-- Force install in same schema as postgis
				SELECT INTO var_schema n.nspname
				  FROM pg_namespace n, pg_proc p
				  WHERE p.proname = 'postgis_full_version'
					AND n.oid = p.pronamespace
				  LIMIT 1;
				IF rec.name NOT IN('postgis_topology', 'postgis_tiger_geocoder')
				THEN
					sql := format(
							  'CREATE EXTENSION %1$I SCHEMA %2$I VERSION unpackaged;'
							  'ALTER EXTENSION %1$I UPDATE TO %3$I',
							  rec.name, var_schema, target_version);
				ELSE
					sql := format(
							 'CREATE EXTENSION %1$I VERSION unpackaged;'
							 'ALTER EXTENSION %1$I UPDATE TO %2$I',
							 rec.name, target_version);
				END IF;
				RAISE NOTICE 'Packaging and updating %', rec.name;
				RAISE DEBUG '%', sql;
				EXECUTE sql;
			ELSE
				RAISE DEBUG 'Skipping % (not in use)', rec.name;
			END IF; --}
		ELSE -- The code is already packaged, upgrade it --}{
			sql = format(
				'ALTER EXTENSION %1$I UPDATE TO "ANY";'
				'ALTER EXTENSION %1$I UPDATE TO %2$I',
				rec.name, target_version
				);
			RAISE NOTICE 'Updating extension % %', rec.name, rec.installed_version;
			RAISE DEBUG '%', sql;
			EXECUTE sql;
		END IF; --}

	END LOOP; --}

	RETURN format(
		'Upgrade to version %s completed, run SELECT postgis_full_version(); for details',
		target_version
	);


END
$BODY$ LANGUAGE plpgsql VOLATILE;

-- Changed: 3.0.0
-- Changed: 3.4.0 to include geos compiled version
CREATE OR REPLACE FUNCTION postgis_full_version() RETURNS text
AS $$
DECLARE
	libver text;
	librev text;
	projver text;
	projver_compiled text;
	geosver text;
	geosver_compiled text;
	sfcgalver text;
	gdalver text := NULL;
	libxmlver text;
	liblwgeomver text;
	dbproc text;
	relproc text;
	fullver text;
	rast_lib_ver text := NULL;
	rast_scr_ver text := NULL;
	topo_scr_ver text := NULL;
	json_lib_ver text;
	protobuf_lib_ver text;
	wagyu_lib_ver text;
	sfcgal_lib_ver text;
	sfcgal_scr_ver text;
	pgsql_scr_ver text;
	pgsql_ver text;
	core_is_extension bool;
BEGIN
	SELECT postgis_lib_version() INTO libver;
	SELECT postgis_proj_version() INTO projver;
	SELECT postgis_geos_version() INTO geosver;
	SELECT postgis_geos_compiled_version() INTO geosver_compiled;
	SELECT postgis_proj_compiled_version() INTO projver_compiled;
	SELECT postgis_libjson_version() INTO json_lib_ver;
	SELECT postgis_libprotobuf_version() INTO protobuf_lib_ver;
	SELECT postgis_wagyu_version() INTO wagyu_lib_ver;
	SELECT _postgis_scripts_pgsql_version() INTO pgsql_scr_ver;
	SELECT _postgis_pgsql_version() INTO pgsql_ver;
	BEGIN
		SELECT postgis_gdal_version() INTO gdalver;
	EXCEPTION
		WHEN undefined_function THEN
			RAISE DEBUG 'Function postgis_gdal_version() not found.  Is raster support enabled and rtpostgis.sql installed?';
	END;
	BEGIN
		SELECT postgis_sfcgal_full_version() INTO sfcgalver;
		BEGIN
			SELECT postgis_sfcgal_scripts_installed() INTO sfcgal_scr_ver;
		EXCEPTION
			WHEN undefined_function THEN
				sfcgal_scr_ver := 'missing';
		END;
	EXCEPTION
		WHEN undefined_function THEN
			RAISE DEBUG 'Function postgis_sfcgal_scripts_installed() not found. Is sfcgal support enabled and sfcgal.sql installed?';
	END;
	SELECT postgis_liblwgeom_version() INTO liblwgeomver;
	SELECT postgis_libxml_version() INTO libxmlver;
	SELECT postgis_scripts_installed() INTO dbproc;
	SELECT postgis_scripts_released() INTO relproc;
	SELECT postgis_lib_revision() INTO librev;
	BEGIN
		SELECT topology.postgis_topology_scripts_installed() INTO topo_scr_ver;
	EXCEPTION
		WHEN undefined_function OR invalid_schema_name THEN
			RAISE DEBUG 'Function postgis_topology_scripts_installed() not found. Is topology support enabled and topology.sql installed?';
		WHEN insufficient_privilege THEN
			RAISE NOTICE 'Topology support cannot be inspected. Is current user granted USAGE on schema "topology" ?';
		WHEN OTHERS THEN
			RAISE NOTICE 'Function postgis_topology_scripts_installed() could not be called: % (%)', SQLERRM, SQLSTATE;
	END;

	BEGIN
		SELECT postgis_raster_scripts_installed() INTO rast_scr_ver;
	EXCEPTION
		WHEN undefined_function THEN
			RAISE DEBUG 'Function postgis_raster_scripts_installed() not found. Is raster support enabled and rtpostgis.sql installed?';
		WHEN OTHERS THEN
			RAISE NOTICE 'Function postgis_raster_scripts_installed() could not be called: % (%)', SQLERRM, SQLSTATE;
	END;

	BEGIN
		SELECT postgis_raster_lib_version() INTO rast_lib_ver;
	EXCEPTION
		WHEN undefined_function THEN
			RAISE DEBUG 'Function postgis_raster_lib_version() not found. Is raster support enabled and rtpostgis.sql installed?';
		WHEN OTHERS THEN
			RAISE NOTICE 'Function postgis_raster_lib_version() could not be called: % (%)', SQLERRM, SQLSTATE;
	END;

	fullver = 'POSTGIS="' || libver;

	IF  librev IS NOT NULL THEN
		fullver = fullver || ' ' || librev;
	END IF;

	fullver = fullver || '"';

	IF EXISTS (
		SELECT * FROM pg_catalog.pg_extension
		WHERE extname = 'postgis')
	THEN
			fullver = fullver || ' [EXTENSION]';
			core_is_extension := true;
	ELSE
			core_is_extension := false;
	END IF;

	IF liblwgeomver != relproc THEN
		fullver = fullver || ' (liblwgeom version mismatch: "' || liblwgeomver || '")';
	END IF;

	fullver = fullver || ' PGSQL="' || pgsql_scr_ver || '"';
	IF pgsql_scr_ver != pgsql_ver THEN
		fullver = fullver || ' (procs need upgrade for use with PostgreSQL "' || pgsql_ver || '")';
	END IF;

	IF  geosver IS NOT NULL THEN
		fullver = fullver || ' GEOS="' || geosver || '"';
		IF (string_to_array(geosver, '.'))[1:2] != (string_to_array(geosver_compiled, '.'))[1:2]
		THEN
			fullver = format('%s (compiled against GEOS %s)', fullver, geosver_compiled);
		END IF;
	END IF;

	IF  sfcgalver IS NOT NULL THEN
		fullver = fullver || ' SFCGAL="' || sfcgalver || '"';
	END IF;

	IF  projver IS NOT NULL THEN
		fullver = fullver || ' PROJ="' || projver || '"';
		IF (string_to_array(projver, '.'))[1:3] != (string_to_array(projver_compiled, '.'))[1:3]
		THEN
			fullver = format('%s (compiled against PROJ %s)', fullver, projver_compiled);
		END IF;
	END IF;

	IF  gdalver IS NOT NULL THEN
		fullver = fullver || ' GDAL="' || gdalver || '"';
	END IF;

	IF  libxmlver IS NOT NULL THEN
		fullver = fullver || ' LIBXML="' || libxmlver || '"';
	END IF;

	IF json_lib_ver IS NOT NULL THEN
		fullver = fullver || ' LIBJSON="' || json_lib_ver || '"';
	END IF;

	IF protobuf_lib_ver IS NOT NULL THEN
		fullver = fullver || ' LIBPROTOBUF="' || protobuf_lib_ver || '"';
	END IF;

	IF wagyu_lib_ver IS NOT NULL THEN
		fullver = fullver || ' WAGYU="' || wagyu_lib_ver || '"';
	END IF;

	IF dbproc != relproc THEN
		fullver = fullver || ' (core procs from "' || dbproc || '" need upgrade)';
	END IF;

	IF topo_scr_ver IS NOT NULL THEN
		fullver = fullver || ' TOPOLOGY';
		IF topo_scr_ver != relproc THEN
			fullver = fullver || ' (topology procs from "' || topo_scr_ver || '" need upgrade)';
		END IF;
		IF core_is_extension AND NOT EXISTS (
			SELECT * FROM pg_catalog.pg_extension
			WHERE extname = 'postgis_topology')
		THEN
				fullver = fullver || ' [UNPACKAGED!]';
		END IF;
	END IF;

	IF rast_lib_ver IS NOT NULL THEN
		fullver = fullver || ' RASTER';
		IF rast_lib_ver != relproc THEN
			fullver = fullver || ' (raster lib from "' || rast_lib_ver || '" need upgrade)';
		END IF;
		IF core_is_extension AND NOT EXISTS (
			SELECT * FROM pg_catalog.pg_extension
			WHERE extname = 'postgis_raster')
		THEN
				fullver = fullver || ' [UNPACKAGED!]';
		END IF;
	END IF;

	IF rast_scr_ver IS NOT NULL AND rast_scr_ver != relproc THEN
		fullver = fullver || ' (raster procs from "' || rast_scr_ver || '" need upgrade)';
	END IF;

	IF sfcgal_scr_ver IS NOT NULL AND sfcgal_scr_ver != relproc THEN
		fullver = fullver || ' (sfcgal procs from "' || sfcgal_scr_ver || '" need upgrade)';
	END IF;

	-- Check for the presence of deprecated functions
	IF EXISTS ( SELECT oid FROM pg_catalog.pg_proc WHERE proname LIKE '%_deprecated_by_postgis_%' )
	THEN
		fullver = fullver || ' (deprecated functions exist, upgrade is not complete)';
	END IF;

	RETURN fullver;
END
$$
LANGUAGE 'plpgsql' IMMUTABLE;

---------------------------------------------------------------
-- CASTS
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION box2d(geometry)
	RETURNS box2d
	AS '$libdir/postgis-3','LWGEOM_to_BOX2D'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION box3d(geometry)
	RETURNS box3d
	AS '$libdir/postgis-3','LWGEOM_to_BOX3D'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION box(geometry)
	RETURNS box
	AS '$libdir/postgis-3','LWGEOM_to_BOX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION box2d(box3d)
	RETURNS box2d
	AS '$libdir/postgis-3','BOX3D_to_BOX2D'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION box3d(box2d)
	RETURNS box3d
	AS '$libdir/postgis-3','BOX2D_to_BOX3D'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION box(box3d)
	RETURNS box
	AS '$libdir/postgis-3','BOX3D_to_BOX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION text(geometry)
	RETURNS text
	AS '$libdir/postgis-3','LWGEOM_to_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- this is kept for backward-compatibility
-- Deprecation in 1.2.3
CREATE OR REPLACE FUNCTION box3dtobox(box3d)
	RETURNS box
	AS '$libdir/postgis-3','BOX3D_to_BOX'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION geometry(box2d)
	RETURNS geometry
	AS '$libdir/postgis-3','BOX2D_to_LWGEOM'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION geometry(box3d)
	RETURNS geometry
	AS '$libdir/postgis-3','BOX3D_to_LWGEOM'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION geometry(text)
	RETURNS geometry
	AS '$libdir/postgis-3','parse_WKT_lwgeom'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION geometry(bytea)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_bytea'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION bytea(geometry)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_to_bytea'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- 7.3+ explicit casting definitions
CREATE CAST (geometry AS box2d) WITH FUNCTION box2d(geometry) AS IMPLICIT;
CREATE CAST (geometry AS box3d) WITH FUNCTION box3d(geometry) AS IMPLICIT;

-- ticket: 2262 changed 2.1.0 to assignment to prevent PostGIS
-- from misusing PostgreSQL geometric functions
CREATE CAST (geometry AS box) WITH FUNCTION box(geometry) AS ASSIGNMENT;

CREATE CAST (box3d AS box2d) WITH FUNCTION box2d(box3d) AS IMPLICIT;
CREATE CAST (box2d AS box3d) WITH FUNCTION box3d(box2d) AS IMPLICIT;
CREATE CAST (box2d AS geometry) WITH FUNCTION geometry(box2d) AS IMPLICIT;
CREATE CAST (box3d AS box) WITH FUNCTION box(box3d) AS IMPLICIT;
CREATE CAST (box3d AS geometry) WITH FUNCTION geometry(box3d) AS IMPLICIT;
CREATE CAST (text AS geometry) WITH FUNCTION geometry(text) AS IMPLICIT;
CREATE CAST (geometry AS text) WITH FUNCTION text(geometry) AS IMPLICIT;
CREATE CAST (bytea AS geometry) WITH FUNCTION geometry(bytea) AS IMPLICIT;
CREATE CAST (geometry AS bytea) WITH FUNCTION bytea(geometry) AS IMPLICIT;

---------------------------------------------------------------
-- Algorithms
---------------------------------------------------------------

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Simplify(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_simplify2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_Simplify(geometry, float8, boolean)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_simplify2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_SimplifyVW(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_SetEffectiveArea'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_SetEffectiveArea(geometry,  float8 default -1, integer default 1)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_SetEffectiveArea'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_FilterByM(geometry, double precision, double precision default null, boolean default false)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_FilterByM'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_ChaikinSmoothing(geometry, integer default 1, boolean default false)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_ChaikinSmoothing'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- ST_SnapToGrid(input, xoff, yoff, xsize, ysize)
-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_snaptogrid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- ST_SnapToGrid(input, xsize, ysize) # offsets=0
-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, float8, float8)
	RETURNS geometry
	AS 'SELECT ST_SnapToGrid($1, 0, 0, $2, $3)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- ST_SnapToGrid(input, size) # xsize=ysize=size, offsets=0
-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, float8)
	RETURNS geometry
	AS 'SELECT ST_SnapToGrid($1, 0, 0, $2, $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- ST_SnapToGrid(input, point_offsets, xsize, ysize, zsize, msize)
-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geom1 geometry, geom2 geometry, float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_snaptogrid_pointoff'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Segmentize(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_segmentize2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

---------------------------------------------------------------
-- LRS
---------------------------------------------------------------

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_LineInterpolatePoint(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_line_interpolate_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_LineInterpolatePoints(geometry, float8, repeat boolean DEFAULT true)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_line_interpolate_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_LineSubstring(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_line_substring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_LineLocatePoint(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'LWGEOM_line_locate_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_AddMeasure(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_AddMeasure'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

---------------------------------------------------------------
-- TEMPORAL
---------------------------------------------------------------

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_ClosestPointOfApproach(geometry, geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_ClosestPointOfApproach'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_DistanceCPA(geometry, geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_DistanceCPA'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_CPAWithin(geometry, geometry, float8)
	RETURNS bool
	AS '$libdir/postgis-3', 'ST_CPAWithin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_IsValidTrajectory(geometry)
	RETURNS bool
	AS '$libdir/postgis-3', 'ST_IsValidTrajectory'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

---------------------------------------------------------------
-- GEOS
---------------------------------------------------------------

-- Changed: 3.1.0 to add gridSize default argument
-- Replaces ST_Intersection(geometry, geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Intersection(geom1 geometry, geom2 geometry, gridSize float8 DEFAULT -1)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_Intersection'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Replaces ST_Buffer(geometry, float8) deprecated in 3.0.0
CREATE OR REPLACE FUNCTION ST_Buffer(geom geometry, radius float8, options text DEFAULT '')
	RETURNS geometry
	AS '$libdir/postgis-3','buffer'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Buffer(geom geometry, radius float8, quadsegs integer)
	RETURNS geometry
	AS $$ SELECT ST_Buffer($1, $2, CAST('quad_segs='||CAST($3 AS text) as text)) $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_MinimumBoundingRadius(geometry, OUT center geometry, OUT radius double precision)
	AS '$libdir/postgis-3', 'ST_MinimumBoundingRadius'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_MinimumBoundingCircle(inputgeom geometry, segs_per_quarter integer DEFAULT 48)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_MinimumBoundingCircle'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_OrientedEnvelope(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_OrientedEnvelope'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_OffsetCurve(line geometry, distance float8, params text DEFAULT '')
RETURNS geometry
	AS '$libdir/postgis-3','ST_OffsetCurve'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
-- Changed: 3.0.0
CREATE OR REPLACE FUNCTION ST_GeneratePoints(area geometry, npoints integer)
RETURNS geometry
	AS '$libdir/postgis-3','ST_GeneratePoints'
	LANGUAGE 'c' VOLATILE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION ST_GeneratePoints(area geometry, npoints integer, seed integer)
RETURNS geometry
	AS '$libdir/postgis-3','ST_GeneratePoints'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: convexhull(geometry)
CREATE OR REPLACE FUNCTION ST_ConvexHull(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3','convexhull'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.3.3
CREATE OR REPLACE FUNCTION ST_SimplifyPreserveTopology(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3','topologypreservesimplify'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_IsValidReason(geometry)
	RETURNS text
	AS '$libdir/postgis-3', 'isvalidreason'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.0.0
CREATE TYPE valid_detail AS (
	valid bool,
	reason varchar,
	location geometry
);

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_IsValidDetail(geom geometry, flags integer DEFAULT 0)
	RETURNS valid_detail
	AS '$libdir/postgis-3', 'isvaliddetail'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_IsValidReason(geometry, integer)
	RETURNS text
	AS $$
	SELECT CASE WHEN valid THEN 'Valid Geometry' ELSE reason END FROM (
		SELECT (ST_isValidDetail($1, $2)).*
	) foo
	$$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_IsValid(geometry, integer)
	RETURNS boolean
	AS 'SELECT (ST_isValidDetail($1, $2)).valid'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_HausdorffDistance(geom1 geometry, geom2 geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'hausdorffdistance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_HausdorffDistance(geom1 geometry, geom2 geometry, float8)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'hausdorffdistancedensify'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_FrechetDistance(geom1 geometry, geom2 geometry, float8 default -1)
	RETURNS FLOAT8
	AS '$libdir/postgis-3', 'ST_FrechetDistance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_MaximumInscribedCircle(geometry, OUT center geometry, OUT nearest geometry, OUT radius double precision)
	AS '$libdir/postgis-3', 'ST_MaximumInscribedCircle'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LargestEmptyCircle(geom geometry, tolerance float8 DEFAULT 0.0, boundary geometry DEFAULT 'POINT EMPTY'::geometry, OUT center geometry, OUT nearest geometry, OUT radius double precision)
	AS '$libdir/postgis-3', 'ST_LargestEmptyCircle'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- PostGIS equivalent function: ST_difference(geom1 geometry, geom2 geometry)
-- Changed: 3.1.0 to add gridSize default argument
-- Replaces ST_Difference(geometry, geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Difference(geom1 geometry, geom2 geometry, gridSize float8 DEFAULT -1.0)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_Difference'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- PostGIS equivalent function: boundary(geometry)
CREATE OR REPLACE FUNCTION ST_Boundary(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3','boundary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_Points(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Points'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: symdifference(geom1 geometry, geom2 geometry)
-- Changed: 3.1.0 to add gridSize default argument
-- Replaces ST_SymDifference(geometry, geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_SymDifference(geom1 geometry, geom2 geometry, gridSize float8 DEFAULT -1.0)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_SymDifference'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_SymmetricDifference(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS 'SELECT ST_SymDifference(geom1, geom2, -1.0);'
	LANGUAGE 'sql';

CREATE OR REPLACE FUNCTION ST_Union(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_Union'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_Union(geom1 geometry, geom2 geometry, gridSize float8)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_Union'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.0.0
-- Changed: 3.1.0 to add gridSize default argument
-- Replaces ST_UnaryUnion(geometry) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_UnaryUnion(geometry, gridSize float8 DEFAULT -1.0)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_UnaryUnion'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- ST_RemoveRepeatedPoints(in geometry)
--
-- Removes duplicate vertices in input.
-- Only checks consecutive points for lineal and polygonal geoms.
-- Checks all points for multipoint geoms.
--
-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_RemoveRepeatedPoints(geom geometry, tolerance float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_RemoveRepeatedPoints'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_ClipByBox2d(geom geometry, box box2d)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_ClipByBox2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.2.0
-- Changed: 3.1.0 to add gridSize default argument
-- Replaces ST_Subdivide(geometry, integer) deprecated in 3.1.0
CREATE OR REPLACE FUNCTION ST_Subdivide(geom geometry, maxvertices integer DEFAULT 256, gridSize float8 DEFAULT -1.0)
	RETURNS setof geometry
	AS '$libdir/postgis-3', 'ST_Subdivide'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_ReducePrecision(geom geometry, gridsize float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_ReducePrecision'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

--------------------------------------------------------------------------------
-- ST_CleanGeometry / ST_MakeValid
--------------------------------------------------------------------------------

-- ST_MakeValid(in geometry)
--
-- Try to make the input valid maintaining the boundary profile.
-- May return a collection.
-- May return a geometry with inferior dimensions (dimensional collapses).
-- May return NULL if can't handle input.
--
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_MakeValid(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_MakeValid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_MakeValid(geom geometry, params text)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_MakeValid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- ST_CleanGeometry(in geometry)
--
-- Make input:
-- 	- Simple (lineal components)
--	- Valid (polygonal components)
--	- Obeying the RHR (if polygonal)
--	- Simplified of consecutive duplicated points
-- Ensuring:
--	- No input vertices are discarded (except consecutive repeated ones)
--	- Output geometry type matches input
--
-- Returns NULL on failure.
--
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_CleanGeometry(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CleanGeometry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- ST_Split
--------------------------------------------------------------------------------

-- ST_Split(in geometry, blade geometry)
--
-- Split a geometry in parts after cutting it with given blade.
-- Returns a collection containing all parts.
--
-- Note that multi-part geometries will be returned exploded,
-- no matter relation to blade.
--
-- Availability: 2.0.0
--
CREATE OR REPLACE FUNCTION ST_Split(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Split'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- ST_SharedPaths
--------------------------------------------------------------------------------

-- ST_SharedPaths(lineal1 geometry, lineal1 geometry)
--
-- Returns a collection containing paths shared by the two
-- input geometries. Those going in the same direction are
-- in the first element of the collection, those going in the
-- opposite direction are in the second element.
--
-- The paths themselves are given in the direction of the
-- first geometry.
--
-- Availability: 2.0.0
--
CREATE OR REPLACE FUNCTION ST_SharedPaths(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_SharedPaths'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- ST_Snap
--------------------------------------------------------------------------------

-- ST_Snap(g1 geometry, g2 geometry, tolerance float8)
--
-- Snap first geometry against second.
--
-- Availability: 2.0.0
--
CREATE OR REPLACE FUNCTION ST_Snap(geom1 geometry, geom2 geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Snap'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- ST_RelateMatch
--------------------------------------------------------------------------------

-- ST_RelateMatch(matrix text, pattern text)
--
-- Returns true if pattern 'pattern' matches DE9 intersection matrix 'matrix'
--
-- Availability: 2.0.0
--
CREATE OR REPLACE FUNCTION ST_RelateMatch(text, text)
	RETURNS bool
	AS '$libdir/postgis-3', 'ST_RelateMatch'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

--------------------------------------------------------------------------------
-- ST_Node
--------------------------------------------------------------------------------

-- ST_Node(in geometry)
--
-- Fully node lines in input using the least set of nodes while
-- preserving each of the input ones.
-- Returns a linestring or a multilinestring containing all parts.
--
-- Availability: 2.0.0
--
CREATE OR REPLACE FUNCTION ST_Node(g geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Node'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- ST_DelaunayTriangles
--------------------------------------------------------------------------------

-- ST_DelaunayTriangles(g1 geometry, tolerance float8, flags integer)
--
-- Builds Delaunay triangulation out of geometry vertices.
--
-- Returns a collection of triangular polygons with flags=0
-- or a multilinestring with flags=1
--
-- If a tolerance is given it will be used to snap the input points
-- each-other.
--
--
-- Availability: 2.1.0
--
CREATE OR REPLACE FUNCTION ST_DelaunayTriangles(g1 geometry, tolerance float8 DEFAULT 0.0, flags integer DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_DelaunayTriangles'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- ST_TriangulatePolygon
--------------------------------------------------------------------------------

-- ST_TriangulatePolygon(g1 geometry)
--
-- Builds a triangulation that respects the boundaries of the polygon.
--
-- Returns a collection of triangular polygons.
--
-- Availability: 3.3.0
--
CREATE OR REPLACE FUNCTION ST_TriangulatePolygon(g1 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_TriangulatePolygon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------
-- _ST_Voronoi
--------------------------------------------------------------------------------

-- ST_Voronoi(g1 geometry, clip geometry, tolerance float8, return_polygons boolean)
--
-- Builds a Voronoi Diagram from the vertices of the supplied geometry.
--
-- By default, the diagram will be extended to an envelope larger than the
-- input points.
--
-- If a second geometry is supplied, the diagram will be extended to fill the
-- envelope of the second geometry, unless that is smaller than the default
-- envelope.
--
-- If a tolerance is given it will be used to snap the input points
-- each-other.
--
-- If return_polygons is true, returns a GeometryCollection of polygons.
-- If return_polygons is false, returns a MultiLineString.
--
-- Availability: 2.3.0
--

CREATE OR REPLACE FUNCTION _ST_Voronoi(g1 geometry, clip geometry DEFAULT NULL, tolerance float8 DEFAULT 0.0, return_polygons boolean DEFAULT true)
	   RETURNS geometry
	   AS '$libdir/postgis-3', 'ST_Voronoi'
	   LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	   COST 5000;

CREATE OR REPLACE FUNCTION ST_VoronoiPolygons(g1 geometry, tolerance float8 DEFAULT 0.0, extend_to geometry DEFAULT NULL)
	   RETURNS geometry
	   AS $$ SELECT _ST_Voronoi(g1, extend_to, tolerance, true) $$
	   LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

CREATE OR REPLACE FUNCTION ST_VoronoiLines(g1 geometry, tolerance float8 DEFAULT 0.0, extend_to geometry DEFAULT NULL)
	   RETURNS geometry
	   AS $$ SELECT _ST_Voronoi(g1, extend_to, tolerance, false) $$
	   LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

--------------------------------------------------------------------------------
-- Aggregates and their supporting functions
--------------------------------------------------------------------------------

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_CombineBBox(box3d,geometry)
	RETURNS box3d
	AS '$libdir/postgis-3', 'BOX3D_combine'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_CombineBBox(box3d,box3d)
	RETURNS box3d
	AS '$libdir/postgis-3', 'BOX3D_combine_BOX3D'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_CombineBbox(box2d,geometry)
	RETURNS box2d
	AS '$libdir/postgis-3', 'BOX2D_combine'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 1;

-- Availability: 1.2.2
-- Changed: 2.2.0 to use non-deprecated ST_CombineBBox (r13535)
-- Changed: 2.3.0 to support PostgreSQL 9.6
-- Changed: 2.3.1 to support PostgreSQL 9.6 parallel safe
CREATE AGGREGATE ST_Extent(geometry) (
	sfunc = ST_CombineBBox,
	stype = box3d,
	combinefunc = ST_CombineBBox,
	parallel = safe,
	finalfunc = box2d
	);

-- Availability: 2.0.0
-- Changed: 2.2.0 to use non-deprecated ST_CombineBBox (r13535)
-- Changed: 2.3.0 to support PostgreSQL 9.6
-- Changed: 2.3.1 to support PostgreSQL 9.6 parallel safe
CREATE AGGREGATE ST_3DExtent(geometry)(
	sfunc = ST_CombineBBox,
	combinefunc = ST_CombineBBox,
	parallel = safe,
	stype = box3d
	);

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Collect(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_collect'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
-- Changed: 2.3.0 to support PostgreSQL 9.6
-- Changed: 2.3.1 to support PostgreSQL 9.6 parallel safe
CREATE AGGREGATE ST_MemCollect(geometry)(
	sfunc = ST_collect,
	combinefunc = ST_collect,
	parallel = safe,
	stype = geometry
	);

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Collect(geometry[])
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_collect_garray'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
-- Changed: 2.3.0 to support PostgreSQL 9.6
-- Changed: 2.3.1 to support PostgreSQL 9.6 parallel safe
CREATE AGGREGATE ST_MemUnion(geometry) (
	sfunc = ST_Union,
	combinefunc = ST_Union,
	parallel = safe,
	stype = geometry
	);


-- Availability: 1.4.0
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_accum_transfn(internal, geometry)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 50;

-- Availability: 2.2
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_accum_transfn(internal, geometry, float8)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 50;

-- Availability: 2.3
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_accum_transfn(internal, geometry, float8, int)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 50;

-- Availability: 1.4.0
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_collect_finalfn(internal)
	RETURNS geometry
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 250;

-- Availability: 1.4.0
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_polygonize_finalfn(internal)
	RETURNS geometry
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 250;

-- Availability: 2.2
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_clusterintersecting_finalfn(internal)
	RETURNS geometry[]
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 250;

-- Availability: 2.2
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_clusterwithin_finalfn(internal)
	RETURNS geometry[]
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 250;

-- Availability: 1.4.0
-- Changed: 2.5.0 use 'internal' transfer type
CREATE OR REPLACE FUNCTION pgis_geometry_makeline_finalfn(internal)
	RETURNS geometry
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 250;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION pgis_geometry_coverageunion_finalfn(internal)
	RETURNS geometry
	AS '$libdir/postgis-3'
	LANGUAGE 'c' PARALLEL SAFE
	COST 250;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION pgis_geometry_union_parallel_transfn(internal, geometry)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 1;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION pgis_geometry_union_parallel_transfn(internal, geometry, float8)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION pgis_geometry_union_parallel_combinefn(internal, internal)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 1;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION pgis_geometry_union_parallel_serialfn(internal)
	RETURNS bytea
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE STRICT
	COST 1;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION pgis_geometry_union_parallel_deserialfn(bytea, internal)
	RETURNS internal
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE STRICT
	COST 1;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION pgis_geometry_union_parallel_finalfn(internal)
	RETURNS geometry
	AS '$libdir/postgis-3'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE STRICT
	COST 5000;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_Union (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-3','pgis_union_geometry_array'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
-- Changed but upgrader helper no touch: 2.4.0 marked parallel safe
-- we don't want to force drop of this agg since its often used in views
-- parallel handling dealt with in postgis_after_upgrade.sql
-- Changed: 2.5.0 use 'internal' stype
-- Changed: 3.3.0 parallel scan support
CREATE AGGREGATE ST_Union(geometry) (
	sfunc = pgis_geometry_union_parallel_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_geometry_union_parallel_serialfn,
	deserialfunc = pgis_geometry_union_parallel_deserialfn,
	combinefunc = pgis_geometry_union_parallel_combinefn,
	finalfunc = pgis_geometry_union_parallel_finalfn
);

-- Availability: 3.1.0
-- Changed: 3.3.0 parallel scan support
CREATE AGGREGATE ST_Union (geometry, gridSize float8) (
	sfunc = pgis_geometry_union_parallel_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_geometry_union_parallel_serialfn,
	deserialfunc = pgis_geometry_union_parallel_deserialfn,
	combinefunc = pgis_geometry_union_parallel_combinefn,
	finalfunc = pgis_geometry_union_parallel_finalfn
	);

-- Availability: 1.2.2
-- Changed: 2.4.0: marked parallel safe
-- Changed: 2.5.0 use 'internal' stype
CREATE AGGREGATE ST_Collect (geometry) (
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = internal,
	parallel = safe,
	FINALFUNC = pgis_geometry_collect_finalfn
	);

-- Availability: 2.2
-- Changed: 2.4.0: marked parallel safe
-- Changed: 2.5.0 use 'internal' stype
CREATE AGGREGATE ST_ClusterIntersecting (geometry) (
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = internal,
	parallel = safe,
	FINALFUNC = pgis_geometry_clusterintersecting_finalfn
	);

-- Availability: 2.2
-- Changed: 2.4.0 marked parallel safe
-- Changed: 2.5.0 use 'internal' stype
CREATE AGGREGATE ST_ClusterWithin (geometry, float8) (
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = internal,
	parallel = safe,
	FINALFUNC = pgis_geometry_clusterwithin_finalfn
	);

-- Availability: 1.2.2
-- Changed: 2.4.0 marked parallel safe
-- Changed: 2.5.0 use 'internal' stype
CREATE AGGREGATE ST_Polygonize (geometry) (
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = internal,
	parallel = safe,
	FINALFUNC = pgis_geometry_polygonize_finalfn
	);

-- Availability: 1.2.2
-- Changed: 2.4.0 marked parallel safe
-- Changed: 2.5.0 use 'internal' stype
CREATE AGGREGATE ST_MakeLine (geometry) (
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = internal,
	parallel = safe,
	FINALFUNC = pgis_geometry_makeline_finalfn
	);


-----------------------------------------------------------------------
-- Polygonal coverage functions
---------------------------------------------------------------------

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_CoverageUnion (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CoverageUnion'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.4.0
CREATE AGGREGATE ST_CoverageUnion (geometry) (
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = internal,
	PARALLEL = safe,
	FINALFUNC = pgis_geometry_coverageunion_finalfn
	);

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_CoverageSimplify (geom geometry, tolerance float8, simplifyBoundary boolean default true)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CoverageSimplify'
	LANGUAGE 'c' IMMUTABLE STRICT WINDOW PARALLEL SAFE
	COST 5000;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_CoverageInvalidEdges (geom geometry, tolerance float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CoverageInvalidEdges'
	LANGUAGE 'c' IMMUTABLE STRICT WINDOW PARALLEL SAFE
	COST 5000;

--------------------------------------------------------------------------------

-- Availability: 2.3.0
-- Changed: 3.2.0 added max_radius parameter
-- Replaces ST_ClusterKMeans(geometry, integer) deprecated in 3.2.0
CREATE OR REPLACE FUNCTION ST_ClusterKMeans(geom geometry, k integer, max_radius float8 default null)
	RETURNS integer
	AS '$libdir/postgis-3', 'ST_ClusterKMeans'
	LANGUAGE 'c' VOLATILE STRICT WINDOW
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Relate(geom1 geometry, geom2 geometry)
	RETURNS text
	AS '$libdir/postgis-3','relate_full'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Relate(geom1 geometry, geom2 geometry, integer)
	RETURNS text
	AS '$libdir/postgis-3','relate_full'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- PostGIS equivalent function: relate(geom1 geometry, geom2 geometry, text)
CREATE OR REPLACE FUNCTION ST_Relate(geom1 geometry, geom2 geometry, text)
	RETURNS boolean
	AS '$libdir/postgis-3','relate_pattern'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- PostGIS equivalent function: disjoint(geom1 geometry, geom2 geometry)
CREATE OR REPLACE FUNCTION ST_Disjoint(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','disjoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-----------------------------------------------------------------------------
-- Non-indexed functions (see above for public indexed variants)

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION _ST_LineCrossingDirection(line1 geometry, line2 geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'ST_LineCrossingDirection'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.3.4
CREATE OR REPLACE FUNCTION _ST_DWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dwithin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Touches(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','touches'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Intersects(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_Intersects'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Crosses(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','crosses'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Contains(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','contains'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION _ST_ContainsProperly(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','containsproperly'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Covers(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'covers'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_CoveredBy(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'coveredby'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Within(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS 'SELECT _ST_Contains($2,$1)'
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION _ST_Overlaps(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','overlaps'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION _ST_DFullyWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dfullywithin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION _ST_3DDWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dwithin3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION _ST_3DDFullyWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dfullywithin3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION _ST_3DIntersects(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'ST_3DIntersects'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION _ST_OrderingEquals(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_same'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION _ST_Equals(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_Equals'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-----------------------------------------------------------------------------

-----------------------------------------------------------------------------
-- Planner Support Functions
-----------------------------------------------------------------------------
-- Availability 3.0.0
CREATE OR REPLACE FUNCTION postgis_index_supportfn (internal)
	RETURNS internal
	AS '$libdir/postgis-3', 'postgis_index_supportfn'
	LANGUAGE 'c';

-----------------------------------------------------------------------------

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_LineCrossingDirection(line1 geometry, line2 geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'ST_LineCrossingDirection'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.3.0
-- Changed: 2.0.0 added parameter names
-- TODO: encode deprecation of the version with no parameter names ?
CREATE OR REPLACE FUNCTION ST_DWithin(geom1 geometry, geom2 geometry, float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dwithin'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Touches(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','touches'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Intersects(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_Intersects'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Crosses(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','crosses'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Contains(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','contains'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_ContainsProperly(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','containsproperly'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Within(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','within'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Covers(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'covers'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_CoveredBy(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'coveredby'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_Overlaps(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','overlaps'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_DFullyWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dfullywithin'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_3DDWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dwithin3d'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_3DDFullyWithin(geom1 geometry, geom2 geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_dfullywithin3d'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_3DIntersects(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'ST_3DIntersects'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_OrderingEquals(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_same'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_Equals(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_Equals'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-----------------------------------------------------------------------------

-- PostGIS equivalent function: IsValid(geometry)
-- TODO: change null returns to true
CREATE OR REPLACE FUNCTION ST_IsValid(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'isvalid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_MinimumClearance(geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_MinimumClearance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_MinimumClearanceLine(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_MinimumClearanceLine'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- PostGIS equivalent function: Centroid(geometry)
CREATE OR REPLACE FUNCTION ST_Centroid(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'centroid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION ST_GeometricMedian(g geometry, tolerance float8 DEFAULT NULL, max_iter int DEFAULT 10000, fail_if_not_converged boolean DEFAULT false)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_GeometricMedian'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 5000;

-- PostGIS equivalent function: IsRing(geometry)
CREATE OR REPLACE FUNCTION ST_IsRing(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'isring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: PointOnSurface(geometry)
CREATE OR REPLACE FUNCTION ST_PointOnSurface(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'pointonsurface'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: IsSimple(geometry)
CREATE OR REPLACE FUNCTION ST_IsSimple(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'issimple'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_IsCollection(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'ST_IsCollection'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Deprecation in 1.2.3
-- TODO: drop in 2.0.0 !
CREATE OR REPLACE FUNCTION Equals(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3','ST_Equals'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- GML & KML INPUT
-----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION _ST_GeomFromGML(text, integer)
	RETURNS geometry
	AS '$libdir/postgis-3','geom_from_gml'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_GeomFromGML(text, integer)
	RETURNS geometry
	AS '$libdir/postgis-3','geom_from_gml'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_GeomFromGML(text)
	RETURNS geometry
	AS 'SELECT _ST_GeomFromGML($1, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_GMLToSQL(text)
	RETURNS geometry
	AS 'SELECT _ST_GeomFromGML($1, 0)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_GMLToSQL(text, integer)
	RETURNS geometry
	AS '$libdir/postgis-3','geom_from_gml'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_GeomFromKML(text)
	RETURNS geometry
	AS '$libdir/postgis-3','geom_from_kml'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;



-----------------------------------------------------------------------
-- MARC21/XML INPUT
-----------------------------------------------------------------------

-- Availability: 3.2.3

CREATE OR REPLACE FUNCTION ST_GeomFromMARC21(marc21xml text)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_GeomFromMARC21'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 500;

-----------------------------------------------------------------------
-- MARC21 OUTPUT
-----------------------------------------------------------------------

-- Availability: 3.2.3

CREATE OR REPLACE FUNCTION ST_AsMARC21(geom geometry, format text DEFAULT 'hdddmmss')
	RETURNS TEXT
	AS '$libdir/postgis-3','ST_AsMARC21'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;



-----------------------------------------------------------------------
-- GEOJSON INPUT
-----------------------------------------------------------------------
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_GeomFromGeoJson(text)
	RETURNS geometry
	AS '$libdir/postgis-3','geom_from_geojson'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_GeomFromGeoJson(json)
	RETURNS geometry
	AS 'SELECT ST_GeomFromGeoJson($1::text)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_GeomFromGeoJson(jsonb)
	RETURNS geometry
	AS 'SELECT ST_GeomFromGeoJson($1::text)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION postgis_libjson_version()
	RETURNS text
	AS '$libdir/postgis-3','postgis_libjson_version'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

----------------------------------------------------------------------
-- ENCODED POLYLINE INPUT
-----------------------------------------------------------------------
-- Availability: 2.2.0
-- ST_LineFromEncodedPolyline(polyline text, precision integer)
CREATE OR REPLACE FUNCTION ST_LineFromEncodedPolyline(txtin text, nprecision integer DEFAULT 5)
	RETURNS geometry
	AS '$libdir/postgis-3','line_from_encoded_polyline'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

------------------------------------------------------------------------

----------------------------------------------------------------------
-- ENCODED POLYLINE OUTPUT
-----------------------------------------------------------------------
-- Availability: 2.2.0
-- ST_AsEncodedPolyline(geom geometry, precision integer)
CREATE OR REPLACE FUNCTION ST_AsEncodedPolyline(geom geometry, nprecision integer DEFAULT 5)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asEncodedPolyline'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

------------------------------------------------------------------------

-----------------------------------------------------------------------
-- SVG OUTPUT
-----------------------------------------------------------------------
-- Availability: 1.2.2
-- Changed: 2.0.0 changed to use default args and allow calling by named args
CREATE OR REPLACE FUNCTION ST_AsSVG(geom geometry, rel integer DEFAULT 0, maxdecimaldigits integer DEFAULT 15)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asSVG'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- GML OUTPUT
-----------------------------------------------------------------------
-- _ST_AsGML(version, geom, precision, option, prefix, id)
CREATE OR REPLACE FUNCTION _ST_AsGML(integer, geometry, integer, integer, text, text)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asGML'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- ST_AsGML(version, geom) / precision=15
-- Availability: 1.3.2
-- ST_AsGML(version, geom, precision)
-- Availability: 1.3.2

-- ST_AsGML (geom, precision, option) / version=2
-- Availability: 1.4.0
-- Changed: 2.0.0 to have default args
CREATE OR REPLACE FUNCTION ST_AsGML(geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asGML'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- ST_AsGML(version, geom, precision, option)
-- Availability: 1.4.0
-- ST_AsGML(version, geom, precision, option, prefix)
-- Availability: 2.0.0
-- Changed: 2.0.0 to use default and named args
-- ST_AsGML(version, geom, precision, option, prefix, id)
-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_AsGML(version integer, geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT null, id text DEFAULT null)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asGML'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- KML OUTPUT
-----------------------------------------------------------------------

-- Availability: 1.2.2
-- Changed: 2.0.0 to use default args and allow named args
-- Replaces ST_AsKML(geometry, integer) deprecated in 2.0.0
CREATE OR REPLACE FUNCTION ST_AsKML(geom geometry, maxdecimaldigits integer DEFAULT 15, nprefix TEXT default '')
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asKML'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- GEOJSON OUTPUT
-- Availability: 1.3.4
-----------------------------------------------------------------------

-- ST_AsGeoJson(geom, precision, options) / version=1
-- Changed: 2.0.0 to use default args and named args
-- Changed: 3.0.0 change default args mode
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geom geometry, maxdecimaldigits integer DEFAULT 9, options integer DEFAULT 8)
	RETURNS text
	AS '$libdir/postgis-3','LWGEOM_asGeoJson'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.0.0
-- Changed: 3.5.0 add id_column='' parameter
-- Replaces ST_AsGeoJson(record, text, integer, bool) deprecated in 3.5.0
CREATE OR REPLACE FUNCTION ST_AsGeoJson(r record, geom_column text DEFAULT '', maxdecimaldigits integer DEFAULT 9, pretty_bool boolean DEFAULT false, id_column text DEFAULT '')
	RETURNS text
	AS '$libdir/postgis-3','ST_AsGeoJsonRow'
	LANGUAGE 'c' STABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION "json"(geometry)
	RETURNS json
	AS '$libdir/postgis-3','geometry_to_json'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION "jsonb"(geometry)
	RETURNS jsonb
	AS '$libdir/postgis-3','geometry_to_jsonb'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.0.0
CREATE CAST (geometry AS json) WITH FUNCTION "json"(geometry);
-- Availability: 3.0.0
CREATE CAST (geometry AS jsonb) WITH FUNCTION "jsonb"(geometry);

-----------------------------------------------------------------------
-- Mapbox Vector Tile OUTPUT
-- Availability: 2.4.0
-----------------------------------------------------------------------

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asmvt_transfn(internal, anyelement)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asmvt_transfn(internal, anyelement, text)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asmvt_transfn(internal, anyelement, text, integer)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asmvt_transfn(internal, anyelement, text, integer, text)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION pgis_asmvt_transfn(internal, anyelement, text, integer, text, text)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asmvt_finalfn(internal)
	RETURNS bytea
	AS '$libdir/postgis-3', 'pgis_asmvt_finalfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION pgis_asmvt_combinefn(internal, internal)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_combinefn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION pgis_asmvt_serialfn(internal)
	RETURNS bytea
	AS '$libdir/postgis-3', 'pgis_asmvt_serialfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION pgis_asmvt_deserialfn(bytea, internal)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asmvt_deserialfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
-- Changed: 3.2.0
CREATE AGGREGATE ST_AsMVT(anyelement)
(
	sfunc = pgis_asmvt_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_asmvt_serialfn,
	deserialfunc = pgis_asmvt_deserialfn,
	combinefunc = pgis_asmvt_combinefn,
	finalfunc = pgis_asmvt_finalfn,
	finalfunc_modify = read_write
);

-- Availability: 2.4.0
-- Changed: 3.2.0
CREATE AGGREGATE ST_AsMVT(anyelement, text)
(
	sfunc = pgis_asmvt_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_asmvt_serialfn,
	deserialfunc = pgis_asmvt_deserialfn,
	combinefunc = pgis_asmvt_combinefn,
	finalfunc = pgis_asmvt_finalfn
	,finalfunc_modify = read_write
);

-- Availability: 2.4.0
-- Changed: 3.3.0
-- Changed: 3.2.0
CREATE AGGREGATE ST_AsMVT(anyelement, text, integer)
(
	sfunc = pgis_asmvt_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_asmvt_serialfn,
	deserialfunc = pgis_asmvt_deserialfn,
	combinefunc = pgis_asmvt_combinefn,
	finalfunc = pgis_asmvt_finalfn,
	finalfunc_modify = read_write
);

-- Availability: 2.4.0
-- Changed: 3.3.0
-- Changed: 3.2.0
CREATE AGGREGATE ST_AsMVT(anyelement, text, integer, text)
(
	sfunc = pgis_asmvt_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_asmvt_serialfn,
	deserialfunc = pgis_asmvt_deserialfn,
	combinefunc = pgis_asmvt_combinefn,
	finalfunc = pgis_asmvt_finalfn,
	finalfunc_modify = read_write
);

-- Availability: 3.0.0
-- Changed: 3.3.0
-- Changed: 3.2.0
CREATE AGGREGATE ST_AsMVT(anyelement, text, integer, text, text)
(
	sfunc = pgis_asmvt_transfn,
	stype = internal,
	parallel = safe,
	serialfunc = pgis_asmvt_serialfn,
	deserialfunc = pgis_asmvt_deserialfn,
	combinefunc = pgis_asmvt_combinefn,
	finalfunc = pgis_asmvt_finalfn,
	finalfunc_modify = read_write
);

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_AsMVTGeom(geom geometry, bounds box2d, extent integer default 4096, buffer integer default 256, clip_geom bool default true)
	RETURNS geometry
	AS '$libdir/postgis-3','ST_AsMVTGeom'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION postgis_libprotobuf_version()
	RETURNS text
	AS '$libdir/postgis-3','postgis_libprotobuf_version'
	LANGUAGE 'c' IMMUTABLE STRICT;

-----------------------------------------------------------------------
-- GEOBUF OUTPUT
-- Availability: 2.4.0
-----------------------------------------------------------------------

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asgeobuf_transfn(internal, anyelement)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asgeobuf_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asgeobuf_transfn(internal, anyelement, text)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asgeobuf_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION pgis_asgeobuf_finalfn(internal)
	RETURNS bytea
	AS '$libdir/postgis-3', 'pgis_asgeobuf_finalfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 2.4.0
CREATE AGGREGATE ST_AsGeobuf(anyelement)
(
	sfunc = pgis_asgeobuf_transfn,
	stype = internal,
	parallel = safe,
	finalfunc = pgis_asgeobuf_finalfn
);

-- Availability: 2.4.0
CREATE AGGREGATE ST_AsGeobuf(anyelement, text)
(
	sfunc = pgis_asgeobuf_transfn,
	stype = internal,
	parallel = safe,
	finalfunc = pgis_asgeobuf_finalfn
);

-----------------------------------------------------------------------
-- FLATGEOBUF OUTPUT
-- Availability: 3.2.0
-----------------------------------------------------------------------

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION pgis_asflatgeobuf_transfn(internal, anyelement)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asflatgeobuf_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION pgis_asflatgeobuf_transfn(internal, anyelement, bool)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asflatgeobuf_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION pgis_asflatgeobuf_transfn(internal, anyelement, bool, text)
	RETURNS internal
	AS '$libdir/postgis-3', 'pgis_asflatgeobuf_transfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION pgis_asflatgeobuf_finalfn(internal)
	RETURNS bytea
	AS '$libdir/postgis-3', 'pgis_asflatgeobuf_finalfn'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 3.2.0
-- Changed: 3.3.0
CREATE AGGREGATE ST_AsFlatGeobuf(anyelement)
(
	sfunc = pgis_asflatgeobuf_transfn,
	stype = internal,
	parallel = safe,
	finalfunc = pgis_asflatgeobuf_finalfn,
	finalfunc_modify = read_write
);

-- Availability: 3.2.0
-- Changed: 3.3.0
CREATE AGGREGATE ST_AsFlatGeobuf(anyelement, bool)
(
	sfunc = pgis_asflatgeobuf_transfn,
	stype = internal,
	parallel = safe,
	finalfunc = pgis_asflatgeobuf_finalfn,
	finalfunc_modify = read_write
);

-- Availability: 3.2.0
CREATE AGGREGATE ST_AsFlatGeobuf(anyelement, bool, text)
(
	sfunc = pgis_asflatgeobuf_transfn,
	stype = internal,
	parallel = safe,
	finalfunc = pgis_asflatgeobuf_finalfn
);

-----------------------------------------------------------------------
-- FLATGEOBUF INPUT
-- Availability: 3.2.0
-----------------------------------------------------------------------

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_FromFlatGeobufToTable(text, text, bytea)
	RETURNS void
	AS '$libdir/postgis-3','pgis_tablefromflatgeobuf'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_FromFlatGeobuf(anyelement, bytea)
	RETURNS setof anyelement
	AS '$libdir/postgis-3','pgis_fromflatgeobuf'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

------------------------------------------------------------------------
-- GeoHash (geohash.org)
------------------------------------------------------------------------

-- Availability 1.4.0
-- Changed 2.0.0 to use default args and named args
CREATE OR REPLACE FUNCTION ST_GeoHash(geom geometry, maxchars integer DEFAULT 0)
	RETURNS TEXT
	AS '$libdir/postgis-3', 'ST_GeoHash'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

--
-- Availability 3.1.0
CREATE OR REPLACE FUNCTION _ST_SortableHash(geom geometry)
	RETURNS bigint
	AS '$libdir/postgis-3', '_ST_SortableHash'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-----------------------------------------------------------------------
-- GeoHash input
-- Availability: 2.0.?
-----------------------------------------------------------------------
-- ST_Box2dFromGeoHash(geohash text, precision integer)
CREATE OR REPLACE FUNCTION ST_Box2dFromGeoHash(text, integer DEFAULT NULL)
	RETURNS box2d
	AS '$libdir/postgis-3','box2d_from_geohash'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- ST_PointFromGeoHash(geohash text, precision integer)
CREATE OR REPLACE FUNCTION ST_PointFromGeoHash(text, integer DEFAULT NULL)
	RETURNS geometry
	AS '$libdir/postgis-3','point_from_geohash'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- ST_GeomFromGeoHash(geohash text, precision integer)
CREATE OR REPLACE FUNCTION ST_GeomFromGeoHash(text, integer DEFAULT NULL)
	RETURNS geometry
	AS $$ SELECT CAST(ST_Box2dFromGeoHash($1, $2) AS geometry); $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE
	COST 50;

------------------------------------------------------------------------
-- OGC defined
------------------------------------------------------------------------
-- PostGIS equivalent function: NumPoints(geometry)
CREATE OR REPLACE FUNCTION ST_NumPoints(geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_numpoints_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: NumGeometries(geometry)
CREATE OR REPLACE FUNCTION ST_NumGeometries(geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_numgeometries_collection'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: GeometryN(geometry)
CREATE OR REPLACE FUNCTION ST_GeometryN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_geometryn_collection'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: Dimension(geometry)
CREATE OR REPLACE FUNCTION ST_Dimension(geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_dimension'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: ExteriorRing(geometry)
CREATE OR REPLACE FUNCTION ST_ExteriorRing(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_exteriorring_polygon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: NumInteriorRings(geometry)
CREATE OR REPLACE FUNCTION ST_NumInteriorRings(geometry)
	RETURNS integer
	AS '$libdir/postgis-3','LWGEOM_numinteriorrings_polygon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_NumInteriorRing(geometry)
	RETURNS integer
	AS '$libdir/postgis-3','LWGEOM_numinteriorrings_polygon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: InteriorRingN(geometry)
CREATE OR REPLACE FUNCTION ST_InteriorRingN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_interiorringn_polygon'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Deprecation in 1.2.3 -- this should not be deprecated (2011-01-04 robe)
CREATE OR REPLACE FUNCTION GeometryType(geometry)
	RETURNS text
	AS '$libdir/postgis-3', 'LWGEOM_getTYPE'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- Not quite equivalent to GeometryType
CREATE OR REPLACE FUNCTION ST_GeometryType(geometry)
	RETURNS text
	AS '$libdir/postgis-3', 'geometry_geometrytype'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

-- PostGIS equivalent function: PointN(geometry,integer)
CREATE OR REPLACE FUNCTION ST_PointN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_pointn_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_NumPatches(geometry)
	RETURNS integer
	AS '
	SELECT CASE WHEN ST_GeometryType($1) = ''ST_PolyhedralSurface''
	THEN ST_NumGeometries($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_PatchN(geometry, integer)
	RETURNS geometry
	AS '
	SELECT CASE WHEN ST_GeometryType($1) = ''ST_PolyhedralSurface''
	THEN ST_GeometryN($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function of old StartPoint(geometry))
CREATE OR REPLACE FUNCTION ST_StartPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_startpoint_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function of old EndPoint(geometry)
CREATE OR REPLACE FUNCTION ST_EndPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_endpoint_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: IsClosed(geometry)
CREATE OR REPLACE FUNCTION ST_IsClosed(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_isclosed'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: IsEmpty(geometry)
CREATE OR REPLACE FUNCTION ST_IsEmpty(geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_isempty'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_AsBinary(geometry,text)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_asBinary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent of old function: AsBinary(geometry)
CREATE OR REPLACE FUNCTION ST_AsBinary(geometry)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_asBinary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: AsText(geometry)
CREATE OR REPLACE FUNCTION ST_AsText(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asText'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
-- PostGIS equivalent function: AsText(geometry, integer)
CREATE OR REPLACE FUNCTION ST_AsText(geometry, integer)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asText'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeometryFromText(text)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeometryFromText(text, integer)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomFromText(text)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: ST_GeometryFromText(text, integer)
CREATE OR REPLACE FUNCTION ST_GeomFromText(text, integer)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: ST_GeometryFromText(text)
-- SQL/MM alias for ST_GeomFromText
CREATE OR REPLACE FUNCTION ST_WKTToSQL(text)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PointFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''POINT''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: PointFromText(text, integer)
-- TODO: improve this ... by not duplicating constructor time.
CREATE OR REPLACE FUNCTION ST_PointFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''POINT''
	THEN ST_GeomFromText($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_LineFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''LINESTRING''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: LineFromText(text, integer)
CREATE OR REPLACE FUNCTION ST_LineFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''LINESTRING''
	THEN ST_GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PolyFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''POLYGON''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: ST_PolygonFromText(text, integer)
CREATE OR REPLACE FUNCTION ST_PolyFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''POLYGON''
	THEN ST_GeomFromText($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PolygonFromText(text, integer)
	RETURNS geometry
	AS 'SELECT ST_PolyFromText($1, $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PolygonFromText(text)
	RETURNS geometry
	AS 'SELECT ST_PolyFromText($1)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: MLineFromText(text, integer)
CREATE OR REPLACE FUNCTION ST_MLineFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromText($1, $2)) = ''MULTILINESTRING''
	THEN ST_GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MLineFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''MULTILINESTRING''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiLineStringFromText(text)
	RETURNS geometry
	AS 'SELECT ST_MLineFromText($1)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiLineStringFromText(text, integer)
	RETURNS geometry
	AS 'SELECT ST_MLineFromText($1, $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: MPointFromText(text, integer)
CREATE OR REPLACE FUNCTION ST_MPointFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''MULTIPOINT''
	THEN ST_GeomFromText($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MPointFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''MULTIPOINT''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPointFromText(text)
	RETURNS geometry
	AS 'SELECT ST_MPointFromText($1)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- PostGIS equivalent function: MPolyFromText(text, integer)
CREATE OR REPLACE FUNCTION ST_MPolyFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''MULTIPOLYGON''
	THEN ST_GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

--Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MPolyFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''MULTIPOLYGON''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPolygonFromText(text, integer)
	RETURNS geometry
	AS 'SELECT ST_MPolyFromText($1, $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPolygonFromText(text)
	RETURNS geometry
	AS 'SELECT ST_MPolyFromText($1)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomCollFromText(text, integer)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromText($1, $2)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomCollFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromText($1)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomFromWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_WKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: GeomFromWKB(bytea, int)
CREATE OR REPLACE FUNCTION ST_GeomFromWKB(bytea, int)
	RETURNS geometry
	AS 'SELECT ST_SetSRID(ST_GeomFromWKB($1), $2)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: PointFromWKB(bytea, int)
CREATE OR REPLACE FUNCTION ST_PointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''POINT''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''POINT''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: LineFromWKB(bytea, int)
CREATE OR REPLACE FUNCTION ST_LineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_LineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_LinestringFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_LinestringFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: PolyFromWKB(text, int)
CREATE OR REPLACE FUNCTION ST_PolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''POLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''POLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PolygonFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1,$2)) = ''POLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_PolygonFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''POLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: MPointFromWKB(text, int)
CREATE OR REPLACE FUNCTION ST_MPointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MPointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1,$2)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiLineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTILINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: MLineFromWKB(text, int)
CREATE OR REPLACE FUNCTION ST_MLineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTILINESTRING''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MLineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTILINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
-- PostGIS equivalent function: MPolyFromWKB(bytea, int)
CREATE OR REPLACE FUNCTION ST_MPolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MPolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_MultiPolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomCollFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_GeomCollFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromWKB($1)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;


-- Maximum distance between linestrings.
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_MaxDistance(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'LWGEOM_maxdistance2d_linestring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_MaxDistance(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS 'SELECT _ST_MaxDistance(ST_ConvexHull($1), ST_ConvexHull($2))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_ClosestPoint(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_closestpoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_ShortestLine(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_shortestline2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION _ST_LongestLine(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_longestline2d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_LongestLine(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS 'SELECT _ST_LongestLine(ST_ConvexHull($1), ST_ConvexHull($2))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_SwapOrdinates(geom geometry, ords cstring)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_SwapOrdinates'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- NOTE: same as ST_SwapOrdinates(geometry, 'xy')
--	   but slightly faster in that it doesn't need to parse ordinate
--	   spec strings
CREATE OR REPLACE FUNCTION ST_FlipCoordinates(geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_FlipCoordinates'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

--
-- SFSQL 1.1
--
-- BdPolyFromText(multiLineStringTaggedText String, SRID Integer): Polygon
--
--  Construct a Polygon given an arbitrary
--  collection of closed linestrings as a
--  MultiLineString text representation.
--
-- This is a PLPGSQL function rather then an SQL function
-- To avoid double call of BuildArea (one to get GeometryType
-- and another to actual return, in a CASE WHEN construct).
-- Also, we profit from plpgsql to RAISE exceptions.
--

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_BdPolyFromText(text, integer)
RETURNS geometry
AS $$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := ST_BuildArea(mline);

	IF GeometryType(geom) != 'POLYGON'
	THEN
		RAISE EXCEPTION 'Input returns more then a single polygon, try using BdMPolyFromText instead';
	END IF;

	RETURN geom;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT PARALLEL SAFE;

--
-- SFSQL 1.1
--
-- BdMPolyFromText(multiLineStringTaggedText String, SRID Integer): MultiPolygon
--
--  Construct a MultiPolygon given an arbitrary
--  collection of closed linestrings as a
--  MultiLineString text representation.
--
-- This is a PLPGSQL function rather then an SQL function
-- To raise an exception in case of invalid input.
--

-- Availability: 1.2.2
CREATE OR REPLACE FUNCTION ST_BdMPolyFromText(text, integer)
RETURNS geometry
AS $$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := ST_Multi(ST_BuildArea(mline));

	RETURN geom;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT PARALLEL SAFE;



---------------------------------------------------------------------------
--
-- PostGIS - Spatial Types for PostgreSQL
-- Copyright 2009 Paul Ramsey <pramsey@cleverelephant.ca>
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
---------------------------------------------------------------------------

-----------------------------------------------------------------------------
--  GEOGRAPHY TYPE
-----------------------------------------------------------------------------

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_typmod_in(cstring[])
	RETURNS integer
	AS '$libdir/postgis-3','geography_typmod_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_typmod_out(integer)
	RETURNS cstring
	AS '$libdir/postgis-3','postgis_typmod_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_in(cstring, oid, integer)
	RETURNS geography
	AS '$libdir/postgis-3','geography_in'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_out(geography)
	RETURNS cstring
	AS '$libdir/postgis-3','geography_out'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geography_recv(internal, oid, integer)
	RETURNS geography
	AS '$libdir/postgis-3','geography_recv'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION geography_send(geography)
	RETURNS bytea
	AS '$libdir/postgis-3','geography_send'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_analyze(internal)
	RETURNS bool
	AS '$libdir/postgis-3','gserialized_analyze_nd'
	LANGUAGE 'c' VOLATILE STRICT;

-- Availability: 1.5.0
CREATE TYPE geography (
	internallength = variable,
	input = geography_in,
	output = geography_out,
	receive = geography_recv,
	send = geography_send,
	typmod_in = geography_typmod_in,
	typmod_out = geography_typmod_out,
	delimiter = ':',
	analyze = geography_analyze,
	storage = main,
	alignment = double
);



-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography(geography, integer, boolean)
	RETURNS geography
	AS '$libdir/postgis-3','geography_enforce_typmod'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE CAST (geography AS geography) WITH FUNCTION geography(geography, integer, boolean) AS IMPLICIT;

-- Availability: 2.0.0
-- Changed: 2.1.4 ticket #2870 changed to use geography bytea func instead of geometry bytea
CREATE OR REPLACE FUNCTION geography(bytea)
	RETURNS geography
	AS '$libdir/postgis-3','geography_from_binary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION bytea(geography)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_to_bytea'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE CAST (bytea AS geography) WITH FUNCTION geography(bytea) AS IMPLICIT;
-- Availability: 2.0.0
CREATE CAST (geography AS bytea) WITH FUNCTION bytea(geography) AS IMPLICIT;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_AsText(geography)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asText'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION ST_AsText(geography, integer)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asText'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_AsText(text)
	RETURNS text AS
	$$ SELECT ST_AsText($1::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
        COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_GeographyFromText(text)
	RETURNS geography
	AS '$libdir/postgis-3','geography_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_GeogFromText(text)
	RETURNS geography
	AS '$libdir/postgis-3','geography_from_text'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_GeogFromWKB(bytea)
	RETURNS geography
	AS '$libdir/postgis-3','geography_from_binary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_typmod_dims(integer)
	RETURNS integer
	AS '$libdir/postgis-3','postgis_typmod_dims'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_typmod_srid(integer)
	RETURNS integer
	AS '$libdir/postgis-3','postgis_typmod_srid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION postgis_typmod_type(integer)
	RETURNS text
	AS '$libdir/postgis-3','postgis_typmod_type'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
-- Changed: 2.4.0 Limit to only list things that are tables
CREATE OR REPLACE VIEW geography_columns AS
	SELECT
		pg_catalog.current_database() AS f_table_catalog,
		n.nspname AS f_table_schema,
		c.relname AS f_table_name,
		a.attname AS f_geography_column,
		postgis_typmod_dims(a.atttypmod) AS coord_dimension,
		postgis_typmod_srid(a.atttypmod) AS srid,
		postgis_typmod_type(a.atttypmod) AS type
	FROM
		pg_class c,
		pg_attribute a,
		pg_type t,
		pg_namespace n
	WHERE t.typname = 'geography'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"] )
		AND NOT pg_is_other_temp_schema(c.relnamespace)
		AND has_table_privilege( c.oid, 'SELECT'::text );

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography(geometry)
	RETURNS geography
	AS '$libdir/postgis-3','geography_from_geometry'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE CAST (geometry AS geography) WITH FUNCTION geography(geometry) AS IMPLICIT;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geometry(geography)
	RETURNS geometry
	AS '$libdir/postgis-3','geometry_from_geography'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE CAST (geography AS geometry) WITH FUNCTION geometry(geography) ;

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- GiST Support Functions
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_consistent(internal,geography,integer)
	RETURNS bool
	AS '$libdir/postgis-3' ,'gserialized_gist_consistent'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_compress(internal)
	RETURNS internal
	AS '$libdir/postgis-3','gserialized_gist_compress'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_penalty(internal,internal,internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_penalty'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_picksplit(internal, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_picksplit'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_union(bytea, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_union'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_same(box2d, box2d, internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_same'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gist_decompress(internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_gist_decompress'
	LANGUAGE 'c';

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_overlaps(geography, geography)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_overlaps'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OPERATOR && (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_overlaps,
	COMMUTATOR = '&&',
	RESTRICT = gserialized_gist_sel_nd,
	JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION geography_distance_knn(geography, geography)
  RETURNS float8
  AS '$libdir/postgis-3','geography_distance_knn'
  LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
  COST 100;

-- Availability: 2.2.0
CREATE OPERATOR <-> (
  LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_distance_knn,
  COMMUTATOR = '<->'
);

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION geography_gist_distance(internal, geography, integer)
	RETURNS float8
	AS '$libdir/postgis-3' ,'gserialized_gist_geog_distance'
	LANGUAGE 'c';


-- Availability: 1.5.0
CREATE OPERATOR CLASS gist_geography_ops
	DEFAULT FOR TYPE geography USING GIST AS
	STORAGE 	gidx,
	OPERATOR        3        &&	,
--	OPERATOR        6        ~=	,
--	OPERATOR        7        ~	,
--	OPERATOR        8        @	,
-- Availability: 2.2.0
	OPERATOR        13       <-> FOR ORDER BY pg_catalog.float_ops,
-- Availability: 2.2.0
	FUNCTION        8        geography_gist_distance (internal, geography, integer),
	FUNCTION        1        geography_gist_consistent (internal, geography, integer),
	FUNCTION        2        geography_gist_union (bytea, internal),
	FUNCTION        3        geography_gist_compress (internal),
	FUNCTION        4        geography_gist_decompress (internal),
	FUNCTION        5        geography_gist_penalty (internal, internal, internal),
	FUNCTION        6        geography_gist_picksplit (internal, internal),
	FUNCTION        7        geography_gist_same (box2d, box2d, internal);

-- moved to separate file cause its invovled

--------------------------------------------------------------------
-- BRIN support for geographies                                   --
--------------------------------------------------------------------

--------------------------------
-- the needed cross-operators --
--------------------------------

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_geog(gidx, geography)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_gidx_geog_overlaps'
LANGUAGE 'c' IMMUTABLE STRICT;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_geog(gidx, gidx)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_gidx_gidx_overlaps'
LANGUAGE 'c' IMMUTABLE STRICT;

-- Availability: 2.3.0
CREATE OPERATOR && (
  LEFTARG    = gidx,
  RIGHTARG   = geography,
  PROCEDURE  = overlaps_geog,
  COMMUTATOR = &&
);

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_geog(geography, gidx)
RETURNS boolean
AS
  'SELECT $2 OPERATOR(&&) $1;'
 LANGUAGE SQL IMMUTABLE STRICT;

-- Availability: 2.3.0
CREATE OPERATOR && (
  LEFTARG    = geography,
  RIGHTARG   = gidx,
  PROCEDURE  = overlaps_geog,
  COMMUTATOR = &&
);

-- Availability: 2.3.0
CREATE OPERATOR && (
  LEFTARG   = gidx,
  RIGHTARG  = gidx,
  PROCEDURE = overlaps_geog,
  COMMUTATOR = &&
);

--------------------------------
-- the OpFamily               --
--------------------------------

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION geog_brin_inclusion_add_value(internal, internal, internal, internal) RETURNS boolean
        AS '$libdir/postgis-3','geog_brin_inclusion_add_value'
        LANGUAGE 'c';

-- Availability: 2.3.0
CREATE OPERATOR CLASS brin_geography_inclusion_ops
  DEFAULT FOR TYPE geography
  USING brin AS
    FUNCTION      1        brin_inclusion_opcinfo(internal),
    FUNCTION      2        geog_brin_inclusion_add_value(internal, internal, internal, internal),
    FUNCTION      3        brin_inclusion_consistent(internal, internal, internal),
    FUNCTION      4        brin_inclusion_union(internal, internal, internal),
    OPERATOR      3        &&(geography, geography),
    OPERATOR      3        &&(geography, gidx),
    OPERATOR      3        &&(gidx, geography),
    OPERATOR      3        &&(gidx, gidx),
  STORAGE gidx;


-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- B-Tree Functions
-- For sorting and grouping
-- Availability: 1.5.0
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_lt(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-3', 'geography_lt'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_le(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-3', 'geography_le'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_gt(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-3', 'geography_gt'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_ge(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-3', 'geography_ge'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_eq(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-3', 'geography_eq'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION geography_cmp(geography, geography)
	RETURNS integer
	AS '$libdir/postgis-3', 'geography_cmp'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

--
-- Sorting operators for Btree
--
-- Availability: 1.5.0
CREATE OPERATOR < (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_lt,
	COMMUTATOR = '>', NEGATOR = '>=',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 1.5.0
CREATE OPERATOR <= (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_le,
	COMMUTATOR = '>=', NEGATOR = '>',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 1.5.0
CREATE OPERATOR = (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_eq,
	COMMUTATOR = '=', -- we might implement a faster negator here
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 1.5.0
CREATE OPERATOR >= (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_ge,
	COMMUTATOR = '<=', NEGATOR = '<',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 1.5.0
CREATE OPERATOR > (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_gt,
	COMMUTATOR = '<', NEGATOR = '<=',
	RESTRICT = contsel, JOIN = contjoinsel
);

-- Availability: 1.5.0
CREATE OPERATOR CLASS btree_geography_ops
	DEFAULT FOR TYPE geography USING btree AS
	OPERATOR	1	< ,
	OPERATOR	2	<= ,
	OPERATOR	3	= ,
	OPERATOR	4	>= ,
	OPERATOR	5	> ,
	FUNCTION	1	geography_cmp (geography, geography);


-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Export Functions
-- Availability: 1.5.0
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

--
-- SVG OUTPUT
--

-- Changed 2.0.0 to use default args and named args
CREATE OR REPLACE FUNCTION ST_AsSVG(geog geography, rel integer DEFAULT 0, maxdecimaldigits integer DEFAULT 15)
	RETURNS text
	AS '$libdir/postgis-3','geography_as_svg'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_AsSVG(text)
	RETURNS text AS
	$$ SELECT ST_AsSVG($1::geometry,0,15);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
        COST 250;

--
-- GML OUTPUT
--

-- ST_AsGML(version, geography, precision, option, prefix, id)
-- Changed: 3.0.0 to bind directly to C
-- Changed: 2.0.0 to use default args and allow named args
-- Changed: 2.1.0 enhance to allow id value
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_AsGML(version integer, geog geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT 'gml', id text DEFAULT '')
	RETURNS text
	AS '$libdir/postgis-3','geography_as_gml'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_AsGML(geog geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT 'gml', id text DEFAULT '')
	RETURNS text
	AS '$libdir/postgis-3','geography_as_gml'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
-- Change 2.0.0 to use base function
CREATE OR REPLACE FUNCTION ST_AsGML(text)
	RETURNS text AS
	$$ SELECT _ST_AsGML(2,$1::geometry,15,0, NULL, NULL);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
        COST 250;

--
-- KML OUTPUT
--

-- AsKML(geography,precision)
-- Changed: 2.0.0 to use default args and named args
-- Replaces ST_AsKML(geography, integer) deprecated in 2.0.0
CREATE OR REPLACE FUNCTION ST_AsKML(geog geography, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT '')
	RETURNS text
	AS '$libdir/postgis-3','geography_as_kml'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
-- Deprecated 2.0.0
CREATE OR REPLACE FUNCTION ST_AsKML(text)
	RETURNS text AS
	$$ SELECT ST_AsKML($1::geometry, 15);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
        COST 250;

--
-- GeoJson Output
--

CREATE OR REPLACE FUNCTION ST_AsGeoJson(geog geography, maxdecimaldigits integer DEFAULT 9, options integer DEFAULT 0)
	RETURNS text
	AS '$libdir/postgis-3','geography_as_geojson'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
-- Deprecated in 2.0.0
CREATE OR REPLACE FUNCTION ST_AsGeoJson(text)
	RETURNS text AS
	$$ SELECT ST_AsGeoJson($1::geometry, 9, 0);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
        COST 250;


-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Measurement Functions
-- Availability: 1.5.0
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Replaces ST_Distance(geography, geography) deprecated in 3.0.0
CREATE OR REPLACE FUNCTION ST_Distance(geog1 geography, geog2 geography, use_spheroid boolean DEFAULT true)
	RETURNS float8
	AS '$libdir/postgis-3','geography_distance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Distance(text, text)
	RETURNS float8 AS
	$$ SELECT ST_Distance($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Only expands the bounding box, the actual geometry will remain unchanged, use with care.
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_Expand(geography, float8)
	RETURNS geography
	AS '$libdir/postgis-3','geography_expand'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;


-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Distance/DWithin testing functions for cached operations.
-- For developer/tester use only.
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Calculate the distance in geographics *without* using the caching code line or tree code
CREATE OR REPLACE FUNCTION _ST_DistanceUnCached(geography, geography, float8, boolean)
	RETURNS float8
	AS '$libdir/postgis-3','geography_distance_uncached'
	LANGUAGE 'c' IMMUTABLE STRICT
	COST 5000;

-- Calculate the distance in geographics *without* using the caching code line or tree code
CREATE OR REPLACE FUNCTION _ST_DistanceUnCached(geography, geography, boolean)
	RETURNS float8
	AS 'SELECT _ST_DistanceUnCached($1, $2, 0.0, $3)'
	LANGUAGE 'sql' IMMUTABLE STRICT;

-- Calculate the distance in geographics *without* using the caching code line or tree code
CREATE OR REPLACE FUNCTION _ST_DistanceUnCached(geography, geography)
	RETURNS float8
	AS 'SELECT _ST_DistanceUnCached($1, $2, 0.0, true)'
	LANGUAGE 'sql' IMMUTABLE STRICT;

-- Calculate the distance in geographics using the circular tree code, but
-- *without* using the caching code line
CREATE OR REPLACE FUNCTION _ST_DistanceTree(geography, geography, float8, boolean)
	RETURNS float8
	AS '$libdir/postgis-3','geography_distance_tree'
	LANGUAGE 'c' IMMUTABLE STRICT
	COST 5000;

-- Calculate the distance in geographics using the circular tree code, but
-- *without* using the caching code line
CREATE OR REPLACE FUNCTION _ST_DistanceTree(geography, geography)
	RETURNS float8
	AS 'SELECT _ST_DistanceTree($1, $2, 0.0, true)'
	LANGUAGE 'sql' IMMUTABLE STRICT;

-- Calculate the dwithin relation *without* using the caching code line or tree code
CREATE OR REPLACE FUNCTION _ST_DWithinUnCached(geography, geography, float8, boolean)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_dwithin_uncached'
	LANGUAGE 'c' IMMUTABLE STRICT
	COST 5000;

-- Calculate the dwithin relation *without* using the caching code line or tree code
CREATE OR REPLACE FUNCTION _ST_DWithinUnCached(geography, geography, float8)
	RETURNS boolean
	AS 'SELECT $1 OPERATOR(&&) _ST_Expand($2,$3) AND $2 OPERATOR(&&) _ST_Expand($1,$3) AND _ST_DWithinUnCached($1, $2, $3, true)'
	LANGUAGE 'sql' IMMUTABLE;

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_Area(geog geography, use_spheroid boolean DEFAULT true)
	RETURNS float8
	AS '$libdir/postgis-3','geography_area'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Area(text)
	RETURNS float8 AS
	$$ SELECT ST_Area($1::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_Length(geog geography, use_spheroid boolean DEFAULT true)
	RETURNS float8
	AS '$libdir/postgis-3','geography_length'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Length(text)
	RETURNS float8 AS
	$$ SELECT ST_Length($1::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Project(geog geography, distance float8, azimuth float8)
	RETURNS geography
	AS '$libdir/postgis-3','geography_project'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_Project(geog_from geography, geog_to geography, distance float8)
	RETURNS geography
	AS '$libdir/postgis-3','geography_project_geography'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Azimuth(geog1 geography, geog2 geography)
	RETURNS float8
	AS '$libdir/postgis-3','geography_azimuth'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Perimeter(geog geography, use_spheroid boolean DEFAULT true)
	RETURNS float8
	AS '$libdir/postgis-3','geography_perimeter'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_PointOutside(geography)
	RETURNS geography
	AS '$libdir/postgis-3','geography_point_outside'
	LANGUAGE 'c' IMMUTABLE STRICT
	COST 1;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_Segmentize(geog geography, max_segment_length float8)
	RETURNS geography
	AS '$libdir/postgis-3','geography_segmentize'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_BestSRID(geography, geography)
	RETURNS integer
	AS '$libdir/postgis-3','geography_bestsrid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_BestSRID(geography)
	RETURNS integer
	AS '$libdir/postgis-3','geography_bestsrid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_AsBinary(geography)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_asBinary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_AsBinary(geography, text)
	RETURNS bytea
	AS '$libdir/postgis-3','LWGEOM_asBinary'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 50;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_AsEWKT(geography)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asEWKT'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_AsEWKT(geography, integer)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asEWKT'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_AsEWKT(text)
	RETURNS text AS
	$$ SELECT ST_AsEWKT($1::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
        COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION GeometryType(geography)
	RETURNS text
	AS '$libdir/postgis-3', 'LWGEOM_getTYPE'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_Summary(geography)
	RETURNS text
	AS '$libdir/postgis-3', 'LWGEOM_summary'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION ST_GeoHash(geog geography, maxchars integer DEFAULT 0)
	RETURNS TEXT
	AS '$libdir/postgis-3', 'ST_GeoHash'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_SRID(geog geography)
	RETURNS integer
	AS '$libdir/postgis-3', 'LWGEOM_get_srid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_SetSRID(geog geography, srid integer)
	RETURNS geography
	AS '$libdir/postgis-3', 'LWGEOM_set_srid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 2.4.0
CREATE OR REPLACE FUNCTION ST_Centroid(geography, use_spheroid boolean DEFAULT true)
	RETURNS geography
	AS '$libdir/postgis-3','geography_centroid'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;


-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Centroid(text)
	RETURNS geometry AS
	$$ SELECT ST_Centroid($1::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-----------------------------------------------------------------------------

-- Only implemented for polygon-over-point
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_Covers(geog1 geography, geog2 geography)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_covers'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Stop calculation and return immediately once distance is less than tolerance
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION _ST_DWithin(geog1 geography, geog2 geography, tolerance float8, use_spheroid boolean DEFAULT true)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_dwithin'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Only implemented for polygon-over-point
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION _ST_CoveredBy(geog1 geography, geog2 geography)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_coveredby'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_Covers(geog1 geography, geog2 geography)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_covers'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0
-- Changed: 3.0.0 to use default and named args
-- Replaces ST_DWithin(geography, geography, float8) deprecated in 3.0.0
CREATE OR REPLACE FUNCTION ST_DWithin(geog1 geography, geog2 geography, tolerance float8, use_spheroid boolean DEFAULT true)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_dwithin'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION ST_CoveredBy(geog1 geography, geog2 geography)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_coveredby'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_Intersects(geog1 geography, geog2 geography)
	RETURNS boolean
	AS '$libdir/postgis-3','geography_intersects'
	SUPPORT postgis_index_supportfn
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_Buffer(geography, float8)
	RETURNS geography
	AS 'SELECT geography(ST_Transform(ST_Buffer(ST_Transform(geometry($1), _ST_BestSRID($1)), $2), ST_SRID($1)))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.3.x
CREATE OR REPLACE FUNCTION ST_Buffer(geography, float8, integer)
	RETURNS geography
	AS 'SELECT geography(ST_Transform(ST_Buffer(ST_Transform(geometry($1), _ST_BestSRID($1)), $2, $3), ST_SRID($1)))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.3.x
CREATE OR REPLACE FUNCTION ST_Buffer(geography, float8, text)
	RETURNS geography
	AS 'SELECT geography(ST_Transform(ST_Buffer(ST_Transform(geometry($1), _ST_BestSRID($1)), $2, $3), ST_SRID($1)))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Buffer(text, float8)
	RETURNS geometry AS
	$$ SELECT ST_Buffer($1::geometry, $2);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.3.x
CREATE OR REPLACE FUNCTION ST_Buffer(text, float8, integer)
	RETURNS geometry AS
	$$ SELECT ST_Buffer($1::geometry, $2, $3);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.3.x
CREATE OR REPLACE FUNCTION ST_Buffer(text, float8, text)
	RETURNS geometry AS
	$$ SELECT ST_Buffer($1::geometry, $2, $3);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_Intersection(geography, geography)
	RETURNS geography
	AS 'SELECT geography(ST_Transform(ST_Intersection(ST_Transform(geometry($1), _ST_BestSRID($1, $2)), ST_Transform(geometry($2), _ST_BestSRID($1, $2))), ST_SRID($1)))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Intersection(text, text)
	RETURNS geometry AS
	$$ SELECT ST_Intersection($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Covers(text, text)
	RETURNS boolean AS
	$$ SELECT ST_Covers($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_CoveredBy(text, text)
	RETURNS boolean AS
	$$ SELECT ST_CoveredBy($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_DWithin(text, text, float8)
	RETURNS boolean AS
	$$ SELECT ST_DWithin($1::geometry, $2::geometry, $3);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;


-- Availability: 1.5.0 - this is just a hack to prevent unknown from causing ambiguous name because of geography
CREATE OR REPLACE FUNCTION ST_Intersects(text, text)
	RETURNS boolean AS
	$$ SELECT ST_Intersects($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-----------------------------------------------------------------------------

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_ClosestPoint(geography, geography, use_spheroid boolean DEFAULT true)
 	RETURNS geography
	AS '$libdir/postgis-3', 'geography_closestpoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_ClosestPoint(text, text)
	RETURNS geometry AS
	$$ SELECT ST_ClosestPoint($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_ShortestLine(geography, geography, use_spheroid boolean DEFAULT true)
	RETURNS geography
	AS '$libdir/postgis-3', 'geography_shortestline'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_ShortestLine(text, text)
	RETURNS geometry AS
	$$ SELECT ST_ShortestLine($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineSubstring(geography, float8, float8)
	RETURNS geography
	AS '$libdir/postgis-3', 'geography_line_substring'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineSubstring(text, float8, float8)
	RETURNS geometry AS
	$$ SELECT ST_LineSubstring($1::geometry, $2, $3);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineLocatePoint(geography, geography, use_spheroid boolean DEFAULT true)
	RETURNS float
	AS '$libdir/postgis-3', 'geography_line_locate_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineLocatePoint(text, text)
	RETURNS float AS
	$$ SELECT ST_LineLocatePoint($1::geometry, $2::geometry);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineInterpolatePoints(geography, float8, use_spheroid boolean DEFAULT true, repeat boolean DEFAULT true)
	RETURNS geography
	AS '$libdir/postgis-3', 'geography_line_interpolate_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineInterpolatePoints(text, float8)
	RETURNS geometry AS
	$$ SELECT ST_LineInterpolatePoints($1::geometry, $2);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineInterpolatePoint(geography, float8, use_spheroid boolean DEFAULT true)
	RETURNS geography
	AS '$libdir/postgis-3', 'geography_line_interpolate_point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.4.0
CREATE OR REPLACE FUNCTION ST_LineInterpolatePoint(text, float8)
	RETURNS geometry AS
	$$ SELECT ST_LineInterpolatePoint($1::geometry, $2);  $$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE;

----------------------------------------------------------------


-- Availability: 2.2.0
CREATE OR REPLACE FUNCTION ST_DistanceSphere(geom1 geometry, geom2 geometry)
	RETURNS FLOAT8 AS
	'select ST_distance( geography($1), geography($2),false)'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION ST_DistanceSphere(geom1 geometry, geom2 geometry, radius float8)
	RETURNS FLOAT8
	AS '$libdir/postgis-3','LWGEOM_distance_sphere'
	LANGUAGE 'c' IMMUTABLE STRICT
 	COST 5000;

---------------------------------------------------------------
-- GEOMETRY_COLUMNS view support functions
---------------------------------------------------------------
-- New helper function so we can keep list of valid geometry types in one place --
-- Maps old names to pramsey beautiful names but can take old name or new name as input
-- By default returns new name but can be overridden to return old name for old constraint like support
CREATE OR REPLACE FUNCTION postgis_type_name(geomname varchar, coord_dimension integer, use_new_name boolean DEFAULT true)
	RETURNS varchar
AS
$$
	SELECT CASE WHEN $3 THEN new_name ELSE old_name END As geomname
	FROM
	( VALUES
			('GEOMETRY', 'Geometry', 2),
			('GEOMETRY', 'GeometryZ', 3),
			('GEOMETRYM', 'GeometryM', 3),
			('GEOMETRY', 'GeometryZM', 4),

			('GEOMETRYCOLLECTION', 'GeometryCollection', 2),
			('GEOMETRYCOLLECTION', 'GeometryCollectionZ', 3),
			('GEOMETRYCOLLECTIONM', 'GeometryCollectionM', 3),
			('GEOMETRYCOLLECTION', 'GeometryCollectionZM', 4),

			('POINT', 'Point', 2),
			('POINT', 'PointZ', 3),
			('POINTM','PointM', 3),
			('POINT', 'PointZM', 4),

			('MULTIPOINT','MultiPoint', 2),
			('MULTIPOINT','MultiPointZ', 3),
			('MULTIPOINTM','MultiPointM', 3),
			('MULTIPOINT','MultiPointZM', 4),

			('POLYGON', 'Polygon', 2),
			('POLYGON', 'PolygonZ', 3),
			('POLYGONM', 'PolygonM', 3),
			('POLYGON', 'PolygonZM', 4),

			('MULTIPOLYGON', 'MultiPolygon', 2),
			('MULTIPOLYGON', 'MultiPolygonZ', 3),
			('MULTIPOLYGONM', 'MultiPolygonM', 3),
			('MULTIPOLYGON', 'MultiPolygonZM', 4),

			('MULTILINESTRING', 'MultiLineString', 2),
			('MULTILINESTRING', 'MultiLineStringZ', 3),
			('MULTILINESTRINGM', 'MultiLineStringM', 3),
			('MULTILINESTRING', 'MultiLineStringZM', 4),

			('LINESTRING', 'LineString', 2),
			('LINESTRING', 'LineStringZ', 3),
			('LINESTRINGM', 'LineStringM', 3),
			('LINESTRING', 'LineStringZM', 4),

			('CIRCULARSTRING', 'CircularString', 2),
			('CIRCULARSTRING', 'CircularStringZ', 3),
			('CIRCULARSTRINGM', 'CircularStringM' ,3),
			('CIRCULARSTRING', 'CircularStringZM', 4),

			('COMPOUNDCURVE', 'CompoundCurve', 2),
			('COMPOUNDCURVE', 'CompoundCurveZ', 3),
			('COMPOUNDCURVEM', 'CompoundCurveM', 3),
			('COMPOUNDCURVE', 'CompoundCurveZM', 4),

			('CURVEPOLYGON', 'CurvePolygon', 2),
			('CURVEPOLYGON', 'CurvePolygonZ', 3),
			('CURVEPOLYGONM', 'CurvePolygonM', 3),
			('CURVEPOLYGON', 'CurvePolygonZM', 4),

			('MULTICURVE', 'MultiCurve', 2),
			('MULTICURVE', 'MultiCurveZ', 3),
			('MULTICURVEM', 'MultiCurveM', 3),
			('MULTICURVE', 'MultiCurveZM', 4),

			('MULTISURFACE', 'MultiSurface', 2),
			('MULTISURFACE', 'MultiSurfaceZ', 3),
			('MULTISURFACEM', 'MultiSurfaceM', 3),
			('MULTISURFACE', 'MultiSurfaceZM', 4),

			('POLYHEDRALSURFACE', 'PolyhedralSurface', 2),
			('POLYHEDRALSURFACE', 'PolyhedralSurfaceZ', 3),
			('POLYHEDRALSURFACEM', 'PolyhedralSurfaceM', 3),
			('POLYHEDRALSURFACE', 'PolyhedralSurfaceZM', 4),

			('TRIANGLE', 'Triangle', 2),
			('TRIANGLE', 'TriangleZ', 3),
			('TRIANGLEM', 'TriangleM', 3),
			('TRIANGLE', 'TriangleZM', 4),

			('TIN', 'Tin', 2),
			('TIN', 'TinZ', 3),
			('TINM', 'TinM', 3),
			('TIN', 'TinZM', 4) )
			 As g(old_name, new_name, coord_dimension)
	WHERE (upper(old_name) = upper($1) OR upper(new_name) = upper($1))
		AND coord_dimension = $2;
$$
LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE COST 5000;

-- Availability: 2.0.0
-- TODO: Can't deprecate this because UpdateGeometrySRID still uses them
CREATE OR REPLACE FUNCTION postgis_constraint_srid(geomschema text, geomtable text, geomcolumn text) RETURNS integer AS
$$
SELECT replace(replace(split_part(s.consrc, ' = ', 2), ')', ''), '(', '')::integer
		 FROM pg_class c, pg_namespace n, pg_attribute a
		 , (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
			FROM pg_constraint) AS s
		 WHERE n.nspname = $1
		 AND c.relname = $2
		 AND a.attname = $3
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%srid(% = %';
$$
LANGUAGE 'sql' STABLE STRICT PARALLEL SAFE COST 250;

-- Availability: 2.0.0
-- TODO: Can't deprecate this because UpdateGeometrySRID still uses them
CREATE OR REPLACE FUNCTION postgis_constraint_dims(geomschema text, geomtable text, geomcolumn text) RETURNS integer AS
$$
SELECT  replace(split_part(s.consrc, ' = ', 2), ')', '')::integer
		 FROM pg_class c, pg_namespace n, pg_attribute a
		 , (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
			FROM pg_constraint) AS s
		 WHERE n.nspname = $1
		 AND c.relname = $2
		 AND a.attname = $3
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%ndims(% = %';
$$
LANGUAGE 'sql' STABLE STRICT PARALLEL SAFE COST 250;

-- support function to pull out geometry type from constraint check
-- will return pretty name instead of ugly name
-- Availability: 2.0.0
-- TODO: Can't deprecate this because UpdateGeometrySRID still uses them
CREATE OR REPLACE FUNCTION postgis_constraint_type(geomschema text, geomtable text, geomcolumn text) RETURNS varchar AS
$$
SELECT  replace(split_part(s.consrc, '''', 2), ')', '')::varchar
		 FROM pg_class c, pg_namespace n, pg_attribute a
		 , (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
			FROM pg_constraint) AS s
		 WHERE n.nspname = $1
		 AND c.relname = $2
		 AND a.attname = $3
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%geometrytype(% = %';
$$
LANGUAGE 'sql' STABLE STRICT PARALLEL SAFE COST 250;

-- Availability: 2.0.0
-- Changed: 2.1.8 significant performance improvement for constraint based columns
-- Changed: 2.2.0 get rid of schema, table, column cast to improve performance
-- Changed: 2.4.0 List also Parent partitioned tables
-- Changed: 2.5.2 replace use of pg_constraint.consrc with pg_get_constraintdef, consrc removed pg12

CREATE OR REPLACE VIEW geometry_columns AS
 SELECT current_database()::character varying(256) AS f_table_catalog,
	n.nspname AS f_table_schema,
	c.relname AS f_table_name,
	a.attname AS f_geometry_column,
	COALESCE(postgis_typmod_dims(a.atttypmod), sn.ndims, 2) AS coord_dimension,
	COALESCE(NULLIF(postgis_typmod_srid(a.atttypmod), 0), sr.srid, 0) AS srid,
	replace(replace(COALESCE(NULLIF(upper(postgis_typmod_type(a.atttypmod)), 'GEOMETRY'::text), st.type, 'GEOMETRY'::text), 'ZM'::text, ''::text), 'Z'::text, ''::text)::character varying(30) AS type
   FROM pg_class c
	 JOIN pg_attribute a ON a.attrelid = c.oid AND NOT a.attisdropped
	 JOIN pg_namespace n ON c.relnamespace = n.oid
	 JOIN pg_type t ON a.atttypid = t.oid
	 LEFT JOIN ( SELECT s.connamespace,
			s.conrelid,
			s.conkey, replace(split_part(s.consrc, ''''::text, 2), ')'::text, ''::text) As type
		   FROM (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
				FROM pg_constraint) AS s
		  WHERE s.consrc ~~* '%geometrytype(% = %'::text

) st ON st.connamespace = n.oid AND st.conrelid = c.oid AND (a.attnum = ANY (st.conkey))
	 LEFT JOIN ( SELECT s.connamespace,
			s.conrelid,
			s.conkey, replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text)::integer As ndims
		   FROM (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
			FROM pg_constraint) AS s
		  WHERE s.consrc ~~* '%ndims(% = %'::text

) sn ON sn.connamespace = n.oid AND sn.conrelid = c.oid AND (a.attnum = ANY (sn.conkey))
	 LEFT JOIN ( SELECT s.connamespace,
			s.conrelid,
			s.conkey, replace(replace(split_part(s.consrc, ' = '::text, 2), ')'::text, ''::text), '('::text, ''::text)::integer As srid
		   FROM (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
			FROM pg_constraint) AS s
		  WHERE s.consrc ~~* '%srid(% = %'::text

) sr ON sr.connamespace = n.oid AND sr.conrelid = c.oid AND (a.attnum = ANY (sr.conkey))
  WHERE (c.relkind = ANY (ARRAY['r'::"char", 'v'::"char", 'm'::"char", 'f'::"char", 'p'::"char"]))
  AND NOT c.relname = 'raster_columns'::name AND t.typname = 'geometry'::name
  AND NOT pg_is_other_temp_schema(c.relnamespace) AND has_table_privilege(c.oid, 'SELECT'::text);

-- TODO: support RETURNING and raise a WARNING
CREATE OR REPLACE RULE geometry_columns_insert AS
		ON INSERT TO geometry_columns
		DO INSTEAD NOTHING;

-- TODO: raise a WARNING
CREATE OR REPLACE RULE geometry_columns_update AS
		ON UPDATE TO geometry_columns
		DO INSTEAD NOTHING;

-- TODO: raise a WARNING
CREATE OR REPLACE RULE geometry_columns_delete AS
		ON DELETE TO geometry_columns
		DO INSTEAD NOTHING;

---------------------------------------------------------------
-- 3D-functions
---------------------------------------------------------------

CREATE OR REPLACE FUNCTION ST_3DDistance(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_3DDistance'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_3DMaxDistance(geom1 geometry, geom2 geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'LWGEOM_maxdistance3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_3DClosestPoint(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_closestpoint3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_3DShortestLine(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_shortestline3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

CREATE OR REPLACE FUNCTION ST_3DLongestLine(geom1 geometry, geom2 geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_longestline3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

---------------------------------------------------------------
-- SQL-MM
---------------------------------------------------------------
-- PostGIS equivalent function: ST_ndims(geometry)
CREATE OR REPLACE FUNCTION ST_CoordDim(Geometry geometry)
	RETURNS smallint
	AS '$libdir/postgis-3', 'LWGEOM_ndims'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 1;

--
-- SQL-MM
--
-- ST_CurveToLine(Geometry geometry, Tolerance float8, ToleranceType integer, Flags integer)
--
-- Converts a given geometry to a linear geometry.  Each curveed
-- geometry or segment is converted into a linear approximation using
-- the given tolerance.
--
-- Semantic of tolerance depends on the `toltype` argument, which can be:
--    0: Tolerance is number of segments per quadrant
--    1: Tolerance is max distance between curve and line
--    2: Tolerance is max angle between radii defining line vertices
--
-- Supported flags:
--    1: Symmetric output (result in same vertices when inverting the curve)
--
-- Availability: 2.4.0
-- Changed: 2.5.0 to add defaults
-- Replaces ST_CurveToLine(geometry, integer) deprecated in 2.5.0
-- Replaces ST_CurveToLine(geometry) deprecated in 2.5.0
--
CREATE OR REPLACE FUNCTION ST_CurveToLine(geom geometry, tol float8 DEFAULT 32, toltype integer DEFAULT 0, flags integer DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CurveToLine'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_HasArc(Geometry geometry)
	RETURNS boolean
	AS '$libdir/postgis-3', 'LWGEOM_has_arc'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

CREATE OR REPLACE FUNCTION ST_LineToCurve(Geometry geometry)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_line_desegmentize'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_NumCurves(Geometry geometry)
	RETURNS integer
	AS '$libdir/postgis-3', 'ST_NumCurves'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

CREATE OR REPLACE FUNCTION ST_CurveN(Geometry geometry, i integer)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_CurveN'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 5000;

-------------------------------------------------------------------------------
-- SQL/MM - SQL Functions on type ST_Point
-------------------------------------------------------------------------------

-- PostGIS equivalent function: ST_MakePoint(XCoordinate float8,YCoordinate float8)
CREATE OR REPLACE FUNCTION ST_Point(float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'LWGEOM_makepoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_Point(float8, float8, srid integer)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Point'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_PointZ(XCoordinate float8, YCoordinate float8, ZCoordinate float8, srid integer DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_PointZ'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_PointM(XCoordinate float8, YCoordinate float8, MCoordinate float8, srid integer DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_PointM'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION ST_PointZM(XCoordinate float8, YCoordinate float8, ZCoordinate float8, MCoordinate float8, srid integer DEFAULT 0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_PointZM'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: ST_MakePolygon(Geometry geometry)
CREATE OR REPLACE FUNCTION ST_Polygon(geometry, int)
	RETURNS geometry
	AS $$
	SELECT ST_SetSRID(ST_MakePolygon($1), $2)
	$$
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- PostGIS equivalent function: GeomFromWKB(WKB bytea))
-- Note: Defaults to an SRID=-1, not 0 as per SQL/MM specs.
CREATE OR REPLACE FUNCTION ST_WKBToSQL(WKB bytea)
	RETURNS geometry
	AS '$libdir/postgis-3','LWGEOM_from_WKB'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

---
-- Linear referencing functions
---
-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_LocateBetween(Geometry geometry, FromMeasure float8, ToMeasure float8, LeftRightOffset float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_LocateBetween'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_LocateAlong(Geometry geometry, Measure float8, LeftRightOffset float8 default 0.0)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_LocateAlong'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Only accepts LINESTRING as parameters.
-- Availability: 1.4.0
CREATE OR REPLACE FUNCTION ST_LocateBetweenElevations(Geometry geometry, FromElevation float8, ToElevation float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_LocateBetweenElevations'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-- Availability: 2.0.0
CREATE OR REPLACE FUNCTION ST_InterpolatePoint(Line geometry, Point geometry)
	RETURNS float8
	AS '$libdir/postgis-3', 'ST_InterpolatePoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

---------------------------------------------------------------
-- Grid / Hexagon coverage functions
---

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_Hexagon(size float8, cell_i integer, cell_j integer, origin geometry DEFAULT 'POINT(0 0)')
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Hexagon'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE
	COST 50;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_Square(size float8, cell_i integer, cell_j integer, origin geometry DEFAULT 'POINT(0 0)')
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_Square'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE
	COST 50;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_HexagonGrid(size float8, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer)
	RETURNS SETOF record
	AS '$libdir/postgis-3', 'ST_ShapeGrid'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE
	COST 250;

-- Availability: 3.1.0
CREATE OR REPLACE FUNCTION ST_SquareGrid(size float8, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer)
	RETURNS SETOF record
	AS '$libdir/postgis-3', 'ST_ShapeGrid'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE
	COST 250;


-- moved to separate file cause its involved


--------------------------------------------------------------------
-- BRIN support start                                                --
--------------------------------------------------------------------

---------------------------------
-- 2d operators                --
---------------------------------

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION contains_2d(box2df, geometry)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_contains_box2df_geom_2d'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION is_contained_2d(box2df, geometry)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_within_box2df_geom_2d'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_2d(box2df, geometry)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_overlaps_box2df_geom_2d'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_2d(box2df, box2df)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_contains_box2df_box2df_2d'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION contains_2d(box2df, box2df)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_contains_box2df_box2df_2d'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION is_contained_2d(box2df, box2df)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_contains_box2df_box2df_2d'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OPERATOR ~ (
	LEFTARG    = box2df,
	RIGHTARG   = geometry,
	PROCEDURE  = contains_2d,
	COMMUTATOR = @
);

-- Availability: 2.3.0
CREATE OPERATOR @ (
	LEFTARG    = box2df,
	RIGHTARG   = geometry,
	PROCEDURE  = is_contained_2d,
	COMMUTATOR = ~
);

-- Availability: 2.3.0
CREATE OPERATOR && (
	LEFTARG    = box2df,
	RIGHTARG   = geometry,
	PROCEDURE  = overlaps_2d,
	COMMUTATOR = &&
);

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION contains_2d(geometry, box2df)
RETURNS boolean
AS
	'SELECT $2 OPERATOR(@) $1;'
LANGUAGE SQL IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION is_contained_2d(geometry, box2df)
RETURNS boolean
AS
	'SELECT $2 OPERATOR(~) $1;'
LANGUAGE SQL IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_2d(geometry, box2df)
RETURNS boolean
AS
	'SELECT $2 OPERATOR(&&) $1;'
LANGUAGE SQL IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OPERATOR ~ (
	LEFTARG = geometry,
	RIGHTARG = box2df,
	COMMUTATOR = @,
	PROCEDURE  = contains_2d
);
-- Availability: 2.3.0
CREATE OPERATOR @ (
	LEFTARG = geometry,
	RIGHTARG = box2df,
	COMMUTATOR = ~,
	PROCEDURE = is_contained_2d
);
-- Availability: 2.3.0
CREATE OPERATOR && (
	LEFTARG    = geometry,
	RIGHTARG   = box2df,
	PROCEDURE  = overlaps_2d,
	COMMUTATOR = &&
);
-- Availability: 2.3.0
CREATE OPERATOR && (
	LEFTARG   = box2df,
	RIGHTARG  = box2df,
	PROCEDURE = overlaps_2d,
	COMMUTATOR = &&
);
-- Availability: 2.3.0
CREATE OPERATOR @ (
	LEFTARG   = box2df,
	RIGHTARG  = box2df,
	PROCEDURE = is_contained_2d,
	COMMUTATOR = ~
);
-- Availability: 2.3.0
CREATE OPERATOR ~ (
	LEFTARG   = box2df,
	RIGHTARG  = box2df,
	PROCEDURE = contains_2d,
	COMMUTATOR = @
);

----------------------------
-- nd operators           --
----------------------------

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_nd(gidx, geometry)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_gidx_geom_overlaps'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_nd(gidx, gidx)
RETURNS boolean
AS '$libdir/postgis-3','gserialized_gidx_gidx_overlaps'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OPERATOR &&& (
	LEFTARG    = gidx,
	RIGHTARG   = geometry,
	PROCEDURE  = overlaps_nd,
	COMMUTATOR = &&&
);

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION overlaps_nd(geometry, gidx)
RETURNS boolean
AS
	'SELECT $2 OPERATOR(&&&) $1;'
LANGUAGE SQL IMMUTABLE STRICT PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OPERATOR &&& (
	LEFTARG    = geometry,
	RIGHTARG   = gidx,
	PROCEDURE  = overlaps_nd,
	COMMUTATOR = &&&
);

-- Availability: 2.3.0
CREATE OPERATOR &&& (
	LEFTARG   = gidx,
	RIGHTARG  = gidx,
	PROCEDURE = overlaps_nd,
	COMMUTATOR = &&&
);

	------------------------------
	-- Create operator families --
	------------------------------

	-------------
	-- 2D case --
	-------------

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION geom2d_brin_inclusion_add_value(internal, internal, internal, internal)
RETURNS boolean
AS '$libdir/postgis-3','geom2d_brin_inclusion_add_value'
LANGUAGE 'c' PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION geom3d_brin_inclusion_add_value(internal, internal, internal, internal)
RETURNS boolean
AS '$libdir/postgis-3','geom3d_brin_inclusion_add_value'
LANGUAGE 'c' PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OR REPLACE FUNCTION geom4d_brin_inclusion_add_value(internal, internal, internal, internal)
RETURNS boolean
AS '$libdir/postgis-3','geom4d_brin_inclusion_add_value'
LANGUAGE 'c' PARALLEL SAFE COST 1;

-- Availability: 2.3.0
CREATE OPERATOR CLASS brin_geometry_inclusion_ops_2d
  DEFAULT FOR TYPE geometry
  USING brin AS
    FUNCTION      1        brin_inclusion_opcinfo(internal),
    FUNCTION      2        geom2d_brin_inclusion_add_value(internal, internal, internal, internal),
    FUNCTION      3        brin_inclusion_consistent(internal, internal, internal),
    FUNCTION      4        brin_inclusion_union(internal, internal, internal),
    OPERATOR      3         &&(box2df, box2df),
    OPERATOR      3         &&(box2df, geometry),
    OPERATOR      3         &&(geometry, box2df),
    OPERATOR      3        &&(geometry, geometry),
    OPERATOR      7         ~(box2df, box2df),
    OPERATOR      7         ~(box2df, geometry),
    OPERATOR      7         ~(geometry, box2df),
    OPERATOR      7        ~(geometry, geometry),
    OPERATOR      8         @(box2df, box2df),
    OPERATOR      8         @(box2df, geometry),
    OPERATOR      8         @(geometry, box2df),
    OPERATOR      8        @(geometry, geometry),
  STORAGE box2df;

		-------------
		-- 3D case --
		-------------

-- Availability: 2.3.0
CREATE OPERATOR CLASS brin_geometry_inclusion_ops_3d
  FOR TYPE geometry
  USING brin AS
    FUNCTION      1        brin_inclusion_opcinfo(internal) ,
    FUNCTION      2        geom3d_brin_inclusion_add_value(internal, internal, internal, internal),
    FUNCTION      3        brin_inclusion_consistent(internal, internal, internal),
    FUNCTION      4        brin_inclusion_union(internal, internal, internal),
    OPERATOR      3        &&&(geometry, geometry),
    OPERATOR      3        &&&(geometry, gidx),
    OPERATOR      3        &&&(gidx, geometry),
    OPERATOR      3        &&&(gidx, gidx),
  STORAGE gidx;

		-------------
		-- 4D case --
		-------------

-- Availability: 2.3.0
CREATE OPERATOR CLASS brin_geometry_inclusion_ops_4d
  FOR TYPE geometry
  USING brin AS
    FUNCTION      1        brin_inclusion_opcinfo(internal),
    FUNCTION      2        geom4d_brin_inclusion_add_value(internal, internal, internal, internal),
    FUNCTION      3        brin_inclusion_consistent(internal, internal, internal),
    FUNCTION      4        brin_inclusion_union(internal, internal, internal),
    OPERATOR      3        &&&(geometry, geometry),
    OPERATOR      3        &&&(geometry, gidx),
    OPERATOR      3        &&&(gidx, geometry),
    OPERATOR      3        &&&(gidx, gidx),
  STORAGE gidx;

-----------------------
-- BRIN support end
-----------------------



-- Availability: 3.3.0
CREATE OR REPLACE FUNCTION ST_SimplifyPolygonHull(geom geometry, vertex_fraction float8, is_outer boolean DEFAULT true)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_SimplifyPolygonHull'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE
	COST 5000;




-- Availability: 2.0.0
-- Changed: 2.5.0
-- Enhanced: 3.3.0 implements it in C, if GEOS >= 3.10
-- Replaces _st_concavehull(geometry) deprecated in 3.3.0-with-geos-3.11
CREATE OR REPLACE FUNCTION ST_ConcaveHull(param_geom geometry, param_pctconvex float, param_allow_holes boolean DEFAULT false)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_ConcaveHull'
	LANGUAGE 'c' IMMUTABLE STRICT
	PARALLEL SAFE
	COST 5000;



-----------------------------------------------------------------------
-- X3D OUTPUT
-----------------------------------------------------------------------
-- _ST_AsX3D(version, geom, precision, option, attribs)
CREATE OR REPLACE FUNCTION _ST_AsX3D(integer, geometry, integer, integer, text)
	RETURNS TEXT
	AS '$libdir/postgis-3','LWGEOM_asX3D'
	LANGUAGE 'c' IMMUTABLE PARALLEL SAFE
	COST 250;

-- ST_AsX3D(geom, precision, options)
CREATE OR REPLACE FUNCTION ST_AsX3D(geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0)
	RETURNS TEXT
	AS $$SELECT _ST_AsX3D(3,$1,$2,$3,'');$$
	LANGUAGE 'sql' IMMUTABLE PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- ST_Angle
-----------------------------------------------------------------------
-- Availability: 2.3.0
-- has to be here because need ST_StartPoint
CREATE OR REPLACE FUNCTION ST_Angle(line1 geometry, line2 geometry)
	RETURNS float8 AS 'SELECT ST_Angle(St_StartPoint($1), ST_EndPoint($1), St_StartPoint($2), ST_EndPoint($2))'
	LANGUAGE 'sql' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- make views and spatial_ref_sys public viewable --
GRANT SELECT ON TABLE geography_columns TO public;
GRANT SELECT ON TABLE geometry_columns TO public;
GRANT SELECT ON TABLE spatial_ref_sys TO public;

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION ST_3DLineInterpolatePoint(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-3', 'ST_3DLineInterpolatePoint'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 50;

-- moved to separate file cause its involved


-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- SP-GiST 2D Support Functions
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_config_2d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_config_2d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_choose_2d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_choose_2d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_picksplit_2d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_picksplit_2d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_inner_consistent_2d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_inner_consistent_2d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_leaf_consistent_2d(internal, internal)
	RETURNS bool
	AS '$libdir/postgis-3' ,'gserialized_spgist_leaf_consistent_2d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_compress_2d(internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_spgist_compress_2d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OPERATOR CLASS spgist_geometry_ops_2d
	DEFAULT FOR TYPE geometry USING SPGIST AS
	OPERATOR        1        <<  ,
	OPERATOR        2        &<	 ,
	OPERATOR        3        &&  ,
	OPERATOR        4        &>	 ,
	OPERATOR        5        >>	 ,
	OPERATOR        6        ~=	 ,
	OPERATOR        7        ~	 ,
	OPERATOR        8        @	 ,
	OPERATOR        9        &<| ,
	OPERATOR        10       <<| ,
	OPERATOR        11       |>> ,
	OPERATOR        12       |&> ,
	FUNCTION		1		geometry_spgist_config_2d(internal, internal),
	FUNCTION		2		geometry_spgist_choose_2d(internal, internal),
	FUNCTION		3		geometry_spgist_picksplit_2d(internal, internal),
	FUNCTION		4		geometry_spgist_inner_consistent_2d(internal, internal),
	FUNCTION		5		geometry_spgist_leaf_consistent_2d(internal, internal),
	FUNCTION		6		geometry_spgist_compress_2d(internal);

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- 3-D GEOMETRY Operators
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_overlaps_3d(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_overlaps_3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_contains_3d(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_contains_3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_contained_3d(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_contained_3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_same_3d(geom1 geometry, geom2 geometry)
	RETURNS boolean
	AS '$libdir/postgis-3' ,'gserialized_same_3d'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OPERATOR &/& (
	PROCEDURE = geometry_overlaps_3d,
	LEFTARG = geometry, RIGHTARG = geometry,
	COMMUTATOR = &/&,
	RESTRICT = gserialized_gist_sel_nd, JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 2.5.0
CREATE OPERATOR @>> (
	PROCEDURE = geometry_contains_3d,
	LEFTARG = geometry, RIGHTARG = geometry,
	COMMUTATOR = <<@,
	RESTRICT = gserialized_gist_sel_nd, JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 2.5.0
CREATE OPERATOR <<@ (
	PROCEDURE = geometry_contained_3d,
	LEFTARG = geometry, RIGHTARG = geometry,
	COMMUTATOR = @>>,
	RESTRICT = gserialized_gist_sel_nd, JOIN = gserialized_gist_joinsel_nd
);

-- Availability: 2.5.0
CREATE OPERATOR ~== (
	PROCEDURE = geometry_same_3d,
	LEFTARG = geometry, RIGHTARG = geometry,
	COMMUTATOR = ~==,
	RESTRICT = gserialized_gist_sel_nd, JOIN = gserialized_gist_joinsel_nd
);

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- SP-GiST 3D Support Functions
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_config_3d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3', 'gserialized_spgist_config_3d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_choose_3d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3', 'gserialized_spgist_choose_3d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_picksplit_3d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3', 'gserialized_spgist_picksplit_3d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_inner_consistent_3d(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3', 'gserialized_spgist_inner_consistent_3d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_leaf_consistent_3d(internal, internal)
	RETURNS bool
	AS '$libdir/postgis-3', 'gserialized_spgist_leaf_consistent_3d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 2.5.0
CREATE OR REPLACE FUNCTION geometry_spgist_compress_3d(internal)
	RETURNS internal
	AS '$libdir/postgis-3', 'gserialized_spgist_compress_3d'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 2.5.0
CREATE OPERATOR CLASS spgist_geometry_ops_3d
	FOR TYPE geometry USING SPGIST AS
	OPERATOR        3        &/&	,
	OPERATOR        6        ~==	,
	OPERATOR        7        @>>	,
	OPERATOR        8        <<@	,
	FUNCTION	1	geometry_spgist_config_3d(internal, internal),
	FUNCTION	2	geometry_spgist_choose_3d(internal, internal),
	FUNCTION	3	geometry_spgist_picksplit_3d(internal, internal),
	FUNCTION	4	geometry_spgist_inner_consistent_3d(internal, internal),
	FUNCTION	5	geometry_spgist_leaf_consistent_3d(internal, internal),
	FUNCTION	6	geometry_spgist_compress_3d(internal);

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- SP-GiST ND Support Functions
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Geometry
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_spgist_config_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_config_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_spgist_choose_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_choose_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_spgist_picksplit_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_picksplit_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_spgist_inner_consistent_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_inner_consistent_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_spgist_leaf_consistent_nd(internal, internal)
	RETURNS bool
	AS '$libdir/postgis-3' ,'gserialized_spgist_leaf_consistent_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geometry_spgist_compress_nd(internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_spgist_compress_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.0.0
CREATE OPERATOR CLASS spgist_geometry_ops_nd
	FOR TYPE geometry USING SPGIST AS
	OPERATOR        3        &&& ,
	OPERATOR        6        ~~=	,
	OPERATOR        7        ~~	,
	OPERATOR        8       @@ 	,
	FUNCTION		1		geometry_spgist_config_nd(internal, internal),
	FUNCTION		2		geometry_spgist_choose_nd(internal, internal),
	FUNCTION		3		geometry_spgist_picksplit_nd(internal, internal),
	FUNCTION		4		geometry_spgist_inner_consistent_nd(internal, internal),
	FUNCTION		5		geometry_spgist_leaf_consistent_nd(internal, internal),
	FUNCTION		6		geometry_spgist_compress_nd(internal);

-- ---------- ---------- ---------- ---------- ---------- ---------- ----------
-- Geography
-- ---------- ---------- ---------- ---------- ---------- ---------- ----------

-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geography_spgist_config_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_config_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geography_spgist_choose_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_choose_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geography_spgist_picksplit_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_picksplit_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geography_spgist_inner_consistent_nd(internal, internal)
	RETURNS void
	AS '$libdir/postgis-3' ,'gserialized_spgist_inner_consistent_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geography_spgist_leaf_consistent_nd(internal, internal)
	RETURNS bool
	AS '$libdir/postgis-3' ,'gserialized_spgist_leaf_consistent_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;
-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION geography_spgist_compress_nd(internal)
	RETURNS internal
	AS '$libdir/postgis-3' ,'gserialized_spgist_compress_nd'
	LANGUAGE C IMMUTABLE STRICT PARALLEL SAFE;

-- Availability: 3.0.0
CREATE OPERATOR CLASS spgist_geography_ops_nd
	DEFAULT FOR TYPE geography USING SPGIST AS
	OPERATOR        3        && ,
--	OPERATOR        6        ~=	,
--	OPERATOR        7        ~	,
--	OPERATOR        8        @	,
	FUNCTION		1		geography_spgist_config_nd(internal, internal),
	FUNCTION		2		geography_spgist_choose_nd(internal, internal),
	FUNCTION		3		geography_spgist_picksplit_nd(internal, internal),
	FUNCTION		4		geography_spgist_inner_consistent_nd(internal, internal),
	FUNCTION		5		geography_spgist_leaf_consistent_nd(internal, internal),
	FUNCTION		6		geography_spgist_compress_nd(internal);

CREATE OR REPLACE FUNCTION ST_Letters(letters text, font json DEFAULT NULL)
RETURNS geometry
AS
$$
DECLARE
  letterarray text[];
  letter text;
  geom geometry;
  prevgeom geometry = NULL;
  adjustment float8 = 0.0;
  position float8 = 0.0;
  text_height float8 = 100.0;
  width float8;
  m_width float8;
  spacing float8;
  dist float8;
  wordarr geometry[];
  wordgeom geometry;
  -- geometry has been run through replace(encode(st_astwkb(geom),'base64'), E'\n', '')
  font_default_height float8 = 1000.0;
  font_default json = '{
  "!":"BgACAQhUrgsTFOQCABQAExELiwi5AgAJiggBYQmJCgAOAg4CDAIOBAoEDAYKBgoGCggICAgICAgGCgYKBgoGCgQMBAoECgQMAgoADAIKAAoADAEKAAwBCgMKAQwDCgMKAwoFCAUKBwgHBgcIBwYJBgkECwYJBAsCDQILAg0CDQANAQ0BCwELAwsDCwUJBQkFCQcHBwcHBwcFCQUJBQkFCQMLAwkDCQMLAQkACwEJAAkACwIJAAsCCQQJAgsECQQJBAkGBwYJCAcIBQgHCAUKBQoDDAUKAQwDDgEMAQ4BDg==",
  "&":"BgABAskBygP+BowEAACZAmcAANsCAw0FDwUNBQ0FDQcLBw0HCwcLCQsJCwkLCQkJCwsJCwkLCQ0HCwcNBw8HDQUPBQ8DDwMRAw8DEQERAREBEQERABcAFQIXAhUCEwQVBBMGEwYTBhEIEQgPChEKDwoPDA0MDQwNDgsOCRAJEAkQBxAHEgUSBRQFFAMUAxQBFgEWARgAigEAFAISABICEgQQAhAEEAQQBg4GEAoOCg4MDg4ODgwSDgsMCwoJDAcMBwwFDgUMAw4DDgEOARABDgEQARIBEAASAHgAIAQeBB4GHAgaChoMGA4WDhYQFBISEhISDhQQFAwWDBYKFgoYBhgIGAQYBBgCGgAaABgBGAMYAxYHFgUWCRYJFAsUCxIPEg0SERARDhMOFQwVDBcIGQYbBhsCHQIfAR+dAgAADAAKAQoBCgEIAwgFBgUGBQYHBAUEBwQHAgcCBwIHAAcABwAHAQcBBwMHAwUDBwUFBQUHBQUBBwMJAQkBCQAJAJcBAAUCBQAFAgUEBQIDBAUEAwQDBgMEAQYDBgEGAAgBBgAKSeECAJ8BFi84HUQDQCAAmAKNAQAvExMx",
  "\"":"BgACAQUmwguEAgAAkwSDAgAAlAQBBfACAIACAACTBP8BAACUBA==",
  "''":"BgABAQUmwguEAgAAkwSDAgAAlAQ=",
  "(":"BgABAUOQBNwLDScNKw0rCysLLwsxCTEJMwc1BzcHNwM7AzsDPwE/AEEANwI1AjMEMwIzBjEGLwYvCC0ILQgrCCkKKQonCicMJbkCAAkqCSoHLAksBywFLgcuBS4FMAMwAzADMgEwATQBMgA0ADwCOgI6BDoEOAY4BjYINgg2CjQKMgoyCjIMMAwwDi7AAgA=",
  ")":"BgABAUMQ3Au6AgAOLQwvDC8KMQoxCjEKMwg1CDUGNQY3BDcEOQI5AjkAOwAzATEBMQExAy8DLwMvBS8FLQctBS0HKwktBykJKwkpswIADCYKKAooCioIKggsCC4ILgYwBjAGMgQ0AjQCNAI2ADgAQgFAAz4DPAM8BzgHOAc2CTQJMgsyCzALLg0sDSoNKg==",
  "+":"BgABAQ3IBOwGALcBuAEAANUBtwEAALcB0wEAALgBtwEAANYBuAEAALgB1AEA",
  "/":"BgABAQVCAoIDwAuyAgCFA78LrQIA",
  "4":"BgABAhDkBr4EkgEAEREApwJ/AADxARIR5QIAEhIA9AHdAwAA7ALIA9AG6gIAEREA8QYFqwIAAIIDwwH/AgABxAEA",
  "v":"BgABASDmA5AEPu4CROwBExb6AgAZFdMC0wgUFaECABIU0wLWCBcW+AIAExVE6wEEFQQXBBUEFwQVBBUEFwQVBBUEFwQVBBUEFwQXBBUEFwYA",
  ",":"BgABAWMYpAEADgIOAgwCDgQMBAoGDAYKBgoICAgICAgICAoGCgYKBAoEDAQKBAoCDAIKAgwCCgAKAAwACgEMAQoBCgMMAwoDCgUKBQgFCgUIBwYJCAcGCQYJBAsGCQQLAg0CCwINAg0AAwABAAMAAwADAQMAAwADAAMBBQAFAQcBBwEHAwcBCQMJAQsDCwMLAw0FDQMNBQ8FDwURBxMFEwkTBxcJFwkXswEAIMgBCQYJBgkGBwYJCAcIBQgHCgUKBQoFDAEMAwwBDgEOABA=",
  "-":"BgABAQUq0AMArALEBAAAqwLDBAA=",
  ".":"BgABAWFOrAEADgIOAg4CDgQMBAoGDAYKBgoICAgKCAgIBgoGCgYKBgoEDAQKBAwECgIMAAwCDAAMAAwBCgAMAQoDDAMKAwoDCgUKBQgFCgUIBwgJBgcICQYJBgsGCQQLAg0CDQINAA0ADQENAQ0BCwMNAwkFCwUJBQkHBwcJBwUHBwkFCQUJBQkDCwMJAwsDCQELAAsBCwALAAsCCQALAgkECwQJBAkECQYJBgcGBwgJBgcKBQgHCgUKBQwFCgEOAwwBDgEOAA4=",
  "0":"BgABAoMB+APaCxwAHAEaARoDFgMYBRYFFAcUBxIJEgkQCRALEAsOCwwNDA0MDQoPCg0IDwgPBhEGDwYRBA8EEQIRAhMCEQITABMA4QUAEQETAREBEQMRAxEFEQURBREHDwkPBw8JDwsNCw0LDQ0NDQsNCw8JEQkRCREJEwcTBxUFFQUVAxUDFwEXARkAGQAZAhcCFwQXBBUGEwYTCBMIEQoRCg8KDwoPDA0MDQ4NDgsOCQ4JEAkQBxAHEAUSBRIDEgMSAxIDEgESARQAEgDiBQASAhQCEgISBBIEEgYSBhIGEggQChAIEAoQDBAMDgwODg4ODA4MEgwQChIKEggUCBQIFgYWBBYGGAQYAhgCGgILZIcDHTZBEkMRHTUA4QUeOUITRBIePADiBQ==",
  "2":"BgABAWpUwALUA44GAAoBCAEKAQgDBgMGBQYFBgUEBwQFBAUCBwIHAgUABwAHAAUBBwMFAQcFBQMHBQUHBQcFBwMJAwkBCQELAQsAC68CAAAUAhIAFAISBBQCEgQUBBIEEgYUCBIGEAgSChAKEAoQDBAMDg4ODgwQDBIMEgoSChQIFggWCBgGGAQaAhwCHAIWABQBFgEUARQDFAMSAxQFEgUSBxIHEAkQCRALDgsODQ4NDA8KDwwRCBMKEwgTBhUGFwQXBBcEGwAbABsAHQEftwPJBdIDAACpAhIPzwYAFBIArgI=",
  "1":"BgABARCsBLALAJ0LEhERADcA2QEANwATABQSAOYIpwEAALgCERKEBAASABER",
  "3":"BgABAZ0B/gbEC/sB0QQOAwwBDAMMAwwFCgMKBQoFCgUIBwoFCAcICQgJBgkICQYLCAsECwYLBA0GDwINBA8CDwQRAhECEQITABUCFQAVAH0AEQETAREBEQETAxEDEQURBREFDwcRBw8JDwkNCQ8LDQsNDQsNCw0LDwsPCREJEQcRBxMFFQUVBRUDFwEXARkAGQAZAhkCFwQVBBUEEwYTCBEIEQgRCg0MDwoNDA0OCw4LDgkQCRAHEAkQBRAFEgUSAxIDFAMSAxYBFAEWARYAFqQCAAALAgkCCQQHAgcGBwYHBgUIBQYDCAMIAwYDCAEIAQgACAAIAAgCCAIIAgYCCAQIBAgGBgYEBgQIBAoCCgAKAAwAvAEABgEIAAYBBgMGAwQDBgMEBQQDBAUCBQQFAgUABwIFAJkBAACmAaIB3ALbAgAREQDmAhIRggYA",
  "5":"BgABAaAB0APgBxIAFAESABIBEgMSARADEgMQAxIFEAcOBRAHDgkOCQ4JDgsMCwwLCgsKDQoPCA0IDwgPBhEEEwYTAhMEFwIXABcAiQIAEwETABEBEQMTAxEDDwMRBQ8FDwUPBw8JDQcNCQ0LDQsLCwsNCw0JDwkPCREHEQcTBxMFEwMVAxcDGQEZARkAFwAVAhUCFQQTBBMGEwYRCBEIDwoPCg8KDQwNDA0MCw4LDgkOCRAJEAcOBxAHEgUQBRIDEAMSAxIBEgEUARIAFLgCAAAFAgUABQIFBAUCBQQDBAUEAwYDBgMIAwgBCAEIAQoACAAIAgYACAQGAgQEBgQEBAQGBAQCBgIGAgYCBgIIAAYA4AEABgEIAAYBBgMGAQQDBgMEAwQFBAMCBQQFAgUABwIFAPkBAG+OAQCCBRESAgAAAuYFABMRAK8CjQMAAJ8BNgA=",
  "7":"BgABAQrQBsILhQOvCxQR7wIAEhK+AvYIiwMAAKgCERKwBgA=",
  "6":"BgABAsYBnAOqBxgGFgYYBBYEFgIWABQBFgEUAxQDFAUUBRIFEAcSCRAJEAkOCw4NDgsMDQoPCg8KDwgRCBEGEQYRBBMCEwITAhUAkwIBAAERAREBEQEPAxEFEQMPBREFDwcPBw8HDwkNCQ0LDQsNCwsNCw0LDQkPCQ8JDwcRBxEHEwUTAxMFFQEXAxcBGQAVABUCEwIVBBMEEQYTBhEIEQgPChEKDQoPDA0MDQwNDgsOCxALDgkQCRAHEgcQBxIFEgUSBRIBFAMSARIBFAASAOIFABACEgIQAhIEEAQQBhIGEAYQCBAKEAgOChAMDgwMDA4ODA4MDgwODBAKEAoQChIIEggSBhQGFgYUAhYCGAIYABoAGAEYARYBFgMUBRQFEgUSBxAHEAcQCQ4LDgkMCwwNDA0KDQgPCg0GEQgPBhEEEQQRBBMEEwITAhMCFQIVABWrAgAACgEIAQoBCAEGAwYDBgUGBQQFBAUEBQQFAgUABwIFAAUABwEFAAUBBQMFAwUDBQMFBQMFAwUBBQEHAQkBBwAJAJcBDUbpBDASFi4A4AETLC8SBQAvERUrAN8BFC0yEQQA",
  "8":"BgABA9gB6gPYCxYAFAEUARYBEgMUBRQFEgUSBxIHEAcSCQ4JEAkOCw4LDgsMDQwNCg0KDQoPCg8IDwgPBhEGEQQPBBMCEQIRABMAQwAxAA8BEQEPAREDDwMRAw8FEQUPBxEJDwkPCQ8NDw0PDQ8IBwYHCAcGBwgHBgkGBwYJBgcECQYJBAkGCQQJBAsECwQLBA0CCwINAg8CDwIPAA8AaQATAREBEwERAxEFEQURBREHEQcPBw8JDwkPCw8LDQsNDQ0LCw0LDwsNCQ8JDwcPBw8HEQURAxEFEQMRARMBEwFDABEAEwIRAhEEEQQRBg8GEQgPCA8KDwoPCg0MDQwNDAsOCw4LDgkQCRAJDgkQBxIHEAcSBRADEgMUAxIBFAEUABQAagAOAhAADgIOAg4EDAIOBAwEDAQMBgwECgYMBAoGCAYKBgoGCggKBgoICgYICAoICA0MCwwLDgsOCRAHEAcQBxIFEgUSAxIDEgMSARABEgASADIARAASAhICEgQSAhIGEAYSBhAIEAgQCBAKDgoODA4MDgwMDgwODA4KEAwQCBIKEggSCBQIFAYUBBQEFgQWAhYCGAANT78EFis0EwYANBIYLgC0ARcsMRQFADERGS0AswELogHtAhcuNxA3DRkvALMBGjE6ETYSGDIAtAE=",
  "9":"BgABAsYBpASeBBcFFQUXAxUDFQEVABMCFQITBBMEEwYRBhMGDwgRCg8KDwoNDA0OCwwNDgkQCRAJEAcSBxIFEgUSAxQBFAEUARYAlAICAAISAhICEgQSAhAGEgQQBhIGEAgSCA4IEAoOChAMDAwODAwODA4MEAoOChAKEAgSCBIIFAYUBBQGFgIYBBgCGgAWABYBFAEWAxQDEgUUBRIHEgcQCRIJEAkOCw4LDgsODQwNDA0MDwoPCg8IDwgRCBEGEQYRBhEEEQITAhECEwARAOEFAA8BEQEPAREDDwMPBREFDwUPBw8JDwcNCQ8LDQsLCw0NCw0LDQsNCw8JEQkPCREHEQcTBRMFEwUTARUBFQEXABkAFwIXAhcCFQQTBhMGEQYRCA8IDwgNCg8MCwoLDAsOCQ4JDgkQBxAHEAUQBRIFEgMSAxQDFAEUAxQAFgEWABamAgAACwIJAgkCCQIHBAcEBwYFBgUGAwYDBgMGAQgBBgEIAAgABgIIAgYCBgQGBAYEBgYGBgQIBAgECAIKAgoCCgAMAJgBDUXqBC8RFS0A3wEUKzARBgAwEhYsAOABEy4xEgMA",
  ":":"BgACAWE0rAEADgIOAg4CDgQMBAoGDAYKBgoICAgKCAgIBgoGCgYKBgoEDAQKBAwECgIMAAwCDAAMAAwBCgAMAQoDDAMKAwoDCgUKBQgFCgUIBwgJBgcICQYJBgsGCQQLAg0CDQINAA0ADQENAQ0BCwMNAwkFCwUJBQkHBwcJBwUHBwkFCQUJBQkDCwMJAwsDCQELAAsBCwALAAsCCQALAgkECwQJBAkECQYJBgcGBwgJBgcKBQgHCgUKBQwFCgEOAwwBDgEOAA4BYQDqBAAOAg4CDgIOBAwECgYMBgoGCggICAoICAgGCgYKBgoGCgQMBAoEDAQKAgwADAIMAAwADAEKAAwBCgMMAwoDCgMKBQoFCAUKBQgHCAkGBwgJBgkGCwYJBAsCDQINAg0ADQANAQ0BDQELAw0DCQULBQkFCQcHBwkHBQcHCQUJBQkFCQMLAwkDCwEJAwsACwELAAsACwIJAAsECQILBAkECQQJBgkGBwYHCAkGBwoFCAcKBQoFDAUKAQ4DDAEOAQ4ADg==",
  "x":"BgABARHmAoAJMIMBNLUBNrYBMIQB1AIA9QG/BI4CvwTVAgA5hgFBwAFFxwE1fdUCAI4CwATzAcAE1AIA",
  ";":"BgACAWEslgYADgIOAg4CDgQMBAoGDAYKBgoICAgKCAgIBgoGCgYKBgoEDAQKBAwECgIMAAwCDAAMAAwBCgAMAQoDDAMKAwoDCgUKBQgFCgUIBwgJBgcICQYJBgsGCQQLAg0CDQINAA0ADQENAQ0BCwMNAwkFCwUJBQkHBwcJBwUHBwkFCQUJBQkDCwMJAwsBCQMLAAsBCwALAAsCCQALBAkCCwQJBAkECQYJBgcGBwgJBgcKBQgHCgUKBQwFCgEOAwwBDgEOAA4BYwjxBAAOAg4CDAIOBAwECgYMBgoGCggICAgICAgICgYKBgoECgQMBAoECgIMAgoCDAIKAAoADAAKAQwBCgEKAwwDCgMKBQoFCAUKBQgHBgkIBwYJBgkECwYJBAsCDQILAg0CDQADAAEAAwADAAMBAwADAAMAAwEFAAUBBwEHAQcDBwEJAwkBCwMLAwsDDQUNAw0FDwUPBREHEwUTCRMHFwkXCRezAQAgyAEJBgkGCQYHBgkIBwgFCAcKBQoFCgUMAQwDDAEOAQ4AEA==",
  "=":"BgACAQUawAUA5gHEBAAA5QHDBAABBQC5AgDsAcQEAADrAcMEAA==",
  "B":"BgABA2e2BMQLFgAUARQBFAEUAxIDEgUSBRIFEAcQBxAJDgkOCQ4LDgsMCwwNDA0KDQgNCg0IDwYPBg8GDwQRBBEEEQIRAhMAEwAHAAkABwEHAAkBCQAHAQkBCQEHAQkBCQMJAwcDCQMJAwkFBwUJAwkHCQUHBQkHCQcJBwcHBwkHBwcJBwsHCQUQBQ4FDgcOCQ4JDAkMCwoNCg0IDwgRBhMEFQQXAhcCGwDJAQEvAysFJwklDSMPHREbFRkXFRsTHw8fCyUJJwcrAy0B6wMAEhIAoAsREuYDAAiRAYEElgEAKioSSA1EOR6JAQAA0wEJkAGPBSwSEiwAzAETKikSjwEAAMUCkAEA",
  "A":"BgABAg/KBfIBqQIAN98BEhHzAgAWEuwCngsREvwCABMR8gKdCxIR8QIAFBI54AEFlwGCBk3TA6ABAE3UAwMA",
  "?":"BgACAe4BsgaYCAAZABkBFwEXBRUDEwUTBxEHEQcPCQ8JDQkNCQ0LCwsLCwsLCQsJCwcNBwsHDQcLBQsFDQULAwkFCwMLAwkDCQMBAAABAQABAAEBAQABAAEAAQABAAABAQAAAQEAEwcBAQABAAMBAwADAAUABQAFAAcABwAFAAcABwAFAgcABQAHAAUAW7cCAABcABgBFgAUAhQAFAISAhACEAIQBA4EDgQMBgwGDAYMBgoICgYKCAgKCggICAgKBgoICgYMCAwGDAgOBg4GEAYQBgIAAgIEAAICBAACAgQCBAIKBAoGCAQKBggIBgYICAYIBggGCgQIBAoECAQKAggCCgIKAAgACgAKAAgBCAEKAwgDCAMIAwgFBgMIBQYHBAUGBQQFBAcCBQQHAgcCCQIHAgkCBwAJAgkACQAJAAkBCQAJAQsACQELAQsDCwELAwsDCwMLAwsDCwULAwsFCwMLBV2YAgYECAQKBAwGDAQMBhAIEAYSBhIIEgYUBhIEFgYUBBYEFgQWAhgCFgIYABYAGAAYARgBGAMWBRYHFgcWCRYLFA0IBQYDCAUIBwYFCAcGBwgHBgcICQYJCAkGCQYJCAsGCwYLBgsGDQYNBA0GDQQNBA8EDwQPAg8EEQIRAhEAEQITAWGpBesGAA4CDgIOAg4EDAQKBgwGCgYKCAgICggICAYKBgoGCgYKBAwECgQMBAoCDAAMAgwADAAMAQoADAEKAwwDCgMKAwoFCgUIBQoFCAcICQYHCAkGCQYLBgkECwINAg0CDQANAA0BDQENAQsDDQMJBQsFCQUJBwcHCQcFBwcJBQkFCQUJAwsDCQMLAwkBCwALAQsACwALAgkACwIJBAsECQQJBAkGCQYHBgcICQYHCgUIBwoFCgUMBQoBDgMMAQ4BDgAO",
  "C":"BgABAWmmA4ADAAUCBQAFAgUEBQIDBAUEAwQDBgMEAQYDBgEGAAgBBgDWAgAAwQLVAgATABMCEQITBBEEEQQRBhEIEQgPCA8KDwoNCg0MDQwNDAsOCw4LDgkOCxAHEAkQBxIHEgUSBRIDEgEUARIBFAAUAMIFABQCFAISBBQEEgQSBhIIEggSCBAKEAoQCg4MDgwODA4ODA4MDgwQDA4KEggQChIIEggSBhIGFAQSAhQCEgIUAMYCAADBAsUCAAUABwEFAAUBBQMDAQUDAwMDAwMFAQMDBQEFAAUBBwAFAMEF",
  "L":"BgABAQmcBhISEdkFABIQALQLwgIAAIEJ9AIAAK8C",
  "D":"BgABAkeyBMQLFAAUARIBFAESAxIDEgMSBRIFEAcQBxAHDgkOCQ4LDgsMCwwNDA0KDwoPCg8IDwgRCBEGEwQTBBMEEwIVAhUAFwDBBQAXARcBFwMTAxUDEwUTBxEHEQcPCQ8JDwkNCw0LCwsLDQsNCQ0JDQcPBw8HDwcRBREFEQMRAxEDEwERARMBEwDfAwASEgCgCxES4AMACT6BAxEuKxKLAQAAvwaMAQAsEhIsAMIF",
  "F":"BgABARGABoIJ2QIAAIECsgIAEhIA4QIRErECAACvBBIR5QIAEhIAsgucBQASEgDlAhES",
  "E":"BgABARRkxAuWBQAQEgDlAhES0QIAAP0BtgIAEhIA5wIRFLUCAAD/AfACABISAOUCERLDBQASEgCyCw==",
  "G":"BgABAZsBjgeIAgMNBQ8FDQUNBQ0HCwcNBwsHCwkLCQsJCwsJCwsLCQsJDQkLBw0HDwcNBw8FDwUPAw8DEQMPAxEBEQERARMBEQAXABUCFwIVAhMEFQQTBhMGEwYRCBEIDwoRCg8KDwwNDA0MDQ4LDgkQCRAJEAcQBxIFEgUUBRQDFAMUARYBFgEYAMoFABQCFAASBBQCEgQSBBIEEgYSBhAGEAgQCBAKDgoOCg4MDgwMDgwOChAKEAoSCBIIFAgUBhQEGAYWAhgEGAIaAOoCAAC3AukCAAcABwEFAQUBBQMFAwMFAwUDBQEFAQcBBQEFAQUABwAFAMUFAAUCBwIFAgUCBQQFBAMGBQYDBgUGAwgDBgMIAQgDCAEIAQoBCAEIAAgACgAIAAgCCAIIAggECgQGBAgECAYIBgC6AnEAAJwCmAMAAJcF",
  "H":"BgABARbSB7ILAQAAnwsSEeUCABISAOAE5QEAAN8EEhHlAgASEgCiCxEQ5gIAEREA/QPmAQAAgAQPEOYCABER",
  "I":"BgABAQmuA7ILAJ8LFBHtAgAUEgCgCxMS7gIAExE=",
  "J":"BgABAWuqB7ILALEIABEBEwERAREDEwMRAxEFEQURBw8HEQcPCQ0LDwsNCw0NDQ0LDwsPCxEJEQkTCRMJFQcVBxcFFwMZAxsBGwEbAB8AHQIbAhsEGQYXBhcGFQgTCBMKEwoRDA8KDwwNDA0OCw4LDgkQCRAJEAcQBRIFEgUSAxQDEgESARIBFAESABIAgAEREtoCABERAn8ACQIHBAcEBwYHBgUIBQoDCgMKAwoDDAEKAQwBCgEMAAwACgAMAgoCDAIKBAoECgYKBggGBgYGCAQGBAgCCgAIALIIERLmAgAREQ==",
  "M":"BgACAQRm1gsUABMAAAABE5wIAQDBCxIR5QIAEhIA6gIK5gLVAe0B1wHuAQztAgDhAhIR5QIAEhIAxAsUAPoDtwT4A7YEFgA=",
  "K":"BgABAVXMCRoLBQsDCQMLAwsDCwMLAwsBCwELAQsBCwELAQ0ACwELAAsADQALAg0ACwILAA0CCwILAgsCDQQLBAsECwYNBAsGCwYLCAsGCwgJCgsICQoJCgkMCQwJDAkOCRALEAkQCRKZAdICUQAAiwQSEecCABQSAKALExLoAgAREQC3BEIA+AG4BAEAERKCAwAREdkCzQXGAYUDCA0KDQgJCgkMBwoFDAUMAQwBDgAMAg4CDAQOBAwGDghmlQI=",
  "O":"BgABAoMBsATaCxwAHAEaARoDGgMYBRYFFgcWBxQJEgkSCRILEAsODQ4NDg0MDwoNDA8KDwgPCBEIDwYRBg8GEQQRAhMCEQITABMA0QUAEQETAREBEQMTBREFEQURBxEHDwcRCQ8LDQsPCw0NDQ0NDwsPCw8LEQkTCRMJEwkVBxUHFwUXAxkDGQEbARsAGwAZAhkCGQQXBhcGFQYVCBUIEwoRChEMEQoRDA8MDQ4NDg0OCxAJEAsQCRAHEgcSBxIFFAMSAxIDEgEUARIAEgDSBQASAhQCEgISBBIEEgYSBhIIEggQCBAKEgwODBAMEA4ODg4QDhIMEAwSChQKFAgUCBYIFgYYBBoGGgQcAh4CHgILggGLAylCWxZbFSlBANEFKklcGVwYKkwA0gU=",
  "N":"BgABAQ+YA/oEAOUEEhHVAgASEgC+CxQAwATnBQDIBRMS2AIAExEAzQsRAL8ElgU=",
  "P":"BgABAkqoB5AGABcBFQEVAxMDEwMTBREHEQcRBw8JDwkNCQ0LDQsNCwsNCw0JDQkNCQ8HDwcPBxEFEQURAxEDEQMTAREBEwETAH8AAIMDEhHlAgASEgCgCxES1AMAFAAUARIAFAESAxIDEgMSAxIFEAUQBRAHDgkOCQ4JDgsMCwwNDA0KDQoNCg8IDwgRCBEGEwQTBBUEFQIXAhkAGQCzAgnBAsoCESwrEn8AANUDgAEALBISLgDYAg==",
  "R":"BgABAj9msgsREvYDABQAFAESARQBEgESAxIDEgUSBRAFEAcQBw4JDgkOCQ4LDAsMDQwLCg0KDwoNCA8IDwgPBhEEEwYTAhMEFQIXABcAowIAEwEVARMDEwMTBRMFEQcTBxELEQsRDQ8PDREPEQ0VC8QB/QMSEfkCABQSiQGyA3EAALEDFBHnAgASEgCgCwnCAscFogEALhISLACqAhEsLRKhAQAApQM=",
  "Q":"BgABA4YBvAniAbkB8wGZAYABBQUFAwUFBQUHBQUDBwUFBQcFBQMHBQcDBwUJAwcDCQMJAwkDCQMJAQsDCwMLAQsDCwENAw0BDQEPAA8BDwAPABsAGwIZAhcEGQQXBBUGFQgVCBMIEQoTChEKDwwPDA8ODQ4NDgsQCxAJEAkQBxIHEgUSBRQFFAMUARQDFAEWABYAxgUAEgIUAhICEgQSBBIGEgYSCBIIEAgQChIMDgwQDBAODg4OEA4SDBAMEgoUChQIFAgWCBYGGAQaBhoEHAIeAh4CHAAcARoBGgMaAxgFFgUWBxYHFAkSCRIJEgsQCw4NDg0ODQwPCg0MDwoPCA8IEQgPBhEGDwYRBBECEwIRAhMAEwC7BdgBrwEImQSyAwC6AylAWxZbFSk/AP0BjAK7AQeLAoMCGEc4J0wHVBbvAaYBAEM=",
  "S":"BgABAYMC8gOEBxIFEgUQBxIFEgcSBxIJEgcSCRIJEAkQCRALEAsOCw4NDg0MDQ4PDA0KEQoPChEKEQgRCBMGFQQTBBcCFQAXABkBEwARAREBEQMPAQ8DDwMPAw0DDQUNAw0FCwULBwsFCwUJBwsFCQcHBQkHCQUHBwcHBwUHBwUFBQcHBwUHAwcFEQsRCxMJEwkTBxMFEwUVBRUDFQMVARMBFwEVABUAFQIVAhUCFQQVBBUEEwYVBhMIEwgTCBMIEwgRCBMKEQgRCmK6AgwFDgUMAw4FEAUOBRAFEAUQBRAFEAMSAw4DEAMQAxABEAEOAQ4AEAIMAg4CDgQMBAwGCggKCAoKBgwGDgYQBBACCgAMAAoBCAMKBQgFCAcIBwgJCAsGCQgLCA0IDQgNCA8IDQgPCA8IDwgPChEIDwgPCBEKDwoPDBEMDwwPDg8ODw4NEA0QCxALEgsSCRIHEgcUBRQFGAUYAxgBGgEcAR4CJAYkBiAIIAweDBwQHBAYEhgUFBYUFhQWEBoQGg4aDBwKHAoeBh4GIAQgAiACIgEiASIFIgUiBSAJIgkgCyINZ58CBwQJAgkECwQLAgsECwINBA0CDQQNAg0CDQALAg0ADQANAAsBCwELAQsDCwULBQkFCQcHBwcJBwkFCwMLAw0BDQENAAsCCwQLBAkGCQgJCAkKBwoJCgcMBQoHDAcMBQwF",
  "V":"BgABARG2BM4DXrYEbKwDERL0AgAVEesCnQsSEfsCABQS8QKeCxES8gIAExFuqwNgtQQEAA==",
  "T":"BgABAQskxAv0BgAAtQKVAgAA+wgSEeUCABISAPwImwIAALYC",
  "U":"BgABAW76B7ALAKMIABcBFwMXARUFFQUTBxMHEwkRCREJEQsPDQ0LDw0NDwsPCw8LEQkPCRMJEQcTBxMFEwUVBRUDEwMXARUBFQEXABUAEwIVAhMCFQQTBBUEEwYTBhMIEwgRChEIEQwRDA8MDw4PDg0OCxANEAsSCRIJEgcUBxQHFAMWBRYBGAEYARgApggBAREU9AIAExMAAgClCAALAgkECQQHBAcIBwgHCAUKBQoDCgMKAwwBCgEMAQwADAAMAgoCDAIKAgoECgQKBggGCAYICAYKBAgCCgIMAgwApggAARMU9AIAExM=",
  "X":"BgABARmsCBISEYkDABQSS54BWYICXYkCRZUBEhGJAwAUEtYCzgXVAtIFExKIAwATEVClAVj3AVb0AVKqAREShgMAERHXAtEF2ALNBQ==",
  "W":"BgABARuODcQLERHpAp8LFBHlAgASEnW8A2+7AxIR6wIAFBKNA6ALERKSAwATEdQB7wZigARZ8AIREugCAA8RaKsDYsMDXsoDaqYDExLqAgA=",
  "Y":"BgABARK4BcQLhgMAERHnAvMGAKsEEhHnAgAUEgCsBOkC9AYREoYDABERWOEBUJsCUqICVtwBERI=",
  "Z":"BgABAQmAB8QLnwOBCaADAADBAusGAMgDggmhAwAAwgLGBgA=",
  "`":"BgABAQfqAd4JkQHmAQAOlgJCiAGpAgALiwIA",
  "c":"BgABAW3UA84GBQAFAQUABQEFAwMBBQMDAwMDAwUBAwMFAQUABQEHAAUAnQMABQIFAAUCBQQFAgMEBQQDBAMGAwQBBgMGAQYABgEGAPABABoMAMsCGw7tAQATABMCEwARAhMEEQIPBBEEDwQPBg8IDwYNCA0KDQoNCgsMCwwLDAkOCRAHDgcQBxIFEgUUBRQDFAEWAxgBGAAYAKQDABQCFAISBBQCEgYSBhAGEggQCBAIEAoQCg4MDAwODAwODAwKDgwQCg4IEAgQCBAIEAYSBhIGEgQSAhQCFAIUAOABABwOAM0CGQzbAQA=",
  "a":"BgABApoB8AYCxwF+BwkHCQcJCQkHBwkHBwcJBQkFBwUJBQkFCQMHBQkDCQMJAwcDCQEHAQkBBwEJAQcABwAHAQcABQAHAAUBBQAFABMAEwITAhEEEwQPBBEGDwgPCA0IDwoLCg0KCwwLDAsMCQ4JDgkOBw4HEAcQBRAFEAUSAxADEgESAxIBFAESABQAFAISAhQCEgQSBBIEEgYSBhIIEAgQChAIDgwODA4MDg4MDgwODBAMEAoSCBIKEggUCBQGFgYWBBgEGAIaAhoAcgAADgEMAQoBCgEIAwgDBgUEBQQFBAcCBwIHAgkCCQAJAKsCABcPAMwCHAvCAgAUABYBEgAUARIDFAMQAxIDEAUSBQ4FEAcOCRAJDAkOCwwLDA0MCwoNCg8IDwgPCA8GEQYRBhMEEwIXAhUCFwAZAIMGFwAKmQLqA38ATxchQwgnGiMwD1AMUDYAdg==",
  "b":"BgABAkqmBIIJGAAYARYBFgEUAxQDEgUSBRIFEAcQCQ4HDgkOCw4LDAsMDQoNCg0KDQgPBg8GDwYRBBEEEQQTBBECEwIVAhMAFQD/AgAZARcBFwEXAxUDEwUTBREFEQcPBw8JDwkNCQ0LDQsLCwsNCQ0JDQcPBw8HDwURAxEDEQMTAxMBEwMVARUAFQHPAwAUEgCWCxEY5gIAERkAowKCAQAJOvECESwrEn8AAJsEgAEALBISLgCeAw==",
  "d":"BgABAkryBgDLAXAREQ8NEQ0PDREJDwkRBw8FDwURAw8DDwERAw8BEQEPACMCHwQfCB0MGw4bEhcUFxgVGhEeDSANJAkmBSgDKgEuAIADABYCFAIUAhQCFAQUBBIGEgYSBhAIEAgQCBAKDgoODAwMDAwMDgoOCg4KEAgQCBIGEgYSBhQEFgQWBBYCGAIYAHwAAKQCERrmAgARFwCnCxcADOsCugJGMgDmA3sAKxERLQCfAwolHBUmBSQKBAA=",
  "e":"BgABAqMBigP+AgAJAgkCCQQHBAcGBwYFCAUIBQgDCgMIAQoDCAEKAQoACgAKAAoCCAIKAggECgQIBAgGCAYGBgQIBAoECAIKAAyiAgAAGQEXARcBFwMVBRMFEwURBxEHDwcPCQ8LDQkNCwsNCw0LDQkNBw8JDwcPBQ8FEQURAxEDEwMTAxMBFQAVARcALwIrBCkIJwwlDiESHxQbGBkaFR4TIA0iCyQJKAMqASwAggMAFAIUABIEFAISBBIEEgQSBhIGEAgQCBAIEAoODA4MDgwODgwQDBAKEAoSChIIFAgUCBYGGAQYBhoCGgQcAh4ALgEqAygFJgkkDSANHhEaFRgXFBsSHQ4fDCUIJwQpAi0AGQEXAxcDFQcTBRMJEQkPCw8LDQ0PDQsNDQ8LEQsRCxEJEwkTCRMJEwcTBxUHFQUVBRUHFQUVBRUHFwcVBRUHCs4BkAMfOEUURxEfMwBvbBhAGBwaBiA=",
  "h":"BgABAUHYBJAGAAYBBgAGAQYDBgEEAwYDBAMEBQQDAgUEBQIFAAUCBQB1AAC5BhIT5wIAFhQAlAsRGOYCABEZAKMCeAAYABgBFgEWARQDFAMSBRIFEgUQBxAJDgcOCQ4LDgsMCwwNCg0KDQoNCA8GDwYPBhEEEQQRBBMEEQITAhUCEwAVAO0FFhPnAgAUEgD+BQ==",
  "g":"BgABArkBkAeACQCNCw8ZERkRFxEVExMVERUPFQ8XDRcLGQkZBxsFGwUdAR0BDQALAA0ADQINAAsCDQANAg0CDQILAg0EDQINBA0GDQQNBg0EDQYNCA0GDwgNCA0IDQgPCg0KDwwNDA8MDw4PDqIB7gEQDRALEAkQCQ4JEAcOBw4FDgUOAwwFDgMMAQwBDAEMAQwACgEKAAoACAIIAAgCCAIGAggCBgIGBAYCBgQEAgYEAqIBAQADAAEBAwADAAMABQADAAUAAwAFAAMABQAFAAMABQA3ABMAEwIRAhMCEQQRBBEEEQYRBg8IDwgPCA0KDQoNCg0MCwwLDgsOCQ4JDgkQBxAHEgcSBRIDFAMWAxQBFgEYABgA/gIAFgIWAhQEFgQUBBIGFAgSCBIIEAoSChAKDgwODA4MDg4MDgwODA4KEAgQCBAIEgYSBhIEEgYSBBQCEgIUAhQCOgAQABABDgEQAQ4BEAMOAw4FDgUOBQwFDgcMBQ4HDAkMB4oBUBgACbsCzQYAnAR/AC0RES0AnQMSKy4RgAEA",
  "f":"BgABAUH8A6QJBwAHAAUABwEFAQcBBQEFAwUDBQMDAwMDAwUDAwMFAQUAwQHCAQAWEgDZAhUUwQEAAOMEFhftAgAWFADKCQoSChIKEAoQCg4KDgwOCgwMDAoKDAwMCgwIDAgMCAwIDAYOCAwEDgYMBA4GDAIOBA4CDgQOAg4CDgAOAg4ADgC2AQAcDgDRAhkQowEA",
  "i":"BgACAQlQABISALoIERLqAgAREQC5CBIR6QIAAWELyAoADgIOAgwEDgIKBgwGCgYKCAoGCAgICggIBggGCgYKBAoECgQMBAoCDAIMAgwCDAAMAAwADAEMAQoBDAMKAwoDCgUKBQgFCgUIBwgHCAcICQgJBgkECwQJBA0CCwANAA0ADQELAQ0BCwMJBQsFCQUJBwkFBwcHBwcJBQcFCQUJBQkDCQMLAwkBCwELAQsACwALAAsCCwILAgkCCwIJBAkECQQJBgcGCQYHCAcIBwgHCgUKBQwFCgMMAQwBDgEMAA4=",
  "j":"BgACAWFKyAoADgIOAgwEDgIKBgwGCgYKCAoGCAgICggIBggGCgYKBAoECgQMBAoCDAIMAgwCDAAMAAwADAEMAQoBDAMKAwoDCgUKBQgFCgUIBwgHCAcICQgJBgkECwQJBA0CCwANAA0ADQELAQ0BCwMJBQsFCQUJBwkFBwcHBwcJBQcFCQUJBQkDCQMLAwkBCwELAQsACwALAAsCCwILAgkCCwIJBAkECQQJBgcGCQYHCAcIBwgHCgUKBQwFCgMMAQwBDgEMAA4BO+YCnwwJEQkRCQ8JDwsNCQ0LDQkLCwsJCQsLCQkLBwsHCwcLBwsFCwcNAwsFDQMLBQ0BDQMNAQ0DDQENAQ0ADQENAA0AVwAbDQDSAhoPQgAIAAgABgAIAgYCCAIGAgYEBgQGBAQEBAQEBgQEBAYCBgC4CRES6gIAEREAowo=",
  "k":"BgABARKoA/QFIAC0AYoD5gIAjwK5BJICwwTfAgDDAbIDFwAAnwMSEeUCABISAJILERLmAgAREQCvBQ==",
  "n":"BgABAW1yggmQAU8GBAgEBgQGBgYCCAQGBAYEBgQIAgYECAQGAggEBgIIBAgCCAQIAggCCAIIAgoACAIKAAgCCgAKAgoADAAKAgwAFgAWARQAFAEUAxQDFAMSAxIFEgUQBRIHEAkOBxAJDgsOCwwLDA0MDQoPCA8IEQgRBhEGEwYVBBUEFQIXAhkCGQDtBRQR5QIAFBAA/AUACAEIAQYBCAMGBQQFBgUEBwQFBAcCBwIHAgcCCQIHAAcACQAHAQcABwMHAQUDBwMFAwUFBQUDBQEFAwcBBwAHAPkFEhHjAgASEgDwCBAA",
  "m":"BgABAZoBfoIJigFbDAwMCg4KDggOCA4IDgYQBhAGEAQQBBAEEAISAhACEgAmASQDJAciCyANHhEcFRwXDg4QDBAKEAwQCBAKEggSBhIGEgYSBBQEEgIUAhICFAAUABQBEgEUARIDEgMSAxIFEgUQBxAHEAcQBw4JDgkOCw4LDAsMDQoNCg8KDwgPCBEIEQYRBBMEEwQTAhMCFQAVAP0FEhHlAgASEgCCBgAIAQgBBgEGAwYFBgUEBQQHBAUEBwIHAgcCBwIJAAcABwAJAAcBBwEHAQUBBwMFAwUDBQMDBQMFAwUBBQEHAQcAgQYSEeUCABISAIIGAAgBCAEGAQYDBgUGBQQFBAcEBQQHAgcCBwIHAgkABwAHAAkABwEHAQcBBQEHAwUDBQMFAwMFAwUDBQEFAQcBBwCBBhIR5QIAEhIA8AgYAA==",
  "l":"BgABAQnAAwDrAgASFgDWCxEa6gIAERkA0wsUFw==",
  "y":"BgABAZ8BogeNAg8ZERkRFxEVExMVERUPFQ8XDRcLGQkZBxsFGwUdAR0BDQALAA0ADQINAAsCDQANAg0CDQILAg0EDQINBA0GDQQNBg0EDQYNCA0GDwgNCA0IDQgPCg0KDwwNDA8MDw4PDqIB7gEQDRALEAkQCQ4JEAcOBw4FDgUOAwwFDgMMAQwBDAEMAQwACgEKAAoACAIIAAgCCAIGAggCBgIGBAYCBgQEAgYEAqIBAQADAAEBAwADAAMABQADAAUAAwAFAAMABQAFAAMABQA3ABMAEwIRABECEwQRAg8EEQQPBBEGDwgNCA8IDQgNCg0MDQwLDAkOCw4JDgcQBxAHEgUSBRQFFAMWARgDGAEaABwA9AUTEuQCABEPAP8FAAUCBQAFAgUEBQIDBAUEAwQDBgMEAQYDBgEGAAgBBgCAAQAAvAYREuICABMPAP0K",
  "q":"BgABAmj0A4YJFgAWARQAEgESAxADEAMOAw4FDgUMBQ4HDgcOBwwJDgmeAU4A2QwWGesCABYaAN4DAwADAAMBAwADAAUAAwADAAMABQAFAAUABwAHAQcACQAVABUCFQATAhUCEwQRAhMEEQQRBhEGDwgPCA8IDQoNDA0MCwwLDgkOCRAJEAkQBxIHEgUUBRYDFgMYARoBGgAcAP4CABYCFgIWBBYEFAQSBhQIEggSCBAKEgoQDA4MDgwODg4ODBAMDgwQChIIEAoSCBIGEgYUBhQEFAQWAhYCFgIWAApbkQYSKy4ReAAAjARTEjkRHykJMwDvAg==",
  "p":"BgABAmiCBIYJFgAWARYBFAEWAxQDEgUUBRIFEgcSBxAJEAkQCQ4LDgsOCwwNDA0KDwoPCg8IEQgRCBEGEwQTBhMCFQQVAhUAFQD9AgAbARkBFwMXAxcDEwUTBxMHEQcRCQ8JDQsNCw0LCw0LDQkPCQ0JDwURBxEFEQURAxMDEQMTARUBEwEVARUBFQAJAAcABwAFAAcABQAFAAMAAwADAAUAAwIDAAMAAwIDAADdAxYZ6wIAFhoA2gyeAU0OCgwIDgoMCA4GDgYMBg4GDgQQBBAEEgQUAhQCFgIWAApcoQMJNB8qNxJVEQCLBHgALhISLADwAg==",
  "o":"BgABAoMB8gOICRYAFgEWARQBFgMUAxIDFAUSBRIHEgcQBxAJEAkOCw4LDgsMDQwNCg8KDwoPCg8IEQgRBhMGEwQTBBMCFQIVABcAiwMAFwEVARUDEwMTAxMFEwcRBxEHDwkPCQ8LDQsNCw0NCw0LDwkNCw8HEQkPBxEHEQcRBRMFEwMTAxUDFQEVABUAFQAVAhUCFQITBBMEEwYTBhEGEQgRCA8KDwoPCg0KDQwNDAsOCw4JDgkQCRAJEgcSBxIFFAUUAxQDFgEWARYAFgCMAwAYAhYCFgQUBBQEFAYUCBIIEggQChAKEAwODA4MDg4MDgwQCg4KEgoQChIIEggSBhQGEgYUBBYEFAIWAhYCFgALYv0CHTZBFEMRHTcAjwMcNUITQhIiOACQAw==",
  "r":"BgACAQRigAkQAA8AAAABShAAhAFXDAwODAwKDgoOCBAIDgYQBhAEEAQQBBAEEAISABACEAAQAA4BEAAQARADEAEQAxADEAUSBRIHFAcUCxQLFA0WDVJFsQHzAQsMDQwLCgkICwgLCAkGCQYJBAkGBwIJBAcCBwQHAAcCBwAFAgcABQAHAQUABQEFAQUBBQEDAQUBAwMDAQMDAwEAmwYSEeMCABISAO4IEAA=",
  "u":"BgABAV2KBwGPAVANCQsHDQcNBw0FCwUNBQ0FDQMPAw8DEQMTARMBFQEVABUAFQITABMEEwITBBMEEQQRBhEGDwYRCA8KDQgPCg0MDQwLDAsOCRALDgcQBxIHEgUUBRQFFAMWAxgBGAEYARoA7gUTEuYCABMPAPsFAAcCBwIFBAcCBQYDBgUGAwgDBgMIAQgBCAEIAQoBCAAIAAoACAIIAggCCAIGBAgEBgQGBgYGBAYCBgQIAggACAD6BRES5AIAEREA7wgPAA==",
  "s":"BgABAasC/gLwBQoDCgMMBQ4DDgUOBRAFEAUSBRAHEgcQCRIJEAkSCxALEAsQDRANDg0ODw4PDA8MDwoRChEIEwYTBBcCFQIXABkBGQEXAxcFFQUTBRMHEwcRCREJDwkNCQ8LDQ0LCwsNCw0JDQkPBw8HDwUPBREDEQMRAREDEQETABEBEwARABMADwIRABECEQIRBBMCEwQVBBUEFQYVBhMIFwgVChUKFQxgsAIIAwYDCAMKAQgDCAMKAQoDCgEKAwoBCgMKAQwDCgEKAwoBDAMKAQoBCgEMAQoACgEKAAoBCgAKAQgACgAIAQgABgoECAIKAgoCCgAMAQoBDAUEBwIHBAcEBwIHBAkECQQJBAkECQYLBAkGCwYJBgsGCwYJCAsGCwgJBgsICQgLCAkICwgJCgkKCQoJCgcKCQwHDAcMBwwFDAcMAw4FDAMOAw4BDgMQARAAEAESABIAEgIQAg4CDgIOBA4CDgQMBAwEDAQMBgoECgYKBgoGCgYIBggGCAgIBggGBgYIBgYGBgYGBgYGBAgGBgQIBAYECAQQChIIEggSBhIEEgQSBBQCFAISABQAEgASABIAEgESARIBEAEQAxIDDgMQAxADDgUOBQwDDAMMAwoDCAMIAQYBe6cCAwIDAgUAAwIFAgUCBwIFAgcCBQIHAgUCBwIHAAUCBwIHAgUABwIHAgcABQIHAAcCBwAFAgUABQIFAAUABQIDAAEAAQABAQEAAQEBAQEBAQEBAQEDAQEAAwEBAQMAAwEDAAMBAwADAQMAAwABAQMAAwADAAEAAwIBAAMCAQQDAgE=",
  "t":"BgABAUe8BLACWAAaEADRAhsOaQANAA0ADwINAA0CDQANAg0CDQINBA0CCwYNBA0GCwYNBgsIDQgLCAsKCwgJDAsKCQwJDAkOCQ4HEAcSBxIHEgUUAOAEawAVEQDWAhYTbAAAygIVFOYCABUXAMUCogEAFhQA1QIVEqEBAADzAwIFBAMEBQQDBAMEAwYDBgMGAwYBCAEGAQgBBgEIAAgA",
  "w":"BgABARz8BsAEINYCKNgBERLuAgARD+8B3QgSEc0CABQSW7YCV7UCFBHJAgASEpMC3AgREvACABERmAHxBDDaAVeYAxES7gIAEREo1QE81wIIAA==",
  "z":"BgABAQ6cA9AGuQIAFw8AzAIaC9QFAAAr9wKjBuACABYQAMsCGQyZBgCaA9AG"
   }';
BEGIN

  IF font IS NULL THEN
    font := font_default;
  END IF;

  -- For character spacing, use m as guide size
  geom := ST_GeomFromTWKB(decode(font->>'m', 'base64'));
  m_width := ST_XMax(geom) - ST_XMin(geom);
  spacing := m_width / 12;

  letterarray := regexp_split_to_array(replace(letters, ' ', E'\t'), E'');
  FOREACH letter IN ARRAY letterarray
  LOOP
    geom := ST_GeomFromTWKB(decode(font->>(letter), 'base64'));
    -- Chars are not already zeroed out, so do it now
    geom := ST_Translate(geom, -1 * ST_XMin(geom), 0.0);
    -- unknown characters are treated as spaces
    IF geom IS NULL THEN
      -- spaces are a "quarter m" in width
      width := m_width / 3.5;
    ELSE
      width := (ST_XMax(geom) - ST_XMin(geom));
    END IF;
    geom := ST_Translate(geom, position, 0.0);
    -- Tighten up spacing when characters have a large gap
    -- between them like Yo or To
    adjustment := 0.0;
    IF prevgeom IS NOT NULL AND geom IS NOT NULL THEN
      dist = ST_Distance(prevgeom, geom);
      IF dist > spacing THEN
        adjustment = spacing - dist;
        geom := ST_Translate(geom, adjustment, 0.0);
      END IF;
    END IF;
    prevgeom := geom;
    position := position + width + spacing + adjustment;
    wordarr := array_append(wordarr, geom);
  END LOOP;
  -- apply the start point and scaling options
  wordgeom := ST_CollectionExtract(ST_Collect(wordarr));
  wordgeom := ST_Scale(wordgeom,
                text_height/font_default_height,
                text_height/font_default_height);
  return wordgeom;
END;
$$
LANGUAGE 'plpgsql'
SET standard_conforming_strings = ON
IMMUTABLE COST 250 PARALLEL SAFE;


-----------------------------------------------------------------------
-- ST_RemoveIrrelevantPointsForView
-----------------------------------------------------------------------
-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION ST_RemoveIrrelevantPointsForView(geometry, box2d, boolean default false)
RETURNS geometry
AS '$libdir/postgis-3','ST_RemoveIrrelevantPointsForView'
	LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

-----------------------------------------------------------------------
-- ST_RemoveSmallParts
-----------------------------------------------------------------------
-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION ST_RemoveSmallParts(geometry, double precision, double precision)
RETURNS geometry
AS '$libdir/postgis-3','ST_RemoveSmallParts'
LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
	COST 250;

COMMIT;

