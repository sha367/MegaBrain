BEGIN;
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- Copyright (C) 2020 Regina Obe <lr@pcorp.us>
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- These are functions that need to be dropped beforehand
-- where the argument names may have changed  --
-- so have to be dropped before upgrade can happen --
-- argument names changed --


--
-- UPGRADE SCRIPT TO PostGIS 3.5.0
--

LOAD '$libdir/postgis_sfcgal-3';

DO $$
DECLARE
    old_scripts text;
    new_scripts text;
    old_ver_int int[];
    new_ver_int int[];
    old_maj text;
    new_maj text;
    postgis_upgrade_info RECORD;
    postgis_upgrade_info_func_code TEXT;
BEGIN

    old_scripts := postgis_scripts_installed();
    new_scripts := '3.5.0';

    BEGIN
        new_ver_int := pg_catalog.string_to_array(
            pg_catalog.regexp_replace(
                new_scripts,
                '[^\d.].*',
                ''
            ),
            '.'
        )::int[];
    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'Cannot parse new version % into integers', new_scripts;
    END;

    BEGIN
        old_ver_int := pg_catalog.string_to_array(
            pg_catalog.regexp_replace(
                old_scripts,
                '[^\d.].*',
                ''
            ),
            '.'
        )::int[];
    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'Cannot parse old version % into integers', old_scripts;
    END;

    -- Guard against downgrade
    IF new_ver_int < old_ver_int
    THEN
        RAISE EXCEPTION 'Downgrade of postgis from version % to version % is forbidden', old_scripts, new_scripts;
    END IF;


    -- Check for hard-upgrade being required
    SELECT into old_maj pg_catalog.substring(old_scripts, 1, 1);
    SELECT into new_maj pg_catalog.substring(new_scripts, 1, 1);

    -- 2.x to 3.x was upgrade-compatible, see
    -- https://trac.osgeo.org/postgis/ticket/4170#comment:1
    IF new_maj = '3' AND old_maj = '2' THEN
        old_maj = '3'; -- let's pretend old major = new major
    END IF;

    IF old_maj != new_maj THEN
        RAISE EXCEPTION 'Upgrade of postgis from version % to version % requires a dump/reload. See PostGIS manual for instructions', old_scripts, new_scripts;
    END IF;

    WITH versions AS (
      SELECT '3.5.0'::text as upgraded,
      postgis_scripts_installed() as installed
    ) SELECT
      upgraded as scripts_upgraded,
      installed as scripts_installed,
      pg_catalog.substring(upgraded, '([0-9]+)\.')::int * 100 +
      pg_catalog.substring(upgraded, '[0-9]+\.([0-9]+)(\.|$)')::int
        as version_to_num,
      pg_catalog.substring(installed, '([0-9]+)\.')::int * 100 +
      pg_catalog.substring(installed, '[0-9]+\.([0-9]+)(\.|$)')::int
        as version_from_num,
      installed ~ 'dev|alpha|beta'
        as version_from_isdev
      FROM versions INTO postgis_upgrade_info
    ;

    postgis_upgrade_info_func_code := pg_catalog.format($func_code$
        CREATE FUNCTION _postgis_upgrade_info(OUT scripts_upgraded TEXT,
                                              OUT scripts_installed TEXT,
                                              OUT version_to_num INT,
                                              OUT version_from_num INT,
                                              OUT version_from_isdev BOOLEAN)
        AS
        $postgis_upgrade_info$
        BEGIN
            scripts_upgraded := %L :: TEXT;
            scripts_installed := %L :: TEXT;
            version_to_num := %L :: INT;
            version_from_num := %L :: INT;
            version_from_isdev := %L :: BOOLEAN;
            RETURN;
        END
        $postgis_upgrade_info$ LANGUAGE 'plpgsql' IMMUTABLE;
        $func_code$,
        postgis_upgrade_info.scripts_upgraded,
        postgis_upgrade_info.scripts_installed,
        postgis_upgrade_info.version_to_num,
        postgis_upgrade_info.version_from_num,
        postgis_upgrade_info.version_from_isdev);
    RAISE DEBUG 'Creating function %', postgis_upgrade_info_func_code;
    EXECUTE postgis_upgrade_info_func_code;
