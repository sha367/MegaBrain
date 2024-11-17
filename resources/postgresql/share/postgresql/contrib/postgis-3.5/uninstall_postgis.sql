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
-- Generated on: 2024-11-14 00:30:44
--           by: ../utils/create_uninstall.pl
--         from: postgis.sql
--
-- Do not edit manually, your changes will be lost.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

BEGIN;

-- Drop all views.
DROP VIEW IF EXISTS geography_columns;
DROP VIEW IF EXISTS geometry_columns;
-- Drop all aggregates.
DROP AGGREGATE IF EXISTS ST_Extent (geometry);
DROP AGGREGATE IF EXISTS ST_3DExtent (geometry);
DROP AGGREGATE IF EXISTS ST_MemCollect (geometry);
DROP AGGREGATE IF EXISTS ST_MemUnion (geometry);
DROP AGGREGATE IF EXISTS ST_Union (geometry);
DROP AGGREGATE IF EXISTS ST_Union (geometry, gridSize float8);
DROP AGGREGATE IF EXISTS ST_Collect (geometry);
DROP AGGREGATE IF EXISTS ST_ClusterIntersecting (geometry);
DROP AGGREGATE IF EXISTS ST_ClusterWithin (geometry, float8);
DROP AGGREGATE IF EXISTS ST_Polygonize (geometry);
DROP AGGREGATE IF EXISTS ST_MakeLine (geometry);
DROP AGGREGATE IF EXISTS ST_CoverageUnion (geometry);
DROP AGGREGATE IF EXISTS ST_AsMVT (anyelement);
DROP AGGREGATE IF EXISTS ST_AsMVT (anyelement, text);
DROP AGGREGATE IF EXISTS ST_AsMVT (anyelement, text, integer);
DROP AGGREGATE IF EXISTS ST_AsMVT (anyelement, text, integer, text);
DROP AGGREGATE IF EXISTS ST_AsMVT (anyelement, text, integer, text, text);
DROP AGGREGATE IF EXISTS ST_AsGeobuf (anyelement);
DROP AGGREGATE IF EXISTS ST_AsGeobuf (anyelement, text);
DROP AGGREGATE IF EXISTS ST_AsFlatGeobuf (anyelement);
DROP AGGREGATE IF EXISTS ST_AsFlatGeobuf (anyelement, bool);
DROP AGGREGATE IF EXISTS ST_AsFlatGeobuf (anyelement, bool, text);
-- Drop all operators classes and families.
DROP OPERATOR CLASS IF EXISTS btree_geometry_ops USING btree;
DROP OPERATOR FAMILY IF EXISTS btree_geometry_ops USING btree;
DROP OPERATOR CLASS IF EXISTS hash_geometry_ops USING hash;
DROP OPERATOR FAMILY IF EXISTS hash_geometry_ops USING hash;
DROP OPERATOR CLASS IF EXISTS gist_geometry_ops_2d USING GIST;
DROP OPERATOR FAMILY IF EXISTS gist_geometry_ops_2d USING GIST;
DROP OPERATOR CLASS IF EXISTS gist_geometry_ops_nd USING GIST;
DROP OPERATOR FAMILY IF EXISTS gist_geometry_ops_nd USING GIST;
DROP OPERATOR CLASS IF EXISTS gist_geography_ops USING GIST;
DROP OPERATOR FAMILY IF EXISTS gist_geography_ops USING GIST;
DROP OPERATOR CLASS IF EXISTS brin_geography_inclusion_ops USING brin;
DROP OPERATOR FAMILY IF EXISTS brin_geography_inclusion_ops USING brin;
DROP OPERATOR CLASS IF EXISTS btree_geography_ops USING btree;
DROP OPERATOR FAMILY IF EXISTS btree_geography_ops USING btree;
DROP OPERATOR CLASS IF EXISTS brin_geometry_inclusion_ops_2d USING brin;
DROP OPERATOR FAMILY IF EXISTS brin_geometry_inclusion_ops_2d USING brin;
DROP OPERATOR CLASS IF EXISTS brin_geometry_inclusion_ops_3d USING brin;
DROP OPERATOR FAMILY IF EXISTS brin_geometry_inclusion_ops_3d USING brin;
DROP OPERATOR CLASS IF EXISTS brin_geometry_inclusion_ops_4d USING brin;
DROP OPERATOR FAMILY IF EXISTS brin_geometry_inclusion_ops_4d USING brin;
DROP OPERATOR CLASS IF EXISTS spgist_geometry_ops_2d USING SPGIST;
DROP OPERATOR FAMILY IF EXISTS spgist_geometry_ops_2d USING SPGIST;
DROP OPERATOR CLASS IF EXISTS spgist_geometry_ops_3d USING SPGIST;
DROP OPERATOR FAMILY IF EXISTS spgist_geometry_ops_3d USING SPGIST;
DROP OPERATOR CLASS IF EXISTS spgist_geometry_ops_nd USING SPGIST;
DROP OPERATOR FAMILY IF EXISTS spgist_geometry_ops_nd USING SPGIST;
DROP OPERATOR CLASS IF EXISTS spgist_geography_ops_nd USING SPGIST;
DROP OPERATOR FAMILY IF EXISTS spgist_geography_ops_nd USING SPGIST;
-- Drop all operators.
DROP OPERATOR IF EXISTS <  (geometry,geometry);
DROP OPERATOR IF EXISTS <=  (geometry,geometry);
DROP OPERATOR IF EXISTS =  (geometry,geometry);
DROP OPERATOR IF EXISTS <>  (geometry,geometry);
DROP OPERATOR IF EXISTS >=  (geometry,geometry);
DROP OPERATOR IF EXISTS >  (geometry,geometry);
DROP OPERATOR IF EXISTS &&  (geometry,geometry);
DROP OPERATOR IF EXISTS ~=  (geometry,geometry);
DROP OPERATOR IF EXISTS <->  (geometry,geometry);
DROP OPERATOR IF EXISTS <#>  (geometry,geometry);
DROP OPERATOR IF EXISTS @  (geometry,geometry);
DROP OPERATOR IF EXISTS ~  (geometry,geometry);
DROP OPERATOR IF EXISTS <<  (geometry,geometry);
DROP OPERATOR IF EXISTS &<  (geometry,geometry);
DROP OPERATOR IF EXISTS <<|  (geometry,geometry);
DROP OPERATOR IF EXISTS &<|  (geometry,geometry);
DROP OPERATOR IF EXISTS &>  (geometry,geometry);
DROP OPERATOR IF EXISTS >>  (geometry,geometry);
DROP OPERATOR IF EXISTS |&>  (geometry,geometry);
DROP OPERATOR IF EXISTS |>>  (geometry,geometry);
DROP OPERATOR IF EXISTS &&&  (geometry,geometry);
DROP OPERATOR IF EXISTS ~~  (geometry,geometry);
DROP OPERATOR IF EXISTS @@  (geometry,geometry);
DROP OPERATOR IF EXISTS ~~=  (geometry,geometry);
DROP OPERATOR IF EXISTS <<->>  (geometry,geometry);
DROP OPERATOR IF EXISTS |=|  (geometry,geometry);
DROP OPERATOR IF EXISTS &&  (geography,geography);
DROP OPERATOR IF EXISTS <->  (geography,geography);
DROP OPERATOR IF EXISTS &&  (gidx,geography);
DROP OPERATOR IF EXISTS &&  (geography,gidx);
DROP OPERATOR IF EXISTS &&  (gidx,gidx);
DROP OPERATOR IF EXISTS <  (geography,geography);
DROP OPERATOR IF EXISTS <=  (geography,geography);
DROP OPERATOR IF EXISTS =  (geography,geography);
DROP OPERATOR IF EXISTS >=  (geography,geography);
DROP OPERATOR IF EXISTS >  (geography,geography);
DROP OPERATOR IF EXISTS ~  (box2df,geometry);
DROP OPERATOR IF EXISTS @  (box2df,geometry);
DROP OPERATOR IF EXISTS &&  (box2df,geometry);
DROP OPERATOR IF EXISTS ~  (geometry,box2df);
DROP OPERATOR IF EXISTS @  (geometry,box2df);
DROP OPERATOR IF EXISTS &&  (geometry,box2df);
DROP OPERATOR IF EXISTS &&  (box2df,box2df);
DROP OPERATOR IF EXISTS @  (box2df,box2df);
DROP OPERATOR IF EXISTS ~  (box2df,box2df);
DROP OPERATOR IF EXISTS &&&  (gidx,geometry);
DROP OPERATOR IF EXISTS &&&  (geometry,gidx);
DROP OPERATOR IF EXISTS &&&  (gidx,gidx);
DROP OPERATOR IF EXISTS &/&  (geometry,geometry);
DROP OPERATOR IF EXISTS @>>  (geometry,geometry);
DROP OPERATOR IF EXISTS <<@  (geometry,geometry);
DROP OPERATOR IF EXISTS ~==  (geometry,geometry);
-- Drop all casts.
DROP CAST IF EXISTS (geometry AS geometry);
DROP CAST IF EXISTS (geometry AS point);
DROP CAST IF EXISTS (point AS geometry);
DROP CAST IF EXISTS (geometry AS path);
DROP CAST IF EXISTS (path AS geometry);
DROP CAST IF EXISTS (geometry AS polygon);
DROP CAST IF EXISTS (polygon AS geometry);
DROP CAST IF EXISTS (geometry AS box2d);
DROP CAST IF EXISTS (geometry AS box3d);
DROP CAST IF EXISTS (geometry AS box);
DROP CAST IF EXISTS (box3d AS box2d);
DROP CAST IF EXISTS (box2d AS box3d);
DROP CAST IF EXISTS (box2d AS geometry);
DROP CAST IF EXISTS (box3d AS box);
DROP CAST IF EXISTS (box3d AS geometry);
DROP CAST IF EXISTS (text AS geometry);
DROP CAST IF EXISTS (geometry AS text);
DROP CAST IF EXISTS (bytea AS geometry);
DROP CAST IF EXISTS (geometry AS bytea);
DROP CAST IF EXISTS (geometry AS json);
DROP CAST IF EXISTS (geometry AS jsonb);
DROP CAST IF EXISTS (geography AS geography);
DROP CAST IF EXISTS (bytea AS geography);
DROP CAST IF EXISTS (geography AS bytea);
DROP CAST IF EXISTS (geometry AS geography);
DROP CAST IF EXISTS (geography AS geometry);
-- Drop all table triggers.
-- Drop all functions except 24 needed for type definition.
DROP FUNCTION IF EXISTS _postgis_deprecate (oldname text, newname text, version text);
DROP FUNCTION IF EXISTS geometry (geometry, integer, boolean);
DROP FUNCTION IF EXISTS geometry (point);
DROP FUNCTION IF EXISTS point (geometry);
DROP FUNCTION IF EXISTS geometry (path);
DROP FUNCTION IF EXISTS path (geometry);
DROP FUNCTION IF EXISTS geometry (polygon);
DROP FUNCTION IF EXISTS polygon (geometry);
DROP FUNCTION IF EXISTS ST_X (geometry);
DROP FUNCTION IF EXISTS ST_Y (geometry);
DROP FUNCTION IF EXISTS ST_Z (geometry);
DROP FUNCTION IF EXISTS ST_M (geometry);
DROP FUNCTION IF EXISTS geometry_lt (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_le (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_gt (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_ge (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_eq (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_neq (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_cmp (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_sortsupport (internal);
DROP FUNCTION IF EXISTS geometry_hash (geometry);
DROP FUNCTION IF EXISTS geometry_gist_distance_2d (internal,geometry,integer);
DROP FUNCTION IF EXISTS geometry_gist_consistent_2d (internal,geometry,integer);
DROP FUNCTION IF EXISTS geometry_gist_compress_2d (internal);
DROP FUNCTION IF EXISTS geometry_gist_penalty_2d (internal,internal,internal);
DROP FUNCTION IF EXISTS geometry_gist_picksplit_2d (internal, internal);
DROP FUNCTION IF EXISTS geometry_gist_union_2d (bytea, internal);
DROP FUNCTION IF EXISTS geometry_gist_same_2d (geom1 geometry, geom2 geometry, internal);
DROP FUNCTION IF EXISTS geometry_gist_decompress_2d (internal);
DROP FUNCTION IF EXISTS geometry_gist_sortsupport_2d (internal);
DROP FUNCTION IF EXISTS _postgis_selectivity (tbl regclass, att_name text, geom geometry, mode text );
DROP FUNCTION IF EXISTS _postgis_join_selectivity (regclass, text, regclass, text, text );
DROP FUNCTION IF EXISTS _postgis_stats (tbl regclass, att_name text, text );
DROP FUNCTION IF EXISTS _postgis_index_extent (tbl regclass, col text);
DROP FUNCTION IF EXISTS gserialized_gist_sel_2d  (internal, oid, internal, integer);
DROP FUNCTION IF EXISTS gserialized_gist_sel_nd  (internal, oid, internal, integer);
DROP FUNCTION IF EXISTS gserialized_gist_joinsel_2d  (internal, oid, internal, smallint);
DROP FUNCTION IF EXISTS gserialized_gist_joinsel_nd  (internal, oid, internal, smallint);
DROP FUNCTION IF EXISTS geometry_overlaps (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_same (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_distance_centroid (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_distance_box (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_contains (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_within (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_left (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_overleft (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_below (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_overbelow (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_overright (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_right (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_overabove (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_above (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_gist_consistent_nd (internal,geometry,integer);
DROP FUNCTION IF EXISTS geometry_gist_compress_nd (internal);
DROP FUNCTION IF EXISTS geometry_gist_penalty_nd (internal,internal,internal);
DROP FUNCTION IF EXISTS geometry_gist_picksplit_nd (internal, internal);
DROP FUNCTION IF EXISTS geometry_gist_union_nd (bytea, internal);
DROP FUNCTION IF EXISTS geometry_gist_same_nd (geometry, geometry, internal);
DROP FUNCTION IF EXISTS geometry_gist_decompress_nd (internal);
DROP FUNCTION IF EXISTS geometry_overlaps_nd (geometry, geometry);
DROP FUNCTION IF EXISTS geometry_contains_nd (geometry, geometry);
DROP FUNCTION IF EXISTS geometry_within_nd (geometry, geometry);
DROP FUNCTION IF EXISTS geometry_same_nd (geometry, geometry);
DROP FUNCTION IF EXISTS geometry_distance_centroid_nd (geometry,geometry);
DROP FUNCTION IF EXISTS geometry_distance_cpa (geometry, geometry);
DROP FUNCTION IF EXISTS geometry_gist_distance_nd (internal,geometry,integer);
DROP FUNCTION IF EXISTS ST_ShiftLongitude (geometry);
DROP FUNCTION IF EXISTS ST_WrapX (geom geometry, wrap float8, move float8);
DROP FUNCTION IF EXISTS ST_XMin (box3d);
DROP FUNCTION IF EXISTS ST_YMin (box3d);
DROP FUNCTION IF EXISTS ST_ZMin (box3d);
DROP FUNCTION IF EXISTS ST_XMax (box3d);
DROP FUNCTION IF EXISTS ST_YMax (box3d);
DROP FUNCTION IF EXISTS ST_ZMax (box3d);
DROP FUNCTION IF EXISTS ST_Expand (box2d,float8);
DROP FUNCTION IF EXISTS ST_Expand (box box2d, dx float8, dy float8);
DROP FUNCTION IF EXISTS postgis_getbbox (geometry);
DROP FUNCTION IF EXISTS ST_MakeBox2d (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_EstimatedExtent (text,text,text,boolean);
DROP FUNCTION IF EXISTS ST_EstimatedExtent (text,text,text);
DROP FUNCTION IF EXISTS ST_EstimatedExtent (text,text);
DROP FUNCTION IF EXISTS ST_FindExtent (text,text,text);
DROP FUNCTION IF EXISTS ST_FindExtent (text,text);
DROP FUNCTION IF EXISTS postgis_addbbox (geometry);
DROP FUNCTION IF EXISTS postgis_dropbbox (geometry);
DROP FUNCTION IF EXISTS postgis_hasbbox (geometry);
DROP FUNCTION IF EXISTS ST_QuantizeCoordinates (g geometry, prec_x int, prec_y int , prec_z int , prec_m int );
DROP FUNCTION IF EXISTS ST_MemSize (geometry);
DROP FUNCTION IF EXISTS ST_Summary (geometry);
DROP FUNCTION IF EXISTS ST_NPoints (geometry);
DROP FUNCTION IF EXISTS ST_NRings (geometry);
DROP FUNCTION IF EXISTS ST_3DLength (geometry);
DROP FUNCTION IF EXISTS ST_Length2d (geometry);
DROP FUNCTION IF EXISTS ST_Length (geometry);
DROP FUNCTION IF EXISTS ST_LengthSpheroid (geometry, spheroid);
DROP FUNCTION IF EXISTS ST_Length2DSpheroid (geometry, spheroid);
DROP FUNCTION IF EXISTS ST_3DPerimeter (geometry);
DROP FUNCTION IF EXISTS ST_perimeter2d (geometry);
DROP FUNCTION IF EXISTS ST_Perimeter (geometry);
DROP FUNCTION IF EXISTS ST_Area2D (geometry);
DROP FUNCTION IF EXISTS ST_Area (geometry);
DROP FUNCTION IF EXISTS ST_IsPolygonCW (geometry);
DROP FUNCTION IF EXISTS ST_IsPolygonCCW (geometry);
DROP FUNCTION IF EXISTS ST_DistanceSpheroid (geom1 geometry, geom2 geometry, spheroid);
DROP FUNCTION IF EXISTS ST_DistanceSpheroid (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Distance (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_PointInsideCircle (geometry,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_azimuth (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Project (geom1 geometry, distance float8, azimuth float8);
DROP FUNCTION IF EXISTS ST_Project (geom1 geometry, geom2 geometry, distance float8);
DROP FUNCTION IF EXISTS ST_Angle (pt1 geometry, pt2 geometry, pt3 geometry, pt4 geometry );
DROP FUNCTION IF EXISTS ST_LineExtend (geom geometry, distance_forward float8, distance_backward float8 );
DROP FUNCTION IF EXISTS ST_Force2D (geometry);
DROP FUNCTION IF EXISTS ST_Force3DZ (geom geometry, zvalue float8 );
DROP FUNCTION IF EXISTS ST_Force3D (geom geometry, zvalue float8 );
DROP FUNCTION IF EXISTS ST_Force3DM (geom geometry, mvalue float8 );
DROP FUNCTION IF EXISTS ST_Force4D (geom geometry, zvalue float8 , mvalue float8 );
DROP FUNCTION IF EXISTS ST_ForceCollection (geometry);
DROP FUNCTION IF EXISTS ST_CollectionExtract (geometry, integer);
DROP FUNCTION IF EXISTS ST_CollectionExtract (geometry);
DROP FUNCTION IF EXISTS ST_CollectionHomogenize (geometry);
DROP FUNCTION IF EXISTS ST_Multi (geometry);
DROP FUNCTION IF EXISTS ST_ForceCurve (geometry);
DROP FUNCTION IF EXISTS ST_ForceSFS (geometry);
DROP FUNCTION IF EXISTS ST_ForceSFS (geometry, version text);
DROP FUNCTION IF EXISTS ST_Expand (box3d,float8);
DROP FUNCTION IF EXISTS ST_Expand (box box3d, dx float8, dy float8, dz float8 );
DROP FUNCTION IF EXISTS ST_Expand (geometry,float8);
DROP FUNCTION IF EXISTS ST_Expand (geom geometry, dx float8, dy float8, dz float8 , dm float8 );
DROP FUNCTION IF EXISTS ST_Envelope (geometry);
DROP FUNCTION IF EXISTS ST_BoundingDiagonal (geom geometry, fits boolean );
DROP FUNCTION IF EXISTS ST_Reverse (geometry);
DROP FUNCTION IF EXISTS ST_Scroll (geometry, geometry);
DROP FUNCTION IF EXISTS ST_ForcePolygonCW (geometry);
DROP FUNCTION IF EXISTS ST_ForcePolygonCCW (geometry);
DROP FUNCTION IF EXISTS ST_ForceRHR (geometry);
DROP FUNCTION IF EXISTS postgis_noop (geometry);
DROP FUNCTION IF EXISTS postgis_geos_noop (geometry);
DROP FUNCTION IF EXISTS ST_Normalize (geom geometry);
DROP FUNCTION IF EXISTS ST_zmflag (geometry);
DROP FUNCTION IF EXISTS ST_NDims (geometry);
DROP FUNCTION IF EXISTS ST_HasZ (geometry);
DROP FUNCTION IF EXISTS ST_HasM (geometry);
DROP FUNCTION IF EXISTS ST_AsEWKT (geometry);
DROP FUNCTION IF EXISTS ST_AsEWKT (geometry, integer);
DROP FUNCTION IF EXISTS ST_AsTWKB (geom geometry, prec integer , prec_z integer , prec_m integer , with_sizes boolean , with_boxes boolean );
DROP FUNCTION IF EXISTS ST_AsTWKB (geom geometry[], ids bigint[], prec integer , prec_z integer , prec_m integer , with_sizes boolean , with_boxes boolean );
DROP FUNCTION IF EXISTS ST_AsEWKB (geometry);
DROP FUNCTION IF EXISTS ST_AsHEXEWKB (geometry);
DROP FUNCTION IF EXISTS ST_AsHEXEWKB (geometry, text);
DROP FUNCTION IF EXISTS ST_AsEWKB (geometry,text);
DROP FUNCTION IF EXISTS ST_AsLatLonText (geom geometry, tmpl text );
DROP FUNCTION IF EXISTS GeomFromEWKB (bytea);
DROP FUNCTION IF EXISTS ST_GeomFromEWKB (bytea);
DROP FUNCTION IF EXISTS ST_GeomFromTWKB (bytea);
DROP FUNCTION IF EXISTS GeomFromEWKT (text);
DROP FUNCTION IF EXISTS ST_GeomFromEWKT (text);
DROP FUNCTION IF EXISTS postgis_cache_bbox ();
DROP FUNCTION IF EXISTS ST_MakePoint (float8, float8);
DROP FUNCTION IF EXISTS ST_MakePoint (float8, float8, float8);
DROP FUNCTION IF EXISTS ST_MakePoint (float8, float8, float8, float8);
DROP FUNCTION IF EXISTS ST_MakePointM (float8, float8, float8);
DROP FUNCTION IF EXISTS ST_3DMakeBox (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_MakeLine  (geometry[]);
DROP FUNCTION IF EXISTS ST_LineFromMultiPoint (geometry);
DROP FUNCTION IF EXISTS ST_MakeLine (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_AddPoint (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_AddPoint (geom1 geometry, geom2 geometry, integer);
DROP FUNCTION IF EXISTS ST_RemovePoint (geometry, integer);
DROP FUNCTION IF EXISTS ST_SetPoint (geometry, integer, geometry);
DROP FUNCTION IF EXISTS ST_MakeEnvelope (float8, float8, float8, float8, integer );
DROP FUNCTION IF EXISTS ST_TileEnvelope (zoom integer, x integer, y integer, bounds geometry , margin float8 );
DROP FUNCTION IF EXISTS ST_MakePolygon (geometry, geometry[]);
DROP FUNCTION IF EXISTS ST_MakePolygon (geometry);
DROP FUNCTION IF EXISTS ST_BuildArea (geometry);
DROP FUNCTION IF EXISTS ST_Polygonize  (geometry[]);
DROP FUNCTION IF EXISTS ST_ClusterIntersecting (geometry[]);
DROP FUNCTION IF EXISTS ST_ClusterWithin (geometry[], float8);
DROP FUNCTION IF EXISTS ST_ClusterDBSCAN  (geometry, eps float8, minpoints int);
DROP FUNCTION IF EXISTS ST_ClusterWithinWin (geometry, distance float8);
DROP FUNCTION IF EXISTS ST_ClusterIntersectingWin (geometry);
DROP FUNCTION IF EXISTS ST_LineMerge (geometry);
DROP FUNCTION IF EXISTS ST_LineMerge (geometry, boolean);
DROP FUNCTION IF EXISTS ST_Affine (geometry,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_Affine (geometry,float8,float8,float8,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_Rotate (geometry,float8);
DROP FUNCTION IF EXISTS ST_Rotate (geometry,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_Rotate (geometry,float8,geometry);
DROP FUNCTION IF EXISTS ST_RotateZ (geometry,float8);
DROP FUNCTION IF EXISTS ST_RotateX (geometry,float8);
DROP FUNCTION IF EXISTS ST_RotateY (geometry,float8);
DROP FUNCTION IF EXISTS ST_Translate (geometry,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_Translate (geometry,float8,float8);
DROP FUNCTION IF EXISTS ST_Scale (geometry,geometry);
DROP FUNCTION IF EXISTS ST_Scale (geometry,geometry,origin geometry);
DROP FUNCTION IF EXISTS ST_Scale (geometry,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_Scale (geometry,float8,float8);
DROP FUNCTION IF EXISTS ST_Transscale (geometry,float8,float8,float8,float8);
DROP FUNCTION IF EXISTS ST_Dump (geometry);
DROP FUNCTION IF EXISTS ST_DumpRings (geometry);
DROP FUNCTION IF EXISTS ST_DumpPoints (geometry);
DROP FUNCTION IF EXISTS ST_DumpSegments (geometry);
DROP FUNCTION IF EXISTS populate_geometry_columns (use_typmod boolean );
DROP FUNCTION IF EXISTS populate_geometry_columns (tbl_oid oid, use_typmod boolean );
DROP FUNCTION IF EXISTS AddGeometryColumn (catalog_name varchar,schema_name varchar,table_name varchar,column_name varchar,new_srid_in integer,new_type varchar,new_dim integer, use_typmod boolean );
DROP FUNCTION IF EXISTS AddGeometryColumn (schema_name varchar,table_name varchar,column_name varchar,new_srid integer,new_type varchar,new_dim integer, use_typmod boolean );
DROP FUNCTION IF EXISTS AddGeometryColumn (table_name varchar,column_name varchar,new_srid integer,new_type varchar,new_dim integer, use_typmod boolean );
DROP FUNCTION IF EXISTS DropGeometryColumn (catalog_name varchar, schema_name varchar,table_name varchar,column_name varchar);
DROP FUNCTION IF EXISTS DropGeometryColumn (schema_name varchar, table_name varchar,column_name varchar);
DROP FUNCTION IF EXISTS DropGeometryColumn (table_name varchar, column_name varchar);
DROP FUNCTION IF EXISTS DropGeometryTable (catalog_name varchar, schema_name varchar, table_name varchar);
DROP FUNCTION IF EXISTS DropGeometryTable (schema_name varchar, table_name varchar);
DROP FUNCTION IF EXISTS DropGeometryTable (table_name varchar);
DROP FUNCTION IF EXISTS UpdateGeometrySRID (catalogn_name varchar,schema_name varchar,table_name varchar,column_name varchar,new_srid_in integer);
DROP FUNCTION IF EXISTS UpdateGeometrySRID (varchar,varchar,varchar,integer);
DROP FUNCTION IF EXISTS UpdateGeometrySRID (varchar,varchar,integer);
DROP FUNCTION IF EXISTS find_srid (varchar,varchar,varchar);
DROP FUNCTION IF EXISTS get_proj4_from_srid (integer);
DROP FUNCTION IF EXISTS ST_SetSRID (geom geometry, srid integer);
DROP FUNCTION IF EXISTS ST_SRID (geom geometry);
DROP FUNCTION IF EXISTS postgis_transform_geometry (geom geometry, text, text, int);
DROP FUNCTION IF EXISTS postgis_srs_codes (auth_name text);
DROP FUNCTION IF EXISTS postgis_srs (auth_name text, auth_srid text);
DROP FUNCTION IF EXISTS postgis_srs_all ();
DROP FUNCTION IF EXISTS postgis_srs_search (		bounds geometry,		authname text );
DROP FUNCTION IF EXISTS ST_Transform (geometry,integer);
DROP FUNCTION IF EXISTS ST_Transform (geom geometry, to_proj text);
DROP FUNCTION IF EXISTS ST_Transform (geom geometry, from_proj text, to_proj text);
DROP FUNCTION IF EXISTS ST_Transform (geom geometry, from_proj text, to_srid integer);
DROP FUNCTION IF EXISTS postgis_transform_pipeline_geometry (geom geometry, pipeline text, forward boolean, to_srid integer);
DROP FUNCTION IF EXISTS ST_TransformPipeline (geom geometry, pipeline text, to_srid integer );
DROP FUNCTION IF EXISTS ST_InverseTransformPipeline (geom geometry, pipeline text, to_srid integer );
DROP FUNCTION IF EXISTS postgis_version ();
DROP FUNCTION IF EXISTS postgis_liblwgeom_version ();
DROP FUNCTION IF EXISTS postgis_proj_version ();
DROP FUNCTION IF EXISTS postgis_proj_compiled_version ();
DROP FUNCTION IF EXISTS postgis_wagyu_version ();
DROP FUNCTION IF EXISTS postgis_scripts_installed ();
DROP FUNCTION IF EXISTS postgis_lib_version ();
DROP FUNCTION IF EXISTS postgis_scripts_released ();
DROP FUNCTION IF EXISTS postgis_geos_version ();
DROP FUNCTION IF EXISTS postgis_geos_compiled_version ();
DROP FUNCTION IF EXISTS postgis_lib_revision ();
DROP FUNCTION IF EXISTS postgis_svn_version ();
DROP FUNCTION IF EXISTS postgis_libxml_version ();
DROP FUNCTION IF EXISTS postgis_scripts_build_date ();
DROP FUNCTION IF EXISTS postgis_lib_build_date ();
DROP FUNCTION IF EXISTS _postgis_scripts_pgsql_version ();
DROP FUNCTION IF EXISTS _postgis_pgsql_version ();
DROP FUNCTION IF EXISTS postgis_extensions_upgrade (target_version text );
DROP FUNCTION IF EXISTS postgis_full_version ();
DROP FUNCTION IF EXISTS box2d (geometry);
DROP FUNCTION IF EXISTS box3d (geometry);
DROP FUNCTION IF EXISTS box (geometry);
DROP FUNCTION IF EXISTS box2d (box3d);
DROP FUNCTION IF EXISTS box3d (box2d);
DROP FUNCTION IF EXISTS box (box3d);
DROP FUNCTION IF EXISTS text (geometry);
DROP FUNCTION IF EXISTS box3dtobox (box3d);
DROP FUNCTION IF EXISTS geometry (box2d);
DROP FUNCTION IF EXISTS geometry (box3d);
DROP FUNCTION IF EXISTS geometry (text);
DROP FUNCTION IF EXISTS geometry (bytea);
DROP FUNCTION IF EXISTS bytea (geometry);
DROP FUNCTION IF EXISTS ST_Simplify (geometry, float8);
DROP FUNCTION IF EXISTS ST_Simplify (geometry, float8, boolean);
DROP FUNCTION IF EXISTS ST_SimplifyVW (geometry, float8);
DROP FUNCTION IF EXISTS ST_SetEffectiveArea (geometry,  float8 , integer );
DROP FUNCTION IF EXISTS ST_FilterByM (geometry, double precision, double precision , boolean );
DROP FUNCTION IF EXISTS ST_ChaikinSmoothing (geometry, integer , boolean );
DROP FUNCTION IF EXISTS ST_SnapToGrid (geometry, float8, float8, float8, float8);
DROP FUNCTION IF EXISTS ST_SnapToGrid (geometry, float8, float8);
DROP FUNCTION IF EXISTS ST_SnapToGrid (geometry, float8);
DROP FUNCTION IF EXISTS ST_SnapToGrid (geom1 geometry, geom2 geometry, float8, float8, float8, float8);
DROP FUNCTION IF EXISTS ST_Segmentize (geometry, float8);
DROP FUNCTION IF EXISTS ST_LineInterpolatePoint (geometry, float8);
DROP FUNCTION IF EXISTS ST_LineInterpolatePoints (geometry, float8, repeat boolean );
DROP FUNCTION IF EXISTS ST_LineSubstring (geometry, float8, float8);
DROP FUNCTION IF EXISTS ST_LineLocatePoint (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_AddMeasure (geometry, float8, float8);
DROP FUNCTION IF EXISTS ST_ClosestPointOfApproach (geometry, geometry);
DROP FUNCTION IF EXISTS ST_DistanceCPA (geometry, geometry);
DROP FUNCTION IF EXISTS ST_CPAWithin (geometry, geometry, float8);
DROP FUNCTION IF EXISTS ST_IsValidTrajectory (geometry);
DROP FUNCTION IF EXISTS ST_Intersection (geom1 geometry, geom2 geometry, gridSize float8 );
DROP FUNCTION IF EXISTS ST_Buffer (geom geometry, radius float8, options text );
DROP FUNCTION IF EXISTS ST_Buffer (geom geometry, radius float8, quadsegs integer);
DROP FUNCTION IF EXISTS ST_MinimumBoundingRadius (geometry, OUT center geometry, OUT radius double precision);
DROP FUNCTION IF EXISTS ST_MinimumBoundingCircle (inputgeom geometry, segs_per_quarter integer );
DROP FUNCTION IF EXISTS ST_OrientedEnvelope (geometry);
DROP FUNCTION IF EXISTS ST_OffsetCurve (line geometry, distance float8, params text );
DROP FUNCTION IF EXISTS ST_GeneratePoints (area geometry, npoints integer);
DROP FUNCTION IF EXISTS ST_GeneratePoints (area geometry, npoints integer, seed integer);
DROP FUNCTION IF EXISTS ST_ConvexHull (geometry);
DROP FUNCTION IF EXISTS ST_SimplifyPreserveTopology (geometry, float8);
DROP FUNCTION IF EXISTS ST_IsValidReason (geometry);
DROP FUNCTION IF EXISTS ST_IsValidDetail (geom geometry, flags integer );
DROP FUNCTION IF EXISTS ST_IsValidReason (geometry, integer);
DROP FUNCTION IF EXISTS ST_IsValid (geometry, integer);
DROP FUNCTION IF EXISTS ST_HausdorffDistance (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_HausdorffDistance (geom1 geometry, geom2 geometry, float8);
DROP FUNCTION IF EXISTS ST_FrechetDistance (geom1 geometry, geom2 geometry, float8 );
DROP FUNCTION IF EXISTS ST_MaximumInscribedCircle (geometry, OUT center geometry, OUT nearest geometry, OUT radius double precision);
DROP FUNCTION IF EXISTS ST_LargestEmptyCircle (geom geometry, tolerance float8 , boundary geometry , OUT center geometry, OUT nearest geometry, OUT radius double precision);
DROP FUNCTION IF EXISTS ST_Difference (geom1 geometry, geom2 geometry, gridSize float8 );
DROP FUNCTION IF EXISTS ST_Boundary (geometry);
DROP FUNCTION IF EXISTS ST_Points (geometry);
DROP FUNCTION IF EXISTS ST_SymDifference (geom1 geometry, geom2 geometry, gridSize float8 );
DROP FUNCTION IF EXISTS ST_SymmetricDifference (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Union (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Union (geom1 geometry, geom2 geometry, gridSize float8);
DROP FUNCTION IF EXISTS ST_UnaryUnion (geometry, gridSize float8 );
DROP FUNCTION IF EXISTS ST_RemoveRepeatedPoints (geom geometry, tolerance float8 );
DROP FUNCTION IF EXISTS ST_ClipByBox2d (geom geometry, box box2d);
DROP FUNCTION IF EXISTS ST_Subdivide (geom geometry, maxvertices integer , gridSize float8 );
DROP FUNCTION IF EXISTS ST_ReducePrecision (geom geometry, gridsize float8);
DROP FUNCTION IF EXISTS ST_MakeValid (geometry);
DROP FUNCTION IF EXISTS ST_MakeValid (geom geometry, params text);
DROP FUNCTION IF EXISTS ST_CleanGeometry (geometry);
DROP FUNCTION IF EXISTS ST_Split (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_SharedPaths (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Snap (geom1 geometry, geom2 geometry, float8);
DROP FUNCTION IF EXISTS ST_RelateMatch (text, text);
DROP FUNCTION IF EXISTS ST_Node (g geometry);
DROP FUNCTION IF EXISTS ST_DelaunayTriangles (g1 geometry, tolerance float8 , flags integer );
DROP FUNCTION IF EXISTS ST_TriangulatePolygon (g1 geometry);
DROP FUNCTION IF EXISTS _ST_Voronoi (g1 geometry, clip geometry , tolerance float8 , return_polygons boolean );
DROP FUNCTION IF EXISTS ST_VoronoiPolygons (g1 geometry, tolerance float8 , extend_to geometry );
DROP FUNCTION IF EXISTS ST_VoronoiLines (g1 geometry, tolerance float8 , extend_to geometry );
DROP FUNCTION IF EXISTS ST_CombineBBox (box3d,geometry);
DROP FUNCTION IF EXISTS ST_CombineBBox (box3d,box3d);
DROP FUNCTION IF EXISTS ST_CombineBbox (box2d,geometry);
DROP FUNCTION IF EXISTS ST_Collect (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Collect (geometry[]);
DROP FUNCTION IF EXISTS pgis_geometry_accum_transfn (internal, geometry);
DROP FUNCTION IF EXISTS pgis_geometry_accum_transfn (internal, geometry, float8);
DROP FUNCTION IF EXISTS pgis_geometry_accum_transfn (internal, geometry, float8, int);
DROP FUNCTION IF EXISTS pgis_geometry_collect_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_polygonize_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_clusterintersecting_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_clusterwithin_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_makeline_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_coverageunion_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_union_parallel_transfn (internal, geometry);
DROP FUNCTION IF EXISTS pgis_geometry_union_parallel_transfn (internal, geometry, float8);
DROP FUNCTION IF EXISTS pgis_geometry_union_parallel_combinefn (internal, internal);
DROP FUNCTION IF EXISTS pgis_geometry_union_parallel_serialfn (internal);
DROP FUNCTION IF EXISTS pgis_geometry_union_parallel_deserialfn (bytea, internal);
DROP FUNCTION IF EXISTS pgis_geometry_union_parallel_finalfn (internal);
DROP FUNCTION IF EXISTS ST_Union  (geometry[]);
DROP FUNCTION IF EXISTS ST_CoverageUnion  (geometry[]);
DROP FUNCTION IF EXISTS ST_CoverageSimplify  (geom geometry, tolerance float8, simplifyBoundary boolean );
DROP FUNCTION IF EXISTS ST_CoverageInvalidEdges  (geom geometry, tolerance float8 );
DROP FUNCTION IF EXISTS ST_ClusterKMeans (geom geometry, k integer, max_radius float8 );
DROP FUNCTION IF EXISTS ST_Relate (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Relate (geom1 geometry, geom2 geometry, integer);
DROP FUNCTION IF EXISTS ST_Relate (geom1 geometry, geom2 geometry, text);
DROP FUNCTION IF EXISTS ST_Disjoint (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_LineCrossingDirection (line1 geometry, line2 geometry);
DROP FUNCTION IF EXISTS _ST_DWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS _ST_Touches (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Intersects (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Crosses (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Contains (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_ContainsProperly (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Covers (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_CoveredBy (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Within (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Overlaps (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_DFullyWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS _ST_3DDWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS _ST_3DDFullyWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS _ST_3DIntersects (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_OrderingEquals (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_Equals (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_LineCrossingDirection (line1 geometry, line2 geometry);
DROP FUNCTION IF EXISTS ST_DWithin (geom1 geometry, geom2 geometry, float8);
DROP FUNCTION IF EXISTS ST_Touches (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Intersects (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Crosses (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Contains (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_ContainsProperly (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Within (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Covers (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_CoveredBy (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Overlaps (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_DFullyWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS ST_3DDWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS ST_3DDFullyWithin (geom1 geometry, geom2 geometry,float8);
DROP FUNCTION IF EXISTS ST_3DIntersects (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_OrderingEquals (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_Equals (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_IsValid (geometry);
DROP FUNCTION IF EXISTS ST_MinimumClearance (geometry);
DROP FUNCTION IF EXISTS ST_MinimumClearanceLine (geometry);
DROP FUNCTION IF EXISTS ST_Centroid (geometry);
DROP FUNCTION IF EXISTS ST_GeometricMedian (g geometry, tolerance float8 , max_iter int , fail_if_not_converged boolean );
DROP FUNCTION IF EXISTS ST_IsRing (geometry);
DROP FUNCTION IF EXISTS ST_PointOnSurface (geometry);
DROP FUNCTION IF EXISTS ST_IsSimple (geometry);
DROP FUNCTION IF EXISTS ST_IsCollection (geometry);
DROP FUNCTION IF EXISTS Equals (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_GeomFromGML (text, integer);
DROP FUNCTION IF EXISTS ST_GeomFromGML (text, integer);
DROP FUNCTION IF EXISTS ST_GeomFromGML (text);
DROP FUNCTION IF EXISTS ST_GMLToSQL (text);
DROP FUNCTION IF EXISTS ST_GMLToSQL (text, integer);
DROP FUNCTION IF EXISTS ST_GeomFromKML (text);
DROP FUNCTION IF EXISTS ST_GeomFromMARC21 (marc21xml text);
DROP FUNCTION IF EXISTS ST_AsMARC21 (geom geometry, format text );
DROP FUNCTION IF EXISTS ST_GeomFromGeoJson (text);
DROP FUNCTION IF EXISTS ST_GeomFromGeoJson (json);
DROP FUNCTION IF EXISTS ST_GeomFromGeoJson (jsonb);
DROP FUNCTION IF EXISTS postgis_libjson_version ();
DROP FUNCTION IF EXISTS ST_LineFromEncodedPolyline (txtin text, nprecision integer );
DROP FUNCTION IF EXISTS ST_AsEncodedPolyline (geom geometry, nprecision integer );
DROP FUNCTION IF EXISTS ST_AsSVG (geom geometry, rel integer , maxdecimaldigits integer );
DROP FUNCTION IF EXISTS _ST_AsGML (integer, geometry, integer, integer, text, text);
DROP FUNCTION IF EXISTS ST_AsGML (geom geometry, maxdecimaldigits integer , options integer );
DROP FUNCTION IF EXISTS ST_AsGML (version integer, geom geometry, maxdecimaldigits integer , options integer , nprefix text , id text );
DROP FUNCTION IF EXISTS ST_AsKML (geom geometry, maxdecimaldigits integer , nprefix TEXT );
DROP FUNCTION IF EXISTS ST_AsGeoJson (geom geometry, maxdecimaldigits integer , options integer );
DROP FUNCTION IF EXISTS ST_AsGeoJson (r record, geom_column text , maxdecimaldigits integer , pretty_bool boolean , id_column text );
DROP FUNCTION IF EXISTS "json" (geometry);
DROP FUNCTION IF EXISTS "jsonb" (geometry);
DROP FUNCTION IF EXISTS pgis_asmvt_transfn (internal, anyelement);
DROP FUNCTION IF EXISTS pgis_asmvt_transfn (internal, anyelement, text);
DROP FUNCTION IF EXISTS pgis_asmvt_transfn (internal, anyelement, text, integer);
DROP FUNCTION IF EXISTS pgis_asmvt_transfn (internal, anyelement, text, integer, text);
DROP FUNCTION IF EXISTS pgis_asmvt_transfn (internal, anyelement, text, integer, text, text);
DROP FUNCTION IF EXISTS pgis_asmvt_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_asmvt_combinefn (internal, internal);
DROP FUNCTION IF EXISTS pgis_asmvt_serialfn (internal);
DROP FUNCTION IF EXISTS pgis_asmvt_deserialfn (bytea, internal);
DROP FUNCTION IF EXISTS ST_AsMVTGeom (geom geometry, bounds box2d, extent integer , buffer integer , clip_geom bool );
DROP FUNCTION IF EXISTS postgis_libprotobuf_version ();
DROP FUNCTION IF EXISTS pgis_asgeobuf_transfn (internal, anyelement);
DROP FUNCTION IF EXISTS pgis_asgeobuf_transfn (internal, anyelement, text);
DROP FUNCTION IF EXISTS pgis_asgeobuf_finalfn (internal);
DROP FUNCTION IF EXISTS pgis_asflatgeobuf_transfn (internal, anyelement);
DROP FUNCTION IF EXISTS pgis_asflatgeobuf_transfn (internal, anyelement, bool);
DROP FUNCTION IF EXISTS pgis_asflatgeobuf_transfn (internal, anyelement, bool, text);
DROP FUNCTION IF EXISTS pgis_asflatgeobuf_finalfn (internal);
DROP FUNCTION IF EXISTS ST_FromFlatGeobufToTable (text, text, bytea);
DROP FUNCTION IF EXISTS ST_FromFlatGeobuf (anyelement, bytea);
DROP FUNCTION IF EXISTS ST_GeoHash (geom geometry, maxchars integer );
DROP FUNCTION IF EXISTS _ST_SortableHash (geom geometry);
DROP FUNCTION IF EXISTS ST_Box2dFromGeoHash (text, integer );
DROP FUNCTION IF EXISTS ST_PointFromGeoHash (text, integer );
DROP FUNCTION IF EXISTS ST_GeomFromGeoHash (text, integer );
DROP FUNCTION IF EXISTS ST_NumPoints (geometry);
DROP FUNCTION IF EXISTS ST_NumGeometries (geometry);
DROP FUNCTION IF EXISTS ST_GeometryN (geometry,integer);
DROP FUNCTION IF EXISTS ST_Dimension (geometry);
DROP FUNCTION IF EXISTS ST_ExteriorRing (geometry);
DROP FUNCTION IF EXISTS ST_NumInteriorRings (geometry);
DROP FUNCTION IF EXISTS ST_NumInteriorRing (geometry);
DROP FUNCTION IF EXISTS ST_InteriorRingN (geometry,integer);
DROP FUNCTION IF EXISTS GeometryType (geometry);
DROP FUNCTION IF EXISTS ST_GeometryType (geometry);
DROP FUNCTION IF EXISTS ST_PointN (geometry,integer);
DROP FUNCTION IF EXISTS ST_NumPatches (geometry);
DROP FUNCTION IF EXISTS ST_PatchN (geometry, integer);
DROP FUNCTION IF EXISTS ST_StartPoint (geometry);
DROP FUNCTION IF EXISTS ST_EndPoint (geometry);
DROP FUNCTION IF EXISTS ST_IsClosed (geometry);
DROP FUNCTION IF EXISTS ST_IsEmpty (geometry);
DROP FUNCTION IF EXISTS ST_AsBinary (geometry,text);
DROP FUNCTION IF EXISTS ST_AsBinary (geometry);
DROP FUNCTION IF EXISTS ST_AsText (geometry);
DROP FUNCTION IF EXISTS ST_AsText (geometry, integer);
DROP FUNCTION IF EXISTS ST_GeometryFromText (text);
DROP FUNCTION IF EXISTS ST_GeometryFromText (text, integer);
DROP FUNCTION IF EXISTS ST_GeomFromText (text);
DROP FUNCTION IF EXISTS ST_GeomFromText (text, integer);
DROP FUNCTION IF EXISTS ST_WKTToSQL (text);
DROP FUNCTION IF EXISTS ST_PointFromText (text);
DROP FUNCTION IF EXISTS ST_PointFromText (text, integer);
DROP FUNCTION IF EXISTS ST_LineFromText (text);
DROP FUNCTION IF EXISTS ST_LineFromText (text, integer);
DROP FUNCTION IF EXISTS ST_PolyFromText (text);
DROP FUNCTION IF EXISTS ST_PolyFromText (text, integer);
DROP FUNCTION IF EXISTS ST_PolygonFromText (text, integer);
DROP FUNCTION IF EXISTS ST_PolygonFromText (text);
DROP FUNCTION IF EXISTS ST_MLineFromText (text, integer);
DROP FUNCTION IF EXISTS ST_MLineFromText (text);
DROP FUNCTION IF EXISTS ST_MultiLineStringFromText (text);
DROP FUNCTION IF EXISTS ST_MultiLineStringFromText (text, integer);
DROP FUNCTION IF EXISTS ST_MPointFromText (text, integer);
DROP FUNCTION IF EXISTS ST_MPointFromText (text);
DROP FUNCTION IF EXISTS ST_MultiPointFromText (text);
DROP FUNCTION IF EXISTS ST_MPolyFromText (text, integer);
DROP FUNCTION IF EXISTS ST_MPolyFromText (text);
DROP FUNCTION IF EXISTS ST_MultiPolygonFromText (text, integer);
DROP FUNCTION IF EXISTS ST_MultiPolygonFromText (text);
DROP FUNCTION IF EXISTS ST_GeomCollFromText (text, integer);
DROP FUNCTION IF EXISTS ST_GeomCollFromText (text);
DROP FUNCTION IF EXISTS ST_GeomFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_GeomFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_PointFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_PointFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_LineFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_LineFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_LinestringFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_LinestringFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_PolyFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_PolyFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_PolygonFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_PolygonFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_MPointFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_MPointFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_MultiPointFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_MultiPointFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_MultiLineFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_MLineFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_MLineFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_MPolyFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_MPolyFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_MultiPolyFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_MultiPolyFromWKB (bytea);
DROP FUNCTION IF EXISTS ST_GeomCollFromWKB (bytea, int);
DROP FUNCTION IF EXISTS ST_GeomCollFromWKB (bytea);
DROP FUNCTION IF EXISTS _ST_MaxDistance (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_MaxDistance (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_ClosestPoint (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_ShortestLine (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS _ST_LongestLine (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_LongestLine (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_SwapOrdinates (geom geometry, ords cstring);
DROP FUNCTION IF EXISTS ST_FlipCoordinates (geometry);
DROP FUNCTION IF EXISTS ST_BdPolyFromText (text, integer);
DROP FUNCTION IF EXISTS ST_BdMPolyFromText (text, integer);
DROP FUNCTION IF EXISTS geography (geography, integer, boolean);
DROP FUNCTION IF EXISTS geography (bytea);
DROP FUNCTION IF EXISTS bytea (geography);
DROP FUNCTION IF EXISTS ST_AsText (geography);
DROP FUNCTION IF EXISTS ST_AsText (geography, integer);
DROP FUNCTION IF EXISTS ST_AsText (text);
DROP FUNCTION IF EXISTS ST_GeographyFromText (text);
DROP FUNCTION IF EXISTS ST_GeogFromText (text);
DROP FUNCTION IF EXISTS ST_GeogFromWKB (bytea);
DROP FUNCTION IF EXISTS postgis_typmod_dims (integer);
DROP FUNCTION IF EXISTS postgis_typmod_srid (integer);
DROP FUNCTION IF EXISTS postgis_typmod_type (integer);
DROP FUNCTION IF EXISTS geography (geometry);
DROP FUNCTION IF EXISTS geometry (geography);
DROP FUNCTION IF EXISTS geography_gist_consistent (internal,geography,integer);
DROP FUNCTION IF EXISTS geography_gist_compress (internal);
DROP FUNCTION IF EXISTS geography_gist_penalty (internal,internal,internal);
DROP FUNCTION IF EXISTS geography_gist_picksplit (internal, internal);
DROP FUNCTION IF EXISTS geography_gist_union (bytea, internal);
DROP FUNCTION IF EXISTS geography_gist_same (box2d, box2d, internal);
DROP FUNCTION IF EXISTS geography_gist_decompress (internal);
DROP FUNCTION IF EXISTS geography_overlaps (geography, geography);
DROP FUNCTION IF EXISTS geography_distance_knn (geography, geography);
DROP FUNCTION IF EXISTS geography_gist_distance (internal, geography, integer);
DROP FUNCTION IF EXISTS overlaps_geog (gidx, geography);
DROP FUNCTION IF EXISTS overlaps_geog (gidx, gidx);
DROP FUNCTION IF EXISTS overlaps_geog (geography, gidx);
DROP FUNCTION IF EXISTS geog_brin_inclusion_add_value (internal, internal, internal, internal);
DROP FUNCTION IF EXISTS geography_lt (geography, geography);
DROP FUNCTION IF EXISTS geography_le (geography, geography);
DROP FUNCTION IF EXISTS geography_gt (geography, geography);
DROP FUNCTION IF EXISTS geography_ge (geography, geography);
DROP FUNCTION IF EXISTS geography_eq (geography, geography);
DROP FUNCTION IF EXISTS geography_cmp (geography, geography);
DROP FUNCTION IF EXISTS ST_AsSVG (geog geography, rel integer , maxdecimaldigits integer );
DROP FUNCTION IF EXISTS ST_AsSVG (text);
DROP FUNCTION IF EXISTS ST_AsGML (version integer, geog geography, maxdecimaldigits integer , options integer , nprefix text , id text );
DROP FUNCTION IF EXISTS ST_AsGML (geog geography, maxdecimaldigits integer , options integer , nprefix text , id text );
DROP FUNCTION IF EXISTS ST_AsGML (text);
DROP FUNCTION IF EXISTS ST_AsKML (geog geography, maxdecimaldigits integer , nprefix text );
DROP FUNCTION IF EXISTS ST_AsKML (text);
DROP FUNCTION IF EXISTS ST_AsGeoJson (geog geography, maxdecimaldigits integer , options integer );
DROP FUNCTION IF EXISTS ST_AsGeoJson (text);
DROP FUNCTION IF EXISTS ST_Distance (geog1 geography, geog2 geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_Distance (text, text);
DROP FUNCTION IF EXISTS _ST_Expand (geography, float8);
DROP FUNCTION IF EXISTS _ST_DistanceUnCached (geography, geography, float8, boolean);
DROP FUNCTION IF EXISTS _ST_DistanceUnCached (geography, geography, boolean);
DROP FUNCTION IF EXISTS _ST_DistanceUnCached (geography, geography);
DROP FUNCTION IF EXISTS _ST_DistanceTree (geography, geography, float8, boolean);
DROP FUNCTION IF EXISTS _ST_DistanceTree (geography, geography);
DROP FUNCTION IF EXISTS _ST_DWithinUnCached (geography, geography, float8, boolean);
DROP FUNCTION IF EXISTS _ST_DWithinUnCached (geography, geography, float8);
DROP FUNCTION IF EXISTS ST_Area (geog geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_Area (text);
DROP FUNCTION IF EXISTS ST_Length (geog geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_Length (text);
DROP FUNCTION IF EXISTS ST_Project (geog geography, distance float8, azimuth float8);
DROP FUNCTION IF EXISTS ST_Project (geog_from geography, geog_to geography, distance float8);
DROP FUNCTION IF EXISTS ST_Azimuth (geog1 geography, geog2 geography);
DROP FUNCTION IF EXISTS ST_Perimeter (geog geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS _ST_PointOutside (geography);
DROP FUNCTION IF EXISTS ST_Segmentize (geog geography, max_segment_length float8);
DROP FUNCTION IF EXISTS _ST_BestSRID (geography, geography);
DROP FUNCTION IF EXISTS _ST_BestSRID (geography);
DROP FUNCTION IF EXISTS ST_AsBinary (geography);
DROP FUNCTION IF EXISTS ST_AsBinary (geography, text);
DROP FUNCTION IF EXISTS ST_AsEWKT (geography);
DROP FUNCTION IF EXISTS ST_AsEWKT (geography, integer);
DROP FUNCTION IF EXISTS ST_AsEWKT (text);
DROP FUNCTION IF EXISTS GeometryType (geography);
DROP FUNCTION IF EXISTS ST_Summary (geography);
DROP FUNCTION IF EXISTS ST_GeoHash (geog geography, maxchars integer );
DROP FUNCTION IF EXISTS ST_SRID (geog geography);
DROP FUNCTION IF EXISTS ST_SetSRID (geog geography, srid integer);
DROP FUNCTION IF EXISTS ST_Centroid (geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_Centroid (text);
DROP FUNCTION IF EXISTS _ST_Covers (geog1 geography, geog2 geography);
DROP FUNCTION IF EXISTS _ST_DWithin (geog1 geography, geog2 geography, tolerance float8, use_spheroid boolean );
DROP FUNCTION IF EXISTS _ST_CoveredBy (geog1 geography, geog2 geography);
DROP FUNCTION IF EXISTS ST_Covers (geog1 geography, geog2 geography);
DROP FUNCTION IF EXISTS ST_DWithin (geog1 geography, geog2 geography, tolerance float8, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_CoveredBy (geog1 geography, geog2 geography);
DROP FUNCTION IF EXISTS ST_Intersects (geog1 geography, geog2 geography);
DROP FUNCTION IF EXISTS ST_Buffer (geography, float8);
DROP FUNCTION IF EXISTS ST_Buffer (geography, float8, integer);
DROP FUNCTION IF EXISTS ST_Buffer (geography, float8, text);
DROP FUNCTION IF EXISTS ST_Buffer (text, float8);
DROP FUNCTION IF EXISTS ST_Buffer (text, float8, integer);
DROP FUNCTION IF EXISTS ST_Buffer (text, float8, text);
DROP FUNCTION IF EXISTS ST_Intersection (geography, geography);
DROP FUNCTION IF EXISTS ST_Intersection (text, text);
DROP FUNCTION IF EXISTS ST_Covers (text, text);
DROP FUNCTION IF EXISTS ST_CoveredBy (text, text);
DROP FUNCTION IF EXISTS ST_DWithin (text, text, float8);
DROP FUNCTION IF EXISTS ST_Intersects (text, text);
DROP FUNCTION IF EXISTS ST_ClosestPoint (geography, geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_ClosestPoint (text, text);
DROP FUNCTION IF EXISTS ST_ShortestLine (geography, geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_ShortestLine (text, text);
DROP FUNCTION IF EXISTS ST_LineSubstring (geography, float8, float8);
DROP FUNCTION IF EXISTS ST_LineSubstring (text, float8, float8);
DROP FUNCTION IF EXISTS ST_LineLocatePoint (geography, geography, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_LineLocatePoint (text, text);
DROP FUNCTION IF EXISTS ST_LineInterpolatePoints (geography, float8, use_spheroid boolean , repeat boolean );
DROP FUNCTION IF EXISTS ST_LineInterpolatePoints (text, float8);
DROP FUNCTION IF EXISTS ST_LineInterpolatePoint (geography, float8, use_spheroid boolean );
DROP FUNCTION IF EXISTS ST_LineInterpolatePoint (text, float8);
DROP FUNCTION IF EXISTS ST_DistanceSphere (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_DistanceSphere (geom1 geometry, geom2 geometry, radius float8);
DROP FUNCTION IF EXISTS postgis_type_name (geomname varchar, coord_dimension integer, use_new_name boolean );
DROP FUNCTION IF EXISTS postgis_constraint_srid (geomschema text, geomtable text, geomcolumn text);
DROP FUNCTION IF EXISTS postgis_constraint_dims (geomschema text, geomtable text, geomcolumn text);
DROP FUNCTION IF EXISTS postgis_constraint_type (geomschema text, geomtable text, geomcolumn text);
DROP FUNCTION IF EXISTS ST_3DDistance (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DMaxDistance (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DClosestPoint (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DShortestLine (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_3DLongestLine (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS ST_CoordDim (Geometry geometry);
DROP FUNCTION IF EXISTS ST_CurveToLine (geom geometry, tol float8 , toltype integer , flags integer );
DROP FUNCTION IF EXISTS ST_HasArc (Geometry geometry);
DROP FUNCTION IF EXISTS ST_LineToCurve (Geometry geometry);
DROP FUNCTION IF EXISTS ST_NumCurves (Geometry geometry);
DROP FUNCTION IF EXISTS ST_CurveN (Geometry geometry, i integer);
DROP FUNCTION IF EXISTS ST_Point (float8, float8);
DROP FUNCTION IF EXISTS ST_Point (float8, float8, srid integer);
DROP FUNCTION IF EXISTS ST_PointZ (XCoordinate float8, YCoordinate float8, ZCoordinate float8, srid integer );
DROP FUNCTION IF EXISTS ST_PointM (XCoordinate float8, YCoordinate float8, MCoordinate float8, srid integer );
DROP FUNCTION IF EXISTS ST_PointZM (XCoordinate float8, YCoordinate float8, ZCoordinate float8, MCoordinate float8, srid integer );
DROP FUNCTION IF EXISTS ST_Polygon (geometry, int);
DROP FUNCTION IF EXISTS ST_WKBToSQL (WKB bytea);
DROP FUNCTION IF EXISTS ST_LocateBetween (Geometry geometry, FromMeasure float8, ToMeasure float8, LeftRightOffset float8 );
DROP FUNCTION IF EXISTS ST_LocateAlong (Geometry geometry, Measure float8, LeftRightOffset float8 );
DROP FUNCTION IF EXISTS ST_LocateBetweenElevations (Geometry geometry, FromElevation float8, ToElevation float8);
DROP FUNCTION IF EXISTS ST_InterpolatePoint (Line geometry, Point geometry);
DROP FUNCTION IF EXISTS ST_Hexagon (size float8, cell_i integer, cell_j integer, origin geometry );
DROP FUNCTION IF EXISTS ST_Square (size float8, cell_i integer, cell_j integer, origin geometry );
DROP FUNCTION IF EXISTS ST_HexagonGrid (size float8, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer);
DROP FUNCTION IF EXISTS ST_SquareGrid (size float8, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer);
DROP FUNCTION IF EXISTS contains_2d (box2df, geometry);
DROP FUNCTION IF EXISTS is_contained_2d (box2df, geometry);
DROP FUNCTION IF EXISTS overlaps_2d (box2df, geometry);
DROP FUNCTION IF EXISTS overlaps_2d (box2df, box2df);
DROP FUNCTION IF EXISTS contains_2d (box2df, box2df);
DROP FUNCTION IF EXISTS is_contained_2d (box2df, box2df);
DROP FUNCTION IF EXISTS contains_2d (geometry, box2df);
DROP FUNCTION IF EXISTS is_contained_2d (geometry, box2df);
DROP FUNCTION IF EXISTS overlaps_2d (geometry, box2df);
DROP FUNCTION IF EXISTS overlaps_nd (gidx, geometry);
DROP FUNCTION IF EXISTS overlaps_nd (gidx, gidx);
DROP FUNCTION IF EXISTS overlaps_nd (geometry, gidx);
DROP FUNCTION IF EXISTS geom2d_brin_inclusion_add_value (internal, internal, internal, internal);
DROP FUNCTION IF EXISTS geom3d_brin_inclusion_add_value (internal, internal, internal, internal);
DROP FUNCTION IF EXISTS geom4d_brin_inclusion_add_value (internal, internal, internal, internal);
DROP FUNCTION IF EXISTS ST_SimplifyPolygonHull (geom geometry, vertex_fraction float8, is_outer boolean );
DROP FUNCTION IF EXISTS ST_ConcaveHull (param_geom geometry, param_pctconvex float, param_allow_holes boolean );
DROP FUNCTION IF EXISTS _ST_AsX3D (integer, geometry, integer, integer, text);
DROP FUNCTION IF EXISTS ST_AsX3D (geom geometry, maxdecimaldigits integer , options integer );
DROP FUNCTION IF EXISTS ST_Angle (line1 geometry, line2 geometry);
DROP FUNCTION IF EXISTS ST_3DLineInterpolatePoint (geometry, float8);
DROP FUNCTION IF EXISTS geometry_spgist_config_2d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_choose_2d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_picksplit_2d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_inner_consistent_2d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_leaf_consistent_2d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_compress_2d (internal);
DROP FUNCTION IF EXISTS geometry_overlaps_3d (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_contains_3d (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_contained_3d (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_same_3d (geom1 geometry, geom2 geometry);
DROP FUNCTION IF EXISTS geometry_spgist_config_3d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_choose_3d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_picksplit_3d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_inner_consistent_3d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_leaf_consistent_3d (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_compress_3d (internal);
DROP FUNCTION IF EXISTS geometry_spgist_config_nd (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_choose_nd (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_picksplit_nd (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_inner_consistent_nd (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_leaf_consistent_nd (internal, internal);
DROP FUNCTION IF EXISTS geometry_spgist_compress_nd (internal);
DROP FUNCTION IF EXISTS geography_spgist_config_nd (internal, internal);
DROP FUNCTION IF EXISTS geography_spgist_choose_nd (internal, internal);
DROP FUNCTION IF EXISTS geography_spgist_picksplit_nd (internal, internal);
DROP FUNCTION IF EXISTS geography_spgist_inner_consistent_nd (internal, internal);
DROP FUNCTION IF EXISTS geography_spgist_leaf_consistent_nd (internal, internal);
DROP FUNCTION IF EXISTS geography_spgist_compress_nd (internal);
DROP FUNCTION IF EXISTS ST_Letters (letters text, font json );
DROP FUNCTION IF EXISTS ST_RemoveIrrelevantPointsForView (geometry, box2d, boolean );
DROP FUNCTION IF EXISTS ST_RemoveSmallParts (geometry, double precision, double precision);
-- Drop all types if unused in column types.
DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'spheroid'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS spheroid CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'geometry'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS geometry CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'box3d'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS box3d CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'box2d'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS box2d CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'box2df'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS box2df CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'gidx'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS gidx CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'geometry_dump'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS geometry_dump CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'valid_detail'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS valid_detail CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'geography'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'spheroid','geometry','box3d','box2d','box2df','gidx','geometry_dump','valid_detail','geography' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS geography CASCADE;

-- Drop all support functions.
DROP FUNCTION IF EXISTS postgis_index_supportfn  (internal);
-- Drop all functions needed for types definition.
DROP FUNCTION IF EXISTS spheroid_in (cstring);
DROP FUNCTION IF EXISTS spheroid_out (spheroid);
DROP FUNCTION IF EXISTS geometry_in (cstring);
DROP FUNCTION IF EXISTS geometry_out (geometry);
DROP FUNCTION IF EXISTS geometry_typmod_in (cstring[]);
DROP FUNCTION IF EXISTS geometry_typmod_out (integer);
DROP FUNCTION IF EXISTS geometry_analyze (internal);
DROP FUNCTION IF EXISTS geometry_recv (internal);
DROP FUNCTION IF EXISTS geometry_send (geometry);
DROP FUNCTION IF EXISTS box3d_in (cstring);
DROP FUNCTION IF EXISTS box3d_out (box3d);
DROP FUNCTION IF EXISTS box2d_in (cstring);
DROP FUNCTION IF EXISTS box2d_out (box2d);
DROP FUNCTION IF EXISTS box2df_in (cstring);
DROP FUNCTION IF EXISTS box2df_out (box2df);
DROP FUNCTION IF EXISTS gidx_in (cstring);
DROP FUNCTION IF EXISTS gidx_out (gidx);
DROP FUNCTION IF EXISTS geography_typmod_in (cstring[]);
DROP FUNCTION IF EXISTS geography_typmod_out (integer);
DROP FUNCTION IF EXISTS geography_in (cstring, oid, integer);
DROP FUNCTION IF EXISTS geography_out (geography);
DROP FUNCTION IF EXISTS geography_recv (internal, oid, integer);
DROP FUNCTION IF EXISTS geography_send (geography);
DROP FUNCTION IF EXISTS geography_analyze (internal);
-- Drop all tables.
DROP TABLE IF EXISTS spatial_ref_sys;
-- Drop all schemas.

COMMIT;
