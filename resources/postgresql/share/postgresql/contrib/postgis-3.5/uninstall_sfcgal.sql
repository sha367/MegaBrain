-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
-- Generated on: 2024-11-14 00:30:58
--           by: ../utils/create_uninstall.pl
--         from: sfcgal.sql
--
-- Do not edit manually, your changes will be lost.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

BEGIN;

-- Drop all views.
-- Drop all aggregates.
DROP AGGREGATE IF EXISTS CG_3DUnion (geometry);
DROP AGGREGATE IF EXISTS ST_3DUnion (geometry);
DROP AGGREGATE IF EXISTS CG_Union (geometry);
-- Drop all operators classes and families.
-- Drop all operators.
-- Drop all casts.
-- Drop all table triggers.
-- Drop all functions except 0 needed for type definition.
DROP FUNCTION IF EXISTS postgis_sfcgal_scripts_installed ();
DROP FUNCTION IF EXISTS postgis_sfcgal_version ();
DROP FUNCTION IF EXISTS postgis_sfcgal_full_version ();
DROP FUNCTION IF EXISTS postgis_sfcgal_noop (geometry);
DROP FUNCTION IF EXISTS CG_3DIntersection (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DIntersection (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_Intersection (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_3DIntersects (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_Intersects (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_3DDifference (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DDifference (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_Difference (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_3DUnion (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DUnion (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_Union (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS CG_Tesselate (geometry);
DROP FUNCTION IF EXISTS ST_Tesselate (geometry);
DROP FUNCTION IF EXISTS CG_Triangulate (geometry);
DROP FUNCTION IF EXISTS CG_3DArea (geometry);
DROP FUNCTION IF EXISTS ST_3DArea (geometry);
DROP FUNCTION IF EXISTS CG_Area (geom1 geometry);
DROP FUNCTION IF EXISTS CG_3DDistance (geometry, geometry);
DROP FUNCTION IF EXISTS CG_Distance (geometry, geometry);
DROP FUNCTION IF EXISTS CG_Extrude (geometry, float8, float8, float8);
DROP FUNCTION IF EXISTS ST_Extrude (geometry, float8, float8, float8);
DROP FUNCTION IF EXISTS CG_ForceLHR (geometry);
DROP FUNCTION IF EXISTS ST_ForceLHR (geometry);
DROP FUNCTION IF EXISTS CG_Orientation (geometry);
DROP FUNCTION IF EXISTS ST_Orientation (geometry);
DROP FUNCTION IF EXISTS CG_MinkowskiSum (geometry, geometry);
DROP FUNCTION IF EXISTS ST_MinkowskiSum (geometry, geometry);
DROP FUNCTION IF EXISTS CG_StraightSkeleton (geometry, use_m_as_distance boolean );
DROP FUNCTION IF EXISTS ST_StraightSkeleton (geometry);
DROP FUNCTION IF EXISTS CG_ApproximateMedialAxis (geometry);
DROP FUNCTION IF EXISTS ST_ApproximateMedialAxis (geometry);
DROP FUNCTION IF EXISTS CG_IsPlanar (geometry);
DROP FUNCTION IF EXISTS ST_IsPlanar (geometry);
DROP FUNCTION IF EXISTS CG_Volume (geometry);
DROP FUNCTION IF EXISTS ST_Volume (geometry);
DROP FUNCTION IF EXISTS CG_MakeSolid (geometry);
DROP FUNCTION IF EXISTS ST_MakeSolid (geometry);
DROP FUNCTION IF EXISTS CG_IsSolid (geometry);
DROP FUNCTION IF EXISTS ST_IsSolid (geometry);
DROP FUNCTION IF EXISTS CG_ConstrainedDelaunayTriangles (geometry);
DROP FUNCTION IF EXISTS ST_ConstrainedDelaunayTriangles (geometry);
DROP FUNCTION IF EXISTS CG_3DConvexHull (geometry);
DROP FUNCTION IF EXISTS ST_3DConvexHull (geometry);
DROP FUNCTION IF EXISTS CG_AlphaShape (g1 geometry, alpha float8 , allow_holes boolean );
DROP FUNCTION IF EXISTS ST_AlphaShape (g1 geometry, alpha float8 , allow_holes boolean );
DROP FUNCTION IF EXISTS CG_OptimalAlphaShape (g1 geometry, allow_holes boolean , nb_components int );
DROP FUNCTION IF EXISTS ST_OptimalAlphaShape (g1 geometry, allow_holes boolean , nb_components int );
DROP FUNCTION IF EXISTS CG_YMonotonePartition (g1 geometry);
DROP FUNCTION IF EXISTS CG_ApproxConvexPartition (g1 geometry);
DROP FUNCTION IF EXISTS CG_GreeneApproxConvexPartition (g1 geometry);
DROP FUNCTION IF EXISTS CG_OptimalConvexPartition (g1 geometry);
DROP FUNCTION IF EXISTS CG_ExtrudeStraightSkeleton (g1 geometry, top_height float8, body_height float8 );
DROP FUNCTION IF EXISTS CG_Visibility (polygon geometry, pointA geometry, pointB geometry);
DROP FUNCTION IF EXISTS CG_Visibility (polygon geometry, point geometry);
-- Drop all types if unused in column types.
-- Drop all support functions.
-- Drop all functions needed for types definition.
-- Drop all tables.
-- Drop all schemas.

COMMIT;
