---------------------------------------------------------------------------
--
-- PostGIS - SFCGAL functions
-- Copyright 2012-2013 Oslandia <infos@oslandia.com>
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
---------------------------------------------------------------------------

--
-- New SFCGAL functions (meaning prototype not already provided by GEOS)
--






   




   



   













-- INSTALL VERSION: '3.5.0'

BEGIN;

CREATE OR REPLACE FUNCTION postgis_sfcgal_scripts_installed() RETURNS text
	AS $$ SELECT trim('3.5.0'::text || $rev$ v2.6.7-235-g3b0a45f $rev$) AS version $$
	LANGUAGE 'sql' IMMUTABLE;

-- Availability: 2.1.0
CREATE OR REPLACE FUNCTION postgis_sfcgal_version() RETURNS text
        AS '$libdir/postgis_sfcgal-3'
        LANGUAGE 'c' IMMUTABLE;

-- Availability: 3.3.0

CREATE OR REPLACE FUNCTION postgis_sfcgal_full_version() RETURNS text
        AS '$libdir/postgis_sfcgal-3'
        LANGUAGE 'c' IMMUTABLE;


-- Availability: 3.0.0
CREATE OR REPLACE FUNCTION postgis_sfcgal_noop(geometry)
        RETURNS geometry
        AS '$libdir/postgis_sfcgal-3', 'postgis_sfcgal_noop'
        LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
        COST 1;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DIntersection(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersection3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_3DIntersection(geom1 geometry, geom2 geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DIntersection', 'CG_3DIntersection', '3.5.0');
	SELECT CG_3DIntersection($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Intersection(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersection'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DIntersects(geom1 geometry, geom2 geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersects3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Intersects(geom1 geometry, geom2 geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_intersects'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DDifference(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_difference3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;


-- Availability: 2.2
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_3DDifference(geom1 geometry, geom2 geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DDifference', 'CG_3DDifference', '3.5.0');
	SELECT CG_3DDifference($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Difference(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_difference'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DUnion(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_union3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;


-- Availability: 3.5.0
CREATE AGGREGATE CG_3DUnion(geometry) (
       sfunc = CG_3DUnion,
       stype = geometry,
       parallel = safe
);

-- Availability: 3.3.0
CREATE AGGREGATE ST_3DUnion(geometry) (
       sfunc = CG_3DUnion,
       stype = geometry,
       parallel = safe
);

-- Availability: 2.2
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_3DUnion(geom1 geometry, geom2 geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DUnion', 'CG_3DUnion', '3.5.0');
	SELECT CG_3DUnion($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Union(geom1 geometry, geom2 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_union'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.3.0
CREATE AGGREGATE CG_Union(geometry) (
       sfunc = CG_Union,
       stype = geometry,
       parallel = safe
);

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Tesselate(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_tesselate'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_Tesselate(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_Tesselate', 'CG_Tesselate', '3.5.0');
	SELECT CG_Tesselate($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Triangulate(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_triangulate'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DArea(geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_area3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_3DArea(geometry)
RETURNS FLOAT8 AS $$
	SELECT _postgis_deprecate(
		'ST_3DArea', 'CG_3DArea', '3.5.0');
	SELECT CG_3DArea($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Area(geom1 geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_area'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DDistance(geometry, geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_distance3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Distance(geometry, geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_distance'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Extrude(geometry, float8, float8, float8)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_extrude'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_Extrude(geometry, float8, float8, float8)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_Extrude', 'CG_Extrude', '3.5.0');
	SELECT CG_Extrude($1, $2, $3, $4);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_ForceLHR(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_force_lhr'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_ForceLHR(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_ForceLHR', 'CG_ForceLHR', '3.5.0');
	SELECT CG_ForceLHR($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Orientation(geometry)
       RETURNS INT4
       AS '$libdir/postgis_sfcgal-3','sfcgal_orientation'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_Orientation(geometry)
RETURNS INT4 AS $$
	SELECT _postgis_deprecate(
		'ST_Orientation', 'CG_Orientation', '3.5.0');
	SELECT CG_Orientation($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_MinkowskiSum(geometry, geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_minkowski_sum'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_MinkowskiSum(geometry, geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_MinkowskiSum', 'CG_MinkowsikSum', '3.5.0');
	SELECT CG_MinkowskiSum($1, $2);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_StraightSkeleton(geometry, use_m_as_distance boolean DEFAULT false)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_straight_skeleton'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.1.0
-- Deprecation in 3.1.0
CREATE OR REPLACE FUNCTION ST_StraightSkeleton(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_StraightSkeleton', 'CG_StraightSkeleton', '3.1.0');
	SELECT CG_StraightSkeleton($1, false);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_ApproximateMedialAxis(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_approximate_medial_axis'
       LANGUAGE 'c'
       IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.2.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_ApproximateMedialAxis(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_ApproximateMedialAxis', 'CG_ApproximateMedialAxis', '3.5.0');
	SELECT CG_ApproximateMedialAxis($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_IsPlanar(geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_is_planar'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.2.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_IsPlanar(geometry)
RETURNS boolean AS $$
	SELECT _postgis_deprecate(
		'ST_IsPlanar', 'CG_IsPlanar', '3.5.0');
	SELECT CG_IsPlanar($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Volume(geometry)
       RETURNS FLOAT8
       AS '$libdir/postgis_sfcgal-3','sfcgal_volume'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.2
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_Volume(geometry)
RETURNS FLOAT8 AS $$
	SELECT _postgis_deprecate(
		'ST_Volume', 'CG_Volume', '3.5.0');
	SELECT CG_Volume($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_MakeSolid(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3','sfcgal_make_solid'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.2
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_MakeSolid(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_MakeSolid', 'CG_MakeSolid', '3.5.0');
	SELECT CG_MakeSolid($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_IsSolid(geometry)
       RETURNS boolean
       AS '$libdir/postgis_sfcgal-3','sfcgal_is_solid'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 2.2
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_IsSolid(geometry)
RETURNS boolean AS $$
	SELECT _postgis_deprecate(
		'ST_IsSolid', 'CG_IsSolid', '3.5.0');
	SELECT CG_IsSolid($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_ConstrainedDelaunayTriangles(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_constrained_delaunay_triangles'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.0.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_ConstrainedDelaunayTriangles(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_ConstrainedDelaunayTriangles', 'CG_ConstrainedDelaunayTriangles', '3.5.0');
	SELECT CG_ConstrainedDelaunayTriangles($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_3DConvexHull(geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_convexhull3D'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.3.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_3DConvexHull(geometry)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_3DConvexHull', 'CG_3DConvexHull', '3.5.0');
	SELECT CG_3DConvexHull($1);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_AlphaShape(g1 geometry, alpha float8 DEFAULT 1.0, allow_holes boolean DEFAULT false)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_alphashape'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.3.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_AlphaShape(g1 geometry, alpha float8 DEFAULT 1.0, allow_holes boolean DEFAULT false)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_AlphaShape', 'CG_AlphaShape', '3.5.0');
	SELECT CG_AlphaShape($1, $2, $3);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_OptimalAlphaShape(g1 geometry, allow_holes boolean DEFAULT false, nb_components int DEFAULT 1)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_optimalalphashape'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.3.0
-- Deprecation in 3.5.0
CREATE OR REPLACE FUNCTION ST_OptimalAlphaShape(g1 geometry, allow_holes boolean DEFAULT false, nb_components int DEFAULT 1)
RETURNS geometry AS $$
	SELECT _postgis_deprecate(
		'ST_OptimalAlphaShape', 'CG_OptimalAlphaShape', '3.5.0');
	SELECT CG_OptimalAlphaShape($1, $2, $3);
$$
LANGUAGE 'sql' IMMUTABLE SECURITY INVOKER;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_YMonotonePartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_ymonotonepartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_ApproxConvexPartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_approxconvexpartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_GreeneApproxConvexPartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_greeneapproxconvexpartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_OptimalConvexPartition(g1 geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_optimalconvexpartition'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_ExtrudeStraightSkeleton(g1 geometry, top_height float8, body_height float8 DEFAULT 0.0)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_extrudestraightskeleton'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Visibility(polygon geometry, pointA geometry, pointB geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_visibility_segment'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

-- Availability: 3.5.0
CREATE OR REPLACE FUNCTION CG_Visibility(polygon geometry, point geometry)
       RETURNS geometry
       AS '$libdir/postgis_sfcgal-3', 'sfcgal_visibility_point'
       LANGUAGE 'c' IMMUTABLE STRICT PARALLEL SAFE
       COST 100;

COMMIT;