END
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION postgis_sfcgal_scripts_installed() RETURNS text
	AS $$ SELECT trim('3.5.0'::text || $rev$ v2.6.7-235-g3b0a45f $rev$) AS version $$
	LANGUAGE 'sql' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_sfcgal_version() RETURNS text
        AS '$libdir/postgis_sfcgal-3'
        LANGUAGE 'c' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_sfcgal_full_version() RETURNS text
        AS '$libdir/postgis_sfcgal-3'
        LANGUAGE 'c' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_sfcgal_noop(geometry)
        RETURNS geometry
        AS '$libdir/postgis_sfcgal-3', 'postgis_sfcgal_noop'
        LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
        COST 1;
CREATE OR REPLACE FUNCTION CG_3DIntersection(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersection3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_3DIntersection(geom1 geometry, geom2 geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DIntersection', 'CG_3DIntersection', '3.5.0');
	SELECT CG_3DIntersection($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Intersection(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersection'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_3DIntersects(geom1 geometry, geom2 geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersects3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_Intersects(geom1 geometry, geom2 geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersects'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_3DDifference(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_difference3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_3DDifference(geom1 geometry, geom2 geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DDifference', 'CG_3DDifference', '3.5.0');
	SELECT CG_3DDifference($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Difference(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_difference'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_3DUnion(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_union3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
-- Aggregate CG_3DUnion(geometry) -- LastUpdated: 305
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF pg_catalog.current_setting('server_version_num')::integer >= 120000
  THEN
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE OR REPLACE AGGREGATE CG_3DUnion(geometry) (
       sfunc = CG_3DUnion,
       stype = geometry,
       parallel = safe
);
 $postgis_proc_upgrade_parsed_def$;
  ELSIF 305 > version_from_num OR (
      305 = version_from_num AND version_from_isdev
    ) FROM _postgis_upgrade_info()
  THEN
    EXECUTE 'DROP AGGREGATE IF EXISTS CG_3DUnion(geometry)';
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE AGGREGATE CG_3DUnion(geometry) (
       sfunc = CG_3DUnion,
       stype = geometry,
       parallel = safe
);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
-- Aggregate ST_3DUnion(geometry) -- LastUpdated: 303
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF pg_catalog.current_setting('server_version_num')::integer >= 120000
  THEN
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE OR REPLACE AGGREGATE ST_3DUnion(geometry) (
       sfunc = CG_3DUnion,
       stype = geometry,
       parallel = safe
);
 $postgis_proc_upgrade_parsed_def$;
  ELSIF 303 > version_from_num OR (
      303 = version_from_num AND version_from_isdev
    ) FROM _postgis_upgrade_info()
  THEN
    EXECUTE 'DROP AGGREGATE IF EXISTS ST_3DUnion(geometry)';
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE AGGREGATE ST_3DUnion(geometry) (
       sfunc = CG_3DUnion,
       stype = geometry,
       parallel = safe
);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION ST_3DUnion(geom1 geometry, geom2 geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DUnion', 'CG_3DUnion', '3.5.0');
	SELECT CG_3DUnion($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Union(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_union'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
-- Aggregate CG_Union(geometry) -- LastUpdated: 303
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF pg_catalog.current_setting('server_version_num')::integer >= 120000
  THEN
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE OR REPLACE AGGREGATE CG_Union(geometry) (
       sfunc = CG_Union,
       stype = geometry,
       parallel = safe
);
 $postgis_proc_upgrade_parsed_def$;
  ELSIF 303 > version_from_num OR (
      303 = version_from_num AND version_from_isdev
    ) FROM _postgis_upgrade_info()
  THEN
    EXECUTE 'DROP AGGREGATE IF EXISTS CG_Union(geometry)';
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE AGGREGATE CG_Union(geometry) (
       sfunc = CG_Union,
       stype = geometry,
       parallel = safe
);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION CG_Tesselate(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_tesselate'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_Tesselate(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_Tesselate', 'CG_Tesselate', '3.5.0');
	SELECT CG_Tesselate($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Triangulate(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_triangulate'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_3DArea(geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_area3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_3DArea(geometry)
RETURNS FLOAT8 AS $$
	SELECT _postgis_deprecate(
		'ST_3DArea', 'CG_3DArea', '3.5.0');
	SELECT CG_3DArea($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Area(geom1 geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_area'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_3DDistance(geometry, geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_distance3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_Distance(geometry, geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_distance'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_Extrude(geometry, float8, float8, float8)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_extrude'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_Extrude(geometry, float8, float8, float8)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_Extrude', 'CG_Extrude', '3.5.0');
	SELECT CG_Extrude($1, $2, $3, $4);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_ForceLHR(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_force_lhr'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_ForceLHR(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_ForceLHR', 'CG_ForceLHR', '3.5.0');
	SELECT CG_ForceLHR($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Orientation(geometry)
       RETURNS INT4
       AS '$libdir/postgis_sfcgal-3','sfcgal_orientation'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_Orientation(geometry)
RETURNS INT4 AS $$
	SELECT _postgis_deprecate(
		'ST_Orientation', 'CG_Orientation', '3.5.0');
	SELECT CG_Orientation($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_MinkowskiSum(geometry, geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_minkowski_sum'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_MinkowskiSum(geometry, geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_MinkowskiSum', 'CG_MinkowsikSum', '3.5.0');
	SELECT CG_MinkowskiSum($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_StraightSkeleton(geometry, use_m_as_distance boolean DEFAULT false)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_straight_skeleton'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_StraightSkeleton(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_StraightSkeleton', 'CG_StraightSkeleton', '3.1.0');
	SELECT CG_StraightSkeleton($1, false);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_ApproximateMedialAxis(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_approximate_medial_axis'
       LANGUAGE 'c'
       IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_ApproximateMedialAxis(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_ApproximateMedialAxis', 'CG_ApproximateMedialAxis', '3.5.0');
	SELECT CG_ApproximateMedialAxis($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_IsPlanar(geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_is_planar'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_IsPlanar(geometry)
RETURNS boolean AS $$
	SELECT _postgis_deprecate(
		'ST_IsPlanar', 'CG_IsPlanar', '3.5.0');
	SELECT CG_IsPlanar($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_Volume(geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_volume'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_Volume(geometry)
RETURNS FLOAT8 AS $$
	SELECT _postgis_deprecate(
		'ST_Volume', 'CG_Volume', '3.5.0');
	SELECT CG_Volume($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_MakeSolid(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_make_solid'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_MakeSolid(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_MakeSolid', 'CG_MakeSolid', '3.5.0');
	SELECT CG_MakeSolid($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_IsSolid(geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_is_solid'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_IsSolid(geometry)
RETURNS boolean AS $$
	SELECT _postgis_deprecate(
		'ST_IsSolid', 'CG_IsSolid', '3.5.0');
	SELECT CG_IsSolid($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_ConstrainedDelaunayTriangles(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_constrained_delaunay_triangles'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_ConstrainedDelaunayTriangles(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_ConstrainedDelaunayTriangles', 'CG_ConstrainedDelaunayTriangles', '3.5.0');
	SELECT CG_ConstrainedDelaunayTriangles($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_3DConvexHull(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_convexhull3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_3DConvexHull(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DConvexHull', 'CG_3DConvexHull', '3.5.0');
	SELECT CG_3DConvexHull($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_AlphaShape(g1 geometry, alpha float8 DEFAULT 1.0, allow_holes boolean DEFAULT false)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_alphashape'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_AlphaShape(g1 geometry, alpha float8 DEFAULT 1.0, allow_holes boolean DEFAULT false)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_AlphaShape', 'CG_AlphaShape', '3.5.0');
	SELECT CG_AlphaShape($1, $2, $3);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_OptimalAlphaShape(g1 geometry, allow_holes boolean DEFAULT false, nb_components int DEFAULT 1)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_optimalalphashape'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION ST_OptimalAlphaShape(g1 geometry, allow_holes boolean DEFAULT false, nb_components int DEFAULT 1)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_OptimalAlphaShape', 'CG_OptimalAlphaShape', '3.5.0');
	SELECT CG_OptimalAlphaShape($1, $2, $3);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;
CREATE OR REPLACE FUNCTION CG_YMonotonePartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_ymonotonepartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_ApproxConvexPartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_approxconvexpartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_GreeneApproxConvexPartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_greeneapproxconvexpartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_OptimalConvexPartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_optimalconvexpartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_ExtrudeStraightSkeleton(g1 geometry, top_height float8, body_height float8 DEFAULT 0.0)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_extrudestraightskeleton'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_Visibility(polygon geometry, pointA geometry, pointB geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_visibility_segment'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
CREATE OR REPLACE FUNCTION CG_Visibility(polygon geometry, point geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_visibility_point'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;
DROP FUNCTION _postgis_upgrade_info();
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- Copyright (C) 2020 Regina Obe <lr@pcorp.us>
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- These are reserved for functions that are changed to use default args
-- This is installed after the new functions are installed
-- We don't have any of these yet for sfcgal
-- The reason we put these after install is
-- you can't drop a function that is used by sql functions
-- without forcing a drop on those as well which may cause issues with user functions.
-- This allows us to CREATE OR REPLACE those in general sfcgal.sql.in
-- without dropping them.


COMMIT;
