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
-- Generated on: 2024-11-14 00:30:53
--           by: ../utils/create_uninstall.pl
--         from: topology.sql
--
-- Do not edit manually, your changes will be lost.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

BEGIN;

-- Drop all views.
-- Drop all aggregates.
DROP AGGREGATE IF EXISTS topology.TopoElementArray_agg (topology.TopoElement);
-- Drop all operators classes and families.
-- Drop all operators.
-- Drop all casts.
DROP CAST IF EXISTS (topology.TopoGeometry AS Geometry);
DROP CAST IF EXISTS (topology.TopoGeometry AS int[]);
-- Drop all table triggers.
DROP TRIGGER IF EXISTS layer_integrity_checks ON topology.layer;
-- Drop all functions except 0 needed for type definition.
DROP FUNCTION IF EXISTS topology.LayerTrigger ();
DROP FUNCTION IF EXISTS topology.RelationTrigger ();
DROP FUNCTION IF EXISTS topology.DropTopoGeometryColumn (schema varchar, tbl varchar, col varchar);
DROP FUNCTION IF EXISTS topology.CreateTopoGeom (toponame varchar, tg_type integer, layer_id integer, tg_objs topology.TopoElementArray);
DROP FUNCTION IF EXISTS topology.CreateTopoGeom (toponame varchar, tg_type integer, layer_id integer);
DROP FUNCTION IF EXISTS topology.GetTopologyName (topoid integer);
DROP FUNCTION IF EXISTS topology.GetTopologyId (toponame varchar);
DROP FUNCTION IF EXISTS topology.GetTopologySRID (toponame varchar);
DROP FUNCTION IF EXISTS topology.GetTopoGeomElementArray (toponame varchar, layer_id integer, tgid integer);
DROP FUNCTION IF EXISTS topology.GetTopoGeomElementArray (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.GetTopoGeomElements (toponame varchar, layerid integer, tgid integer);
DROP FUNCTION IF EXISTS topology.GetTopoGeomElements (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.Geometry (topogeom topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.TopoElement (topo topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.DropTopology (atopology varchar);
DROP FUNCTION IF EXISTS topology.intersects (tg1 topology.TopoGeometry, tg2 topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.equals (tg1 topology.TopoGeometry, tg2 topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.GetNodeByPoint (atopology varchar, apoint geometry, tol1 float8);
DROP FUNCTION IF EXISTS topology.GetEdgeByPoint (atopology varchar, apoint geometry, tol1 float8);
DROP FUNCTION IF EXISTS topology.GetFaceByPoint (atopology varchar, apoint geometry, tol1 float8);
DROP FUNCTION IF EXISTS topology.GetFaceContainingPoint (  atopology text,  apoint geometry);
DROP FUNCTION IF EXISTS topology._st_mintolerance (ageom Geometry);
DROP FUNCTION IF EXISTS topology._st_mintolerance (atopology varchar, ageom Geometry);
DROP FUNCTION IF EXISTS topology.AddNode (atopology varchar, apoint geometry, allowEdgeSplitting boolean , setContainingFace boolean );
DROP FUNCTION IF EXISTS topology.AddEdge (atopology varchar, aline geometry);
DROP FUNCTION IF EXISTS topology.AddFace (atopology varchar, apoly geometry, force_new boolean );
DROP FUNCTION IF EXISTS topology.TopoGeo_AddPoint (atopology varchar, apoint geometry, tolerance float8 );
DROP FUNCTION IF EXISTS topology.TopoGeo_AddLinestring (atopology varchar, aline geometry, tolerance float8 );
DROP FUNCTION IF EXISTS topology.TopoGeo_AddPolygon (atopology varchar, apoly geometry, tolerance float8 );
DROP FUNCTION IF EXISTS topology.TopoGeo_LoadGeometry (atopology varchar, ageom geometry, tolerance float8 );
DROP FUNCTION IF EXISTS topology.TopoGeo_AddGeometry (atopology varchar, ageom geometry, tolerance float8 );
DROP FUNCTION IF EXISTS topology._TopoGeo_AddLinestringNoFace (atopology varchar, aline geometry, tolerance float8 );
DROP FUNCTION IF EXISTS topology._RegisterMissingFaces (atopology varchar);
DROP FUNCTION IF EXISTS topology.polygonize (toponame varchar);
DROP FUNCTION IF EXISTS topology.TopoElementArray_append (topology.TopoElementArray, topology.TopoElement);
DROP FUNCTION IF EXISTS topology.GeometryType (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.ST_GeometryType (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.ST_Srid (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.clearTopoGeom (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.ST_Simplify (tg topology.TopoGeometry, tolerance float8);
DROP FUNCTION IF EXISTS topology.toTopoGeom (ageom Geometry, atopology varchar, alayer int, atolerance float8 );
DROP FUNCTION IF EXISTS topology.toTopoGeom (ageom Geometry, tg topology.TopoGeometry, atolerance float8 );
DROP FUNCTION IF EXISTS topology.TopoGeom_addElement (tg topology.TopoGeometry, el topology.TopoElement);
DROP FUNCTION IF EXISTS topology.TopoGeom_remElement (tg topology.TopoGeometry, el topology.TopoElement);
DROP FUNCTION IF EXISTS topology.TopoGeom_addTopoGeom (tgt topology.TopoGeometry, src topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology._AsGMLNode (id int, point geometry, nsprefix_in text, prec int, options int, idprefix text, gmlver int);
DROP FUNCTION IF EXISTS topology._AsGMLEdge (edge_id int, start_node int,end_node int, line geometry, visitedTable regclass, nsprefix_in text, prec int, options int, idprefix text, gmlver int);
DROP FUNCTION IF EXISTS topology._AsGMLFace (toponame text, face_id int, visitedTable regclass, nsprefix_in text, prec int, options int, idprefix text, gmlver int);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry, nsprefix_in text, precision_in int, options_in int, visitedTable regclass, idprefix text, gmlver int);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry,nsprefix text, prec int, options int, visitedTable regclass, idprefix text);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry, nsprefix text, prec int, options int, vis regclass);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry, nsprefix text, prec int, opts int);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry, nsprefix text);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry, visitedTable regclass);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry, visitedTable regclass, nsprefix text);
DROP FUNCTION IF EXISTS topology.AsGML (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.AsTopoJSON (tg topology.TopoGeometry, edgeMapTable regclass);
DROP FUNCTION IF EXISTS topology.ST_GetFaceEdges (toponame varchar, face_id integer);
DROP FUNCTION IF EXISTS topology.ST_NewEdgeHeal (toponame varchar, e1id integer, e2id integer);
DROP FUNCTION IF EXISTS topology.ST_ModEdgeHeal (toponame varchar, e1id integer, e2id integer);
DROP FUNCTION IF EXISTS topology.ST_RemEdgeNewFace (toponame varchar, e1id integer);
DROP FUNCTION IF EXISTS topology.ST_RemEdgeModFace (toponame varchar, e1id integer);
DROP FUNCTION IF EXISTS topology.ST_GetFaceGeometry (toponame varchar, aface integer);
DROP FUNCTION IF EXISTS topology.ST_AddIsoNode (atopology varchar, aface integer, apoint geometry);
DROP FUNCTION IF EXISTS topology.ST_MoveIsoNode (atopology character varying, anode integer, apoint geometry);
DROP FUNCTION IF EXISTS topology.ST_RemoveIsoNode (atopology varchar, anode integer);
DROP FUNCTION IF EXISTS topology.ST_RemIsoNode (varchar, integer);
DROP FUNCTION IF EXISTS topology.ST_RemoveIsoEdge (atopology varchar, anedge integer);
DROP FUNCTION IF EXISTS topology.ST_NewEdgesSplit (atopology varchar, anedge integer, apoint geometry);
DROP FUNCTION IF EXISTS topology.ST_ModEdgeSplit (atopology varchar, anedge integer, apoint geometry);
DROP FUNCTION IF EXISTS topology.ST_AddIsoEdge (atopology varchar, anode integer, anothernode integer, acurve geometry);
DROP FUNCTION IF EXISTS topology._ST_AdjacentEdges (atopology varchar, anode integer, anedge integer);
DROP FUNCTION IF EXISTS topology.ST_ChangeEdgeGeom (atopology varchar, anedge integer, acurve geometry);
DROP FUNCTION IF EXISTS topology.ST_AddEdgeNewFaces (atopology varchar, anode integer, anothernode integer, acurve geometry);
DROP FUNCTION IF EXISTS topology.ST_AddEdgeModFace (atopology varchar, anode integer, anothernode integer, acurve geometry);
DROP FUNCTION IF EXISTS topology.ST_InitTopoGeo (atopology varchar);
DROP FUNCTION IF EXISTS topology.ST_CreateTopoGeo (atopology varchar, acollection geometry);
DROP FUNCTION IF EXISTS topology.GetRingEdges (atopology varchar, anedge int, maxedges int );
DROP FUNCTION IF EXISTS topology.GetNodeEdges (atopology varchar, anode int);
DROP FUNCTION IF EXISTS topology.AddToSearchPath (a_schema_name varchar);
DROP FUNCTION IF EXISTS topology.AddTopoGeometryColumn (toponame varchar, schema varchar, tbl varchar, col varchar, ltype varchar, child integer);
DROP FUNCTION IF EXISTS topology.AddTopoGeometryColumn (varchar, varchar, varchar, varchar, varchar);
DROP FUNCTION IF EXISTS topology.RenameTopoGeometryColumn (layer_table regclass, feature_column name, new_name name);
DROP FUNCTION IF EXISTS topology.CreateTopology (atopology varchar, srid integer, prec float8, hasZ boolean);
DROP FUNCTION IF EXISTS topology.CreateTopology (toponame varchar, srid integer, prec float8);
DROP FUNCTION IF EXISTS topology.CreateTopology (varchar, integer);
DROP FUNCTION IF EXISTS topology.CreateTopology (varchar);
DROP FUNCTION IF EXISTS topology.TopologySummary (atopology varchar);
DROP FUNCTION IF EXISTS topology.CopyTopology (atopology varchar, newtopo varchar);
DROP FUNCTION IF EXISTS topology.FindTopology (topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.FindTopology (regclass, name);
DROP FUNCTION IF EXISTS topology.FindTopology (name, name, name);
DROP FUNCTION IF EXISTS topology.FindTopology (text);
DROP FUNCTION IF EXISTS topology.FindTopology (integer);
DROP FUNCTION IF EXISTS topology.FindLayer (tg topology.TopoGeometry);
DROP FUNCTION IF EXISTS topology.FindLayer (layer_table regclass, feature_column name);
DROP FUNCTION IF EXISTS topology.FindLayer (schema_name name, table_name name, feature_column name);
DROP FUNCTION IF EXISTS topology.FindLayer (topology_id integer, layer_id integer);
DROP FUNCTION IF EXISTS topology.populate_topology_layer ();
DROP FUNCTION IF EXISTS topology.RenameTopology (old_name varchar, new_name varchar);
DROP FUNCTION IF EXISTS topology._ValidateTopologyGetFaceShellMaximalEdgeRing (atopology varchar, aface int);
DROP FUNCTION IF EXISTS topology._ValidateTopologyGetRingEdges (starting_edge int);
DROP FUNCTION IF EXISTS topology._CheckEdgeLinking (curedge_edge_id INT, prevedge_edge_id INT, prevedge_next_left_edge INT, prevedge_next_right_edge INT);
DROP FUNCTION IF EXISTS topology._ValidateTopologyEdgeLinking (bbox geometry );
DROP FUNCTION IF EXISTS topology._ValidateTopologyRings (bbox geometry );
DROP FUNCTION IF EXISTS topology.ValidateTopology (toponame varchar, bbox geometry );
DROP FUNCTION IF EXISTS topology.ValidateTopologyRelation (toponame varchar);
DROP FUNCTION IF EXISTS topology.RemoveUnusedPrimitives (  atopology text,  bbox GEOMETRY );
DROP FUNCTION IF EXISTS topology.postgis_topology_scripts_installed ();
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
		WHERE t.typname = 'topology.TopoGeometry'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'topology.TopoGeometry','topology.TopoElement','topology.TopoElementArray','topology.GetFaceEdges_ReturnType','topology.ValidateTopology_ReturnType' )
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
DROP TYPE IF EXISTS topology.TopoGeometry CASCADE;

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
		WHERE t.typname = 'topology.TopoElement'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'topology.TopoGeometry','topology.TopoElement','topology.TopoElementArray','topology.GetFaceEdges_ReturnType','topology.ValidateTopology_ReturnType' )
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
DROP TYPE IF EXISTS topology.TopoElement CASCADE;

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
		WHERE t.typname = 'topology.TopoElementArray'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'topology.TopoGeometry','topology.TopoElement','topology.TopoElementArray','topology.GetFaceEdges_ReturnType','topology.ValidateTopology_ReturnType' )
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
DROP TYPE IF EXISTS topology.TopoElementArray CASCADE;

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
		WHERE t.typname = 'topology.GetFaceEdges_ReturnType'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'topology.TopoGeometry','topology.TopoElement','topology.TopoElementArray','topology.GetFaceEdges_ReturnType','topology.ValidateTopology_ReturnType' )
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
DROP TYPE IF EXISTS topology.GetFaceEdges_ReturnType CASCADE;

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
		WHERE t.typname = 'topology.ValidateTopology_ReturnType'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'topology.TopoGeometry','topology.TopoElement','topology.TopoElementArray','topology.GetFaceEdges_ReturnType','topology.ValidateTopology_ReturnType' )
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
DROP TYPE IF EXISTS topology.ValidateTopology_ReturnType CASCADE;

-- Drop all support functions.
-- Drop all functions needed for types definition.
-- Drop all tables.
DROP TABLE IF EXISTS topology.layer;
DROP TABLE IF EXISTS topology.topology;
-- Drop all schemas.
create schema undef_helper;
--{
--  StripFromSearchPath(schema_name)
--
-- Strips the specified schema from the database search path
--
-- This is a helper function for uninstall
-- We may want to move this function as a generic helper
--
CREATE OR REPLACE FUNCTION undef_helper.StripFromSearchPath(a_schema_name varchar)
RETURNS text
AS
$$
DECLARE
	var_result text;
	var_search_path text;
BEGIN
	SELECT reset_val INTO var_search_path FROM pg_settings WHERE name = 'search_path';
	IF var_search_path NOT LIKE '%' || quote_ident(a_schema_name) || '%' THEN
		var_result := a_schema_name || ' not in database search_path';
	ELSE
    var_search_path := btrim( regexp_replace(
        replace(var_search_path, a_schema_name, ''), ', *,', ','),
        ', ');
    RAISE NOTICE 'New search_path: %', var_search_path;
		EXECUTE 'ALTER DATABASE ' || quote_ident(current_database()) || ' SET search_path = ' || var_search_path;
		var_result := a_schema_name || ' has been stripped off database search_path ';
	END IF;

  RETURN var_result;
END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;

--} StripFromSearchPath
SELECT undef_helper.StripFromSearchPath('topology');
DROP SCHEMA IF EXISTS "topology";
DROP SCHEMA undef_helper CASCADE;

COMMIT;
