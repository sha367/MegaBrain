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
-- Generated on: 2024-11-14 00:31:13
--           by: ../../utils/create_unpackaged.pl
--          for: postgis_topology
--         from: -
--
-- Do not edit manually, your changes will be lost.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


-- complain if script is sourced in psql
\echo Use "CREATE EXTENSION postgis_topology to load this file. \quit

CREATE FUNCTION _postgis_package_object(type text, sig text)
RETURNS VOID
AS $$
DECLARE
	sql text;
	proc regproc;
	obj text := format('%s %s', type, sig);
BEGIN

	sql := format('ALTER EXTENSION postgis_topology ADD %s', obj);
	EXECUTE sql;
	RAISE NOTICE 'newly registered %', obj;

EXCEPTION
WHEN object_not_in_prerequisite_state THEN
  IF SQLERRM ~ '\mpostgis_topology\M'
  THEN
    RAISE NOTICE '% already registered', obj;
  ELSE
    RAISE EXCEPTION '%', SQLERRM;
  END IF;
WHEN
	undefined_function OR
	undefined_table OR
	undefined_object
	-- TODO: handle more exceptions ?
THEN
	RAISE NOTICE '% % does not exist yet', type, sig;
WHEN OTHERS THEN
	RAISE EXCEPTION 'Trying to add % to postgis_topology, got % (%)', obj, SQLERRM, SQLSTATE;
END;
$$ LANGUAGE 'plpgsql';
-- Register all views.
-- Register all tables.
SELECT _postgis_package_object('TABLE', 'topology.layer');
SELECT _postgis_package_object('TABLE', 'topology.topology');
-- Register all sequences.
SELECT _postgis_package_object('SEQUENCE', 'topology.topology_id_seq');
-- Register all aggregates.
SELECT _postgis_package_object('AGGREGATE', 'topology.TopoElementArray_agg (topology.TopoElement)');
-- Register all operators classes and families.
-- Register all operators.
-- Register all casts.
SELECT _postgis_package_object('CAST', '(topology.TopoGeometry AS Geometry)');
SELECT _postgis_package_object('CAST', '(topology.TopoGeometry AS int[])');
-- Register all functions.
SELECT _postgis_package_object('FUNCTION', 'topology.LayerTrigger ()');
SELECT _postgis_package_object('FUNCTION', 'topology.RelationTrigger ()');
SELECT _postgis_package_object('FUNCTION', 'topology.DropTopoGeometryColumn (schema varchar, tbl varchar, col varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.CreateTopoGeom (toponame varchar, tg_type integer, layer_id integer, tg_objs topology.TopoElementArray)');
SELECT _postgis_package_object('FUNCTION', 'topology.CreateTopoGeom (toponame varchar, tg_type integer, layer_id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopologyName (topoid integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopologyId (toponame varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopologySRID (toponame varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopoGeomElementArray (toponame varchar, layer_id integer, tgid integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopoGeomElementArray (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopoGeomElements (toponame varchar, layerid integer, tgid integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetTopoGeomElements (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.Geometry (topogeom topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoElement (topo topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.DropTopology (atopology varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.intersects (tg1 topology.TopoGeometry, tg2 topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.equals (tg1 topology.TopoGeometry, tg2 topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetNodeByPoint (atopology varchar, apoint geometry, tol1 float8)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetEdgeByPoint (atopology varchar, apoint geometry, tol1 float8)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetFaceByPoint (atopology varchar, apoint geometry, tol1 float8)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetFaceContainingPoint (
  atopology text,
  apoint geometry
)');
SELECT _postgis_package_object('FUNCTION', 'topology._st_mintolerance (ageom Geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology._st_mintolerance (atopology varchar, ageom Geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.AddNode (atopology varchar, apoint geometry, allowEdgeSplitting boolean , setContainingFace boolean )');
SELECT _postgis_package_object('FUNCTION', 'topology.AddEdge (atopology varchar, aline geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.AddFace (atopology varchar, apoly geometry, force_new boolean )');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeo_AddPoint (atopology varchar, apoint geometry, tolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeo_AddLinestring (atopology varchar, aline geometry, tolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeo_AddPolygon (atopology varchar, apoly geometry, tolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeo_LoadGeometry (atopology varchar, ageom geometry, tolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeo_AddGeometry (atopology varchar, ageom geometry, tolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology._TopoGeo_AddLinestringNoFace (atopology varchar, aline geometry, tolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology._RegisterMissingFaces (atopology varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.polygonize (toponame varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoElementArray_append (topology.TopoElementArray, topology.TopoElement)');
SELECT _postgis_package_object('FUNCTION', 'topology.GeometryType (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_GeometryType (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_Srid (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.clearTopoGeom (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_Simplify (tg topology.TopoGeometry, tolerance float8)');
SELECT _postgis_package_object('FUNCTION', 'topology.toTopoGeom (ageom Geometry, atopology varchar, alayer int, atolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology.toTopoGeom (ageom Geometry, tg topology.TopoGeometry, atolerance float8 )');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeom_addElement (tg topology.TopoGeometry, el topology.TopoElement)');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeom_remElement (tg topology.TopoGeometry, el topology.TopoElement)');
SELECT _postgis_package_object('FUNCTION', 'topology.TopoGeom_addTopoGeom (tgt topology.TopoGeometry, src topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology._AsGMLNode (id int, point geometry, nsprefix_in text, prec int, options int, idprefix text, gmlver int)');
SELECT _postgis_package_object('FUNCTION', 'topology._AsGMLEdge (edge_id int, start_node int,end_node int, line geometry, visitedTable regclass, nsprefix_in text, prec int, options int, idprefix text, gmlver int)');
SELECT _postgis_package_object('FUNCTION', 'topology._AsGMLFace (toponame text, face_id int, visitedTable regclass, nsprefix_in text, prec int, options int, idprefix text, gmlver int)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry, nsprefix_in text, precision_in int, options_in int, visitedTable regclass, idprefix text, gmlver int)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry,nsprefix text, prec int, options int, visitedTable regclass, idprefix text)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry, nsprefix text, prec int, options int, vis regclass)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry, nsprefix text, prec int, opts int)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry, nsprefix text)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry, visitedTable regclass)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry, visitedTable regclass, nsprefix text)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsGML (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.AsTopoJSON (tg topology.TopoGeometry, edgeMapTable regclass)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_GetFaceEdges (toponame varchar, face_id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_NewEdgeHeal (toponame varchar, e1id integer, e2id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_ModEdgeHeal (toponame varchar, e1id integer, e2id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_RemEdgeNewFace (toponame varchar, e1id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_RemEdgeModFace (toponame varchar, e1id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_GetFaceGeometry (toponame varchar, aface integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_AddIsoNode (atopology varchar, aface integer, apoint geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_MoveIsoNode (atopology character varying, anode integer, apoint geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_RemoveIsoNode (atopology varchar, anode integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_RemIsoNode (varchar, integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_RemoveIsoEdge (atopology varchar, anedge integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_NewEdgesSplit (atopology varchar, anedge integer, apoint geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_ModEdgeSplit (atopology varchar, anedge integer, apoint geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_AddIsoEdge (atopology varchar, anode integer, anothernode integer, acurve geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology._ST_AdjacentEdges (atopology varchar, anode integer, anedge integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_ChangeEdgeGeom (atopology varchar, anedge integer, acurve geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_AddEdgeNewFaces (atopology varchar, anode integer, anothernode integer, acurve geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_AddEdgeModFace (atopology varchar, anode integer, anothernode integer, acurve geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_InitTopoGeo (atopology varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.ST_CreateTopoGeo (atopology varchar, acollection geometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.GetRingEdges (atopology varchar, anedge int, maxedges int )');
SELECT _postgis_package_object('FUNCTION', 'topology.GetNodeEdges (atopology varchar, anode int)');
SELECT _postgis_package_object('FUNCTION', 'topology.AddToSearchPath (a_schema_name varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.AddTopoGeometryColumn (toponame varchar, schema varchar, tbl varchar, col varchar, ltype varchar, child integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.AddTopoGeometryColumn (varchar, varchar, varchar, varchar, varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.RenameTopoGeometryColumn (layer_table regclass, feature_column name, new_name name)');
SELECT _postgis_package_object('FUNCTION', 'topology.CreateTopology (atopology varchar, srid integer, prec float8, hasZ boolean)');
SELECT _postgis_package_object('FUNCTION', 'topology.CreateTopology (toponame varchar, srid integer, prec float8)');
SELECT _postgis_package_object('FUNCTION', 'topology.CreateTopology (varchar, integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.CreateTopology (varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.TopologySummary (atopology varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.CopyTopology (atopology varchar, newtopo varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindTopology (topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindTopology (regclass, name)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindTopology (name, name, name)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindTopology (text)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindTopology (integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindLayer (tg topology.TopoGeometry)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindLayer (layer_table regclass, feature_column name)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindLayer (schema_name name, table_name name, feature_column name)');
SELECT _postgis_package_object('FUNCTION', 'topology.FindLayer (topology_id integer, layer_id integer)');
SELECT _postgis_package_object('FUNCTION', 'topology.populate_topology_layer ()');
SELECT _postgis_package_object('FUNCTION', 'topology.RenameTopology (old_name varchar, new_name varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology._ValidateTopologyGetFaceShellMaximalEdgeRing (atopology varchar, aface int)');
SELECT _postgis_package_object('FUNCTION', 'topology._ValidateTopologyGetRingEdges (starting_edge int)');
SELECT _postgis_package_object('FUNCTION', 'topology._CheckEdgeLinking (curedge_edge_id INT, prevedge_edge_id INT, prevedge_next_left_edge INT, prevedge_next_right_edge INT)');
SELECT _postgis_package_object('FUNCTION', 'topology._ValidateTopologyEdgeLinking (bbox geometry )');
SELECT _postgis_package_object('FUNCTION', 'topology._ValidateTopologyRings (bbox geometry )');
SELECT _postgis_package_object('FUNCTION', 'topology.ValidateTopology (toponame varchar, bbox geometry )');
SELECT _postgis_package_object('FUNCTION', 'topology.ValidateTopologyRelation (toponame varchar)');
SELECT _postgis_package_object('FUNCTION', 'topology.RemoveUnusedPrimitives (
  atopology text,
  bbox GEOMETRY )');
SELECT _postgis_package_object('FUNCTION', 'topology.postgis_topology_scripts_installed ()');
-- Register all types.
SELECT _postgis_package_object('TYPE', 'topology.TopoGeometry');
SELECT _postgis_package_object('TYPE', 'topology.TopoElement');
SELECT _postgis_package_object('TYPE', 'topology.TopoElementArray');
SELECT _postgis_package_object('TYPE', 'topology.GetFaceEdges_ReturnType');
SELECT _postgis_package_object('TYPE', 'topology.ValidateTopology_ReturnType');
DROP FUNCTION _postgis_package_object(text, text);

-- Security checks
DO LANGUAGE 'plpgsql' $BODY$
DECLARE
	rec RECORD;
	sql TEXT;
BEGIN

	-- Check extension functions are all owned by a superuser
	FOR rec IN
		SELECT
			p.oid,
			p.proowner,
			e.extowner,
			r.rolsuper
		FROM pg_catalog.pg_depend AS d
			INNER JOIN pg_catalog.pg_extension AS e ON (d.refobjid = e.oid)
			INNER JOIN pg_catalog.pg_proc AS p ON (d.objid = p.oid)
			INNER JOIN pg_catalog.pg_roles AS r ON (r.oid = p.proowner)
		WHERE d.refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass
		AND deptype = 'e'
		AND e.extname = 'postgis_topology'
		AND d.classid = 'pg_catalog.pg_proc'::pg_catalog.regclass
	LOOP
		IF NOT rec.rolsuper THEN
			RAISE EXCEPTION 'Function % is owned by non-superuser %',
					rec.oid::regprocedure, rec.proowner::regrole;
		END IF;
		IF NOT rec.proowner = rec.extowner THEN
			RAISE NOTICE
					'Changing ownership of function % from % to % to match ext',
					rec.oid::regprocedure, rec.proowner::regrole,
					rec.extowner::regrole;
			sql := format(
				'ALTER FUNCTION %s OWNER TO %I',
				rec.oid::regprocedure,
				rec.extowner::regrole
			);
			EXECUTE sql;
		END IF;
	END LOOP;

	-- TODO: check ownership of more objects ?

END;
$BODY$;



-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--
--
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- Copyright (C) 2011-2012 Sandro Santilli <strk@kbt.io>
-- Copyright (C) 2010-2013 Regina Obe <lr@pcorp.us>
-- Copyright (C) 2009      Paul Ramsey <pramsey@cleverelephant.ca>
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--
-- This file contains utility functions for use by upgrade scripts
-- Changes to this file affect *upgrade*.sql script.
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

--
-- Helper function to drop functions when they match the full signature
--
-- Requires name and __exact arguments__ as extracted from pg_catalog.pg_get_function_arguments
-- You can extract the old function arguments using a query like:
--
--  SELECT pg_get_function_arguments('st_intersection(geometry,geometry,float8)'::regprocedure);
--
-- Or:
--
--  SELECT pg_get_function_arguments(oid) as args
--  FROM pg_catalog.pg_proc
--  WHERE proname = 'st_asgeojson'
--
CREATE OR REPLACE FUNCTION _postgis_drop_function_by_identity(
	function_name text,
	function_arguments text,
	deprecated_in_version text DEFAULT 'xxx'
) RETURNS void AS $$
DECLARE
	sql text;
	postgis_namespace OID;
	matching_function pg_catalog.pg_proc;
	detail TEXT;
	deprecated_suffix TEXT := '_deprecated_by_postgis_' || deprecated_in_version;
BEGIN

	-- Fetch install namespace for PostGIS
	SELECT n.oid
	FROM pg_catalog.pg_proc p
	JOIN pg_catalog.pg_namespace n ON p.pronamespace = n.oid
	WHERE proname = 'postgis_full_version'
	INTO postgis_namespace;

	-- Find a function matching the given signature
	SELECT *
	FROM pg_catalog.pg_proc p
	WHERE pronamespace = postgis_namespace
	AND pg_catalog.LOWER(p.proname) = pg_catalog.LOWER(function_name)
	AND pg_catalog.pg_function_is_visible(p.oid)
	AND pg_catalog.LOWER(pg_catalog.pg_get_function_identity_arguments(p.oid)) = pg_catalog.LOWER(function_arguments)
	INTO matching_function;

	IF matching_function.oid IS NOT NULL THEN
		sql := format('ALTER FUNCTION %s RENAME TO %I',
			matching_function.oid::regprocedure,
			matching_function.proname || deprecated_suffix
		);
		RAISE DEBUG 'SQL query: %', sql;
		BEGIN
			EXECUTE sql;
		EXCEPTION
			WHEN OTHERS THEN
				GET STACKED DIAGNOSTICS detail := PG_EXCEPTION_DETAIL;
				RAISE EXCEPTION 'Could not rename deprecated function %, got % (%)',
					matching_function, SQLERRM, SQLSTATE
				USING DETAIL = detail;
		END;
	END IF;

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION _postgis_drop_function_by_signature(
  function_signature text,
  deprecated_in_version text DEFAULT 'xxx'
) RETURNS void AS $$
DECLARE
	sql text;
	detail TEXT;
	newname TEXT;
	proc RECORD;
	deprecated_suffix TEXT := '_deprecated_by_postgis_' || deprecated_in_version;
BEGIN

	-- Check if the deprecated function exists
	BEGIN

		SELECT *
		FROM pg_catalog.pg_proc
		WHERE oid = function_signature::regprocedure
		INTO proc;

	EXCEPTION
	WHEN undefined_function OR undefined_object THEN
		RAISE DEBUG 'Deprecated function % does not exist', function_signature;
		RETURN;
	WHEN others THEN
		GET STACKED DIAGNOSTICS detail := PG_EXCEPTION_DETAIL;
		RAISE WARNING 'Could not check deprecated function % existence, got % (%), assuming it does not exist',
			function_signature, SQLERRM, SQLSTATE
		USING DETAIL = detail;
		RETURN;
	END;

	sql := pg_catalog.format(
		'ALTER FUNCTION %s RENAME TO %I',
		proc.oid::regprocedure,
		proc.proname || deprecated_suffix
	);
	EXECUTE sql;

END;
$$ LANGUAGE plpgsql;
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- Copyright (C) 2012 Regina Obe <lr@pcorp.us>
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-- These are functions where the argument names may have changed  --
-- so have to be dropped before upgrade can happen for 9.0+ --
-- argument names changed --
-- we might want to take toTopoGeom one out before release since
-- I don't think too many people installed the bad name
SELECT _postgis_drop_function_by_signature('topology.toTopoGeom(Geometry, varchar, int, float8)');

-- used to be in public, will now be moved to topology
SELECT _postgis_drop_function_by_signature('public.postgis_topology_scripts_installed()');

-- Removed in 2.2.0 when topology API moved to liblwgeom
SELECT _postgis_drop_function_by_signature('topology._ST_RemEdgeCheck(varchar, integer, integer, integer, integer)', '2.2.0');
-- Removed in 2.2.0 when topology API moved to liblwgeom
SELECT _postgis_drop_function_by_signature('topology._ST_AddFaceSplit(varchar, integer, integer, boolean)', '2.2.0');

-- Added optional bbox parameter in 3.2.0
SELECT _postgis_drop_function_by_signature('topology.validatetopology(varchar)', '3.2.0');

-- Merged the two function into one with both allowEdgeSplitting and setContainingFace parameters
-- being optional (3.2.0)
SELECT _postgis_drop_function_by_signature('topology.AddNode(varchar, geometry)', '3.2.0');
SELECT _postgis_drop_function_by_signature('topology.AddNode(varchar, geometry, boolean, boolean)', '3.2.0');


--
-- UPGRADE SCRIPT TO PostGIS 3.5.0
--

LOAD '$libdir/postgis_topology-3';

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

CREATE OR REPLACE FUNCTION topology.LayerTrigger()
  RETURNS trigger
AS
$$
DECLARE
  rec RECORD;
  ok BOOL;
  toponame varchar;
  query TEXT;
BEGIN

  --RAISE NOTICE 'LayerTrigger called % % at % level', TG_WHEN, TG_OP, TG_LEVEL;

  IF TG_OP = 'INSERT' THEN
    RAISE EXCEPTION 'LayerTrigger not meant to be called on INSERT';
  ELSIF TG_OP = 'UPDATE' THEN
    RAISE EXCEPTION 'The topology.layer table cannot be updated';
  END IF;

  -- Check for existence of any feature column referencing
  -- this layer
  FOR rec IN SELECT * FROM pg_namespace n, pg_class c, pg_attribute a
    WHERE text(n.nspname) = OLD.schema_name
    AND c.relnamespace = n.oid
    AND text(c.relname) = OLD.table_name
    AND a.attrelid = c.oid
    AND text(a.attname) = OLD.feature_column
  LOOP
    query = 'SELECT * '
         ' FROM ' || quote_ident(OLD.schema_name)
      || '.' || quote_ident(OLD.table_name)
      || ' WHERE layer_id('
      || quote_ident(OLD.feature_column)||') '
         '=' || OLD.layer_id
      || ' LIMIT 1';
    --RAISE NOTICE '%', query;
    FOR rec IN EXECUTE query
    LOOP
      RAISE NOTICE 'A feature referencing layer % of topology % still exists in %.%.%', OLD.layer_id, OLD.topology_id, OLD.schema_name, OLD.table_name, OLD.feature_column;
      RETURN NULL;
    END LOOP;
  END LOOP;

  -- Get topology name
  SELECT name FROM topology.topology INTO toponame
    WHERE id = OLD.topology_id;

  IF toponame IS NULL THEN
    RAISE NOTICE 'Could not find name of topology with id %',
      OLD.layer_id;
  END IF;

  -- Check if any record in the relation table references this layer
  FOR rec IN SELECT c.oid FROM pg_namespace n, pg_class c
    WHERE text(n.nspname) = toponame AND c.relnamespace = n.oid
          AND c.relname = 'relation'
  LOOP
    query = 'SELECT * '
         ' FROM ' || quote_ident(toponame)
      || '.relation '
         ' WHERE layer_id = '|| OLD.layer_id
      || ' LIMIT 1';
    --RAISE NOTICE '%', query;
    FOR rec IN EXECUTE query
    LOOP
      RAISE NOTICE 'A record in %.relation still references layer %', toponame, OLD.layer_id;
      RETURN NULL;
    END LOOP;
  END LOOP;

  RETURN OLD;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
-- Type topology.TopoGeometry -- LastUpdated: 101
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF 101 > version_from_num
     FROM _postgis_upgrade_info()
  THEN
      EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE TYPE topology.TopoGeometry AS (
  topology_id integer,
  layer_id integer,
  id integer,
  type integer -- 1: [multi]point, 2: [multi]line,
               -- 3: [multi]polygon, 4: collection
);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION topology.RelationTrigger()
  RETURNS trigger
AS
$$
DECLARE
  toponame varchar;
  topoid integer;
  plyr RECORD; -- parent layer
  rec RECORD;
  ok BOOL;

BEGIN
  IF TG_NARGS != 2 THEN
    RAISE EXCEPTION 'RelationTrigger called with wrong number of arguments';
  END IF;

  topoid = TG_ARGV[0];
  toponame = TG_ARGV[1];

  --RAISE NOTICE 'RelationTrigger called % % on %.relation for a %', TG_WHEN, TG_OP, toponame, TG_LEVEL;

  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'RelationTrigger not meant to be called on DELETE';
  END IF;

  -- Get layer info (and verify it exists)
  ok = false;
  FOR plyr IN EXECUTE 'SELECT * FROM topology.layer '
       'WHERE '
       ' topology_id = ' || topoid
    || ' AND'
       ' layer_id = ' || NEW.layer_id
  LOOP
    ok = true;
    EXIT;
  END LOOP;
  IF NOT ok THEN
    RAISE EXCEPTION 'Layer % does not exist in topology %',
      NEW.layer_id, topoid;
    RETURN NULL;
  END IF;

  IF plyr.level > 0 THEN -- this is hierarchical layer

    -- ElementType must be the layer child id
    IF NEW.element_type != plyr.child_id THEN
      RAISE EXCEPTION 'Type of elements in layer % must be set to its child layer id %', plyr.layer_id, plyr.child_id;
      RETURN NULL;
    END IF;

    -- ElementId must be an existent TopoGeometry in child layer
    ok = false;
    FOR rec IN EXECUTE 'SELECT topogeo_id FROM '
      || quote_ident(toponame) || '.relation '
         ' WHERE layer_id = ' || plyr.child_id
      || ' AND topogeo_id = ' || NEW.element_id
    LOOP
      ok = true;
      EXIT;
    END LOOP;
    IF NOT ok THEN
      RAISE EXCEPTION 'TopoGeometry % does not exist in the child layer %', NEW.element_id, plyr.child_id;
      RETURN NULL;
    END IF;

  ELSE -- this is a basic layer

    -- ElementType must be compatible with layer type
    IF plyr.feature_type != 4
      AND plyr.feature_type != NEW.element_type
    THEN
      RAISE EXCEPTION 'Element of type % is not compatible with layer of type %', NEW.element_type, plyr.feature_type;
      RETURN NULL;
    END IF;

    --
    -- Now lets see if the element is consistent, which
    -- is it exists in the topology tables.
    --

    --
    -- Element is a Node
    --
    IF NEW.element_type = 1
    THEN
      ok = false;
      FOR rec IN EXECUTE 'SELECT node_id FROM '
        || quote_ident(toponame) || '.node '
           ' WHERE node_id = ' || NEW.element_id
      LOOP
        ok = true;
        EXIT;
      END LOOP;
      IF NOT ok THEN
        RAISE EXCEPTION 'Node % does not exist in topology %', NEW.element_id, toponame;
        RETURN NULL;
      END IF;

    --
    -- Element is an Edge
    --
    ELSIF NEW.element_type = 2
    THEN
      ok = false;
      FOR rec IN EXECUTE 'SELECT edge_id FROM '
        || quote_ident(toponame) || '.edge_data '
           ' WHERE edge_id = ' || abs(NEW.element_id)
      LOOP
        ok = true;
        EXIT;
      END LOOP;
      IF NOT ok THEN
        RAISE EXCEPTION 'Edge % does not exist in topology %', NEW.element_id, toponame;
        RETURN NULL;
      END IF;

    --
    -- Element is a Face
    --
    ELSIF NEW.element_type = 3
    THEN
      IF NEW.element_id = 0 THEN
        RAISE EXCEPTION 'Face % cannot be associated with any feature', NEW.element_id;
        RETURN NULL;
      END IF;
      ok = false;
      FOR rec IN EXECUTE 'SELECT face_id FROM '
        || quote_ident(toponame) || '.face '
           ' WHERE face_id = ' || NEW.element_id
      LOOP
        ok = true;
        EXIT;
      END LOOP;
      IF NOT ok THEN
        RAISE EXCEPTION 'Face % does not exist in topology %', NEW.element_id, toponame;
        RETURN NULL;
      END IF;
    END IF;

  END IF;

  RETURN NEW;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.DropTopoGeometryColumn(schema varchar, tbl varchar, col varchar)
  RETURNS text
AS
$BODY$
DECLARE
  rec RECORD;
  lyrinfo RECORD;
  ok BOOL;
  result text;
  sql TEXT;
BEGIN

  -- Get layer and topology info

  sql := $$
    SELECT t.name as toponame, l.*
    FROM topology.topology t, topology.layer l
    WHERE l.topology_id = t.id
    AND l.schema_name = $1
    AND l.table_name = $2
    AND l.feature_column = $3
  $$;

  ok := false;
  FOR rec IN EXECUTE sql USING schema, tbl, col
  LOOP
    ok := true;
    lyrinfo := rec;
  END LOOP;

  -- Layer not found
  IF NOT ok THEN
    RAISE EXCEPTION 'No layer registered on %.%.%',
      schema,tbl,col;
  END IF;

  -- Cleanup the relation table (if it exists)
  BEGIN
    sql := format(
      'DELETE FROM %I.relation WHERE layer_id = $1',
      lyrinfo.toponame
    );
    EXECUTE sql USING lyrinfo.layer_id;
  EXCEPTION
    WHEN UNDEFINED_TABLE THEN
      RAISE NOTICE '%', SQLERRM;
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Got % (%)', SQLERRM, SQLSTATE;
  END;

  -- Drop the sequence for topogeoms in this layer
  sql := format(
    'DROP SEQUENCE IF EXISTS %I.topogeo_s_%s',
    lyrinfo.toponame,
    lyrinfo.layer_id
  );
  EXECUTE sql;

  ok = false;
  FOR rec IN SELECT * FROM pg_namespace n, pg_class c, pg_attribute a
    WHERE text(n.nspname) = schema
    AND c.relnamespace = n.oid
    AND text(c.relname) = tbl
    AND a.attrelid = c.oid
    AND text(a.attname) = col
  LOOP
    ok = true;
    EXIT;
  END LOOP;

  IF ok THEN
    -- Drop the layer column
    sql := format(
      'ALTER TABLE %I.%I DROP %I CASCADE',
      schema, tbl, col
    );
    EXECUTE sql;
  END IF;

  -- Delete the layer record
  sql := $$
    DELETE FROM topology.layer
    WHERE topology_id = $1
    AND layer_id = $2
  $$;
  EXECUTE sql USING lyrinfo.topology_id, lyrinfo.layer_id;


  result := format(
    'Layer %s (%I.%I.%I) dropped',
    lyrinfo.layer_id, schema, tbl, col
  );

  RETURN result;
END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.CreateTopoGeom(toponame varchar, tg_type integer, layer_id integer, tg_objs topology.TopoElementArray)
  RETURNS topology.TopoGeometry
AS
$$
DECLARE
  i integer;
  dims varchar;
  outerdims varchar;
  innerdims varchar;
  obj_type integer;
  obj_id integer;
  ret topology.TopoGeometry;
  rec RECORD;
  layertype integer;
  layerlevel integer;
  layerchild integer;
BEGIN

  IF tg_type < 1 OR tg_type > 4 THEN
    RAISE EXCEPTION 'Invalid TopoGeometry type % (must be in the range 1..4)', tg_type;
  END IF;

  -- Get topology id into return TopoGeometry
  SELECT id INTO ret.topology_id
    FROM topology.topology WHERE name = toponame;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Topology % does not exist', quote_literal(toponame);
  END IF;

  --
  -- Get layer info
  --
  layertype := NULL;
  FOR rec IN EXECUTE 'SELECT * FROM topology.layer'
       ' WHERE topology_id = ' || ret.topology_id
    || ' AND layer_id = ' || layer_id
  LOOP
    layertype = rec.feature_type;
    layerlevel = rec.level;
    layerchild = rec.child_id;
  END LOOP;

  -- Check for existence of given layer id
  IF layertype IS NULL THEN
    RAISE EXCEPTION 'No layer with id % is registered with topology %', layer_id, toponame;
  END IF;

  -- Verify compatibility between layer geometry type and
  -- TopoGeom requested geometry type
  IF layertype != 4 and layertype != tg_type THEN
    RAISE EXCEPTION 'A Layer of type % cannot contain a TopoGeometry of type %', layertype, tg_type;
  END IF;

  -- Set layer id and type in return object
  ret.layer_id = layer_id;
  ret.type = tg_type;

  --
  -- Get new TopoGeo id from sequence
  --
  FOR rec IN EXECUTE 'SELECT nextval(' ||
    quote_literal(
      quote_ident(toponame) || '.topogeo_s_' || layer_id
    ) || ')'
  LOOP
    ret.id = rec.nextval;
  END LOOP;

  -- Loop over outer dimension
  i = array_lower(tg_objs, 1);
  LOOP
    obj_id = tg_objs[i][1];
    obj_type = tg_objs[i][2];

    -- Elements of type 0 represent emptiness, just skip them
    IF obj_type = 0 THEN
      IF obj_id != 0 THEN
        RAISE EXCEPTION 'Malformed empty topo element {0,%} -- id must be 0 as well', obj_id;
      END IF;
    ELSE
      IF layerlevel = 0 THEN -- array specifies lower-level objects
        IF tg_type != 4 and tg_type != obj_type THEN
          RAISE EXCEPTION 'A TopoGeometry of type % cannot contain topology elements of type %', tg_type, obj_type;
        END IF;
      ELSE -- array specifies lower-level topogeometries
        IF obj_type != layerchild THEN
          RAISE EXCEPTION 'TopoGeom element layer do not match TopoGeom child layer';
        END IF;
        -- TODO: verify that the referred TopoGeometry really
        -- exists in the relation table ?
      END IF;

      --RAISE NOTICE 'obj:% type:% id:%', i, obj_type, obj_id;

      --
      -- Insert record into the Relation table
      --
      EXECUTE 'INSERT INTO '||quote_ident(toponame)
        || '.relation(topogeo_id, layer_id, '
           'element_id,element_type) '
           ' VALUES ('||ret.id
        ||','||ret.layer_id
        || ',' || obj_id || ',' || obj_type || ');';
    END IF;

    i = i+1;
    IF i > array_upper(tg_objs, 1) THEN
      EXIT;
    END IF;
  END LOOP;

  RETURN ret;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.CreateTopoGeom(toponame varchar, tg_type integer, layer_id integer)
  RETURNS topology.TopoGeometry
AS
$$
  SELECT topology.CreateTopoGeom($1,$2,$3,'{{0,0}}');
$$ LANGUAGE 'sql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopologyName(topoid integer)
  RETURNS varchar
AS
$$
DECLARE
  ret varchar;
BEGIN
        SELECT name FROM topology.topology into ret
                WHERE id = topoid;
  RETURN ret;
END
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopologyId(toponame varchar)
  RETURNS integer
AS
$$
DECLARE
  ret integer;
BEGIN
  SELECT id INTO ret
    FROM topology.topology WHERE name = toponame;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Topology % does not exist', quote_literal(toponame);
  END IF;

  RETURN ret;
END
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopologySRID(toponame varchar)
  RETURNS integer
AS $$
  SELECT SRID FROM topology.topology WHERE name = $1;
$$ LANGUAGE 'sql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopoGeomElementArray(toponame varchar, layer_id integer, tgid integer)
  RETURNS topology.TopoElementArray
AS
$$
DECLARE
  rec RECORD;
  tg_objs varchar := '{';
  i integer;
  query text;
BEGIN

  query = 'SELECT * FROM topology.GetTopoGeomElements('
    || quote_literal(toponame) || ','
    || quote_literal(layer_id) || ','
    || quote_literal(tgid)
    || ') as obj ORDER BY obj';



  -- TODO: why not using array_agg here ?

  i = 1;
  FOR rec IN EXECUTE query
  LOOP
    IF i > 1 THEN
      tg_objs = tg_objs || ',';
    END IF;
    tg_objs = tg_objs || '{'
      || rec.obj[1] || ',' || rec.obj[2]
      || '}';
    i = i+1;
  END LOOP;

  tg_objs = tg_objs || '}';

  RETURN tg_objs;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopoGeomElementArray(tg topology.TopoGeometry)
  RETURNS topology.TopoElementArray
AS
$$
DECLARE
  toponame varchar;
BEGIN
  toponame = topology.GetTopologyName(tg.topology_id);
  RETURN topology.GetTopoGeomElementArray(toponame, tg.layer_id, tg.id);
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopoGeomElements(toponame varchar, layerid integer, tgid integer)
  RETURNS SETOF topology.TopoElement
AS
$$
DECLARE
  ret topology.TopoElement;
  rec RECORD;
  rec2 RECORD;
  query text;
  query2 text;
  lyr RECORD;
  ok bool;
  topoid INTEGER;
BEGIN

  -- Get topology id
  SELECT id INTO topoid
    FROM topology.topology WHERE name = toponame;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Topology % does not exist', quote_literal(toponame);
  END IF;

  -- Get layer info
  ok = false;
  FOR rec IN EXECUTE 'SELECT * FROM topology.layer '
       ' WHERE layer_id = $1 AND topology_id = $2'
       USING layerid, topoid
  LOOP
    lyr = rec;
    ok = true;
  END LOOP;

  IF NOT ok THEN
    RAISE EXCEPTION 'Layer % does not exist', layerid;
  END IF;

  query = 'SELECT abs(element_id) as element_id, element_type FROM '
    || quote_ident(toponame) || '.relation WHERE '
       ' layer_id = ' || layerid
    || ' AND topogeo_id = ' || quote_literal(tgid)
    || ' ORDER BY element_type, element_id';

  --RAISE NOTICE 'Query: %', query;

  FOR rec IN EXECUTE query
  LOOP
    IF lyr.level > 0 THEN
      query2 = 'SELECT * from topology.GetTopoGeomElements('
        || quote_literal(toponame) || ','
        || rec.element_type
        || ','
        || rec.element_id
        || ') as ret;';
      --RAISE NOTICE 'Query2: %', query2;
      FOR rec2 IN EXECUTE query2
      LOOP
        RETURN NEXT rec2.ret;
      END LOOP;
    ELSE
      ret = '{' || rec.element_id || ',' || rec.element_type || '}';
      RETURN NEXT ret;
    END IF;

  END LOOP;

  RETURN;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetTopoGeomElements(tg topology.TopoGeometry)
  RETURNS SETOF topology.TopoElement
AS
$$
DECLARE
  toponame varchar;
  rec RECORD;
BEGIN
  toponame = topology.GetTopologyName(tg.topology_id);
  FOR rec IN SELECT * FROM topology.GetTopoGeomElements(toponame,
    tg.layer_id,tg.id) as ret
  LOOP
    RETURN NEXT rec.ret;
  END LOOP;
  RETURN;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.Geometry(topogeom topology.TopoGeometry)
  RETURNS Geometry
AS $BODY$
DECLARE
  toponame varchar;
  toposrid INT;
  geom geometry;
  elements_count INT;
  rec RECORD;
  plyr RECORD;
  clyr RECORD;
  sql TEXT;
BEGIN

  -- Get topology name
  SELECT name, srid FROM topology.topology
  WHERE id = topogeom.topology_id
  INTO toponame, toposrid;
  IF toponame IS NULL THEN
    RAISE EXCEPTION 'Invalid TopoGeometry (unexistent topology id %)', topogeom.topology_id;
  END IF;

  -- Get layer info
  SELECT * FROM topology.layer
    WHERE topology_id = topogeom.topology_id
    AND layer_id = topogeom.layer_id
    INTO plyr;
  IF plyr IS NULL THEN
    RAISE EXCEPTION 'Could not find TopoGeometry layer % in topology %', topogeom.layer_id, topogeom.topology_id;
  END IF;

  --
  -- If this feature layer is on any level > 0 we will
  -- compute the topological union of all child features
  -- in fact recursing.
  --
  IF plyr.level > 0 THEN -- {

    -- Get child layer info
    SELECT * FROM topology.layer WHERE layer_id = plyr.child_id
      AND topology_id = topogeom.topology_id
      INTO clyr;
    IF clyr IS NULL THEN
      RAISE EXCEPTION 'Invalid layer % in topology % (unexistent child layer %)', topogeom.layer_id, topogeom.topology_id, plyr.child_id;
    END IF;

    sql := 'SELECT st_multi(st_union(topology.Geometry('
      || quote_ident(clyr.feature_column)
      || '))) as geom FROM '
      || quote_ident(clyr.schema_name) || '.'
      || quote_ident(clyr.table_name)
      || ', ' || quote_ident(toponame) || '.relation pr'
         ' WHERE '
         ' pr.topogeo_id = ' || topogeom.id
      || ' AND '
         ' pr.layer_id = ' || topogeom.layer_id
      || ' AND '
         ' id('||quote_ident(clyr.feature_column)
      || ') = pr.element_id '
         ' AND '
         'layer_id('||quote_ident(clyr.feature_column)
      || ') = pr.element_type ';
    --RAISE DEBUG '%', query;
    EXECUTE sql INTO geom;

  ELSIF topogeom.type = 3 THEN -- [multi]polygon -- }{

    sql := format(
      $$
SELECT
  count(element_id),
  ST_Multi(
    ST_Union(
      topology.ST_GetFaceGeometry(
        %1$L,
        element_id
      )
    )
  ) as g
FROM %1$I.relation
WHERE topogeo_id = %2$L
AND layer_id = %3$L
AND element_type = 3
      $$,
      toponame,
      topogeom.id,
      topogeom.layer_id
    );

    EXECUTE sql INTO elements_count, geom;



  ELSIF topogeom.type = 2 THEN -- [multi]line -- }{

    sql := format(
      $$
SELECT
  st_multi(
    ST_LineMerge(
      ST_Collect(
        CASE
          WHEN r.element_id > 0 THEN
            e.geom
          ELSE
            ST_Reverse(e.geom)
        END
      )
    )
  ) as g
FROM %1$I.edge e, %1$I.relation r
WHERE r.topogeo_id = id($1)
AND r.layer_id = layer_id($1)
AND r.element_type = 2
AND abs(r.element_id) = e.edge_id
      $$,
      toponame
    );
    EXECUTE sql USING topogeom INTO geom;

  ELSIF topogeom.type = 1 THEN -- [multi]point -- }{

    sql :=
      'SELECT st_multi(st_union(n.geom)) as g FROM '
      || quote_ident(toponame) || '.node n, '
      || quote_ident(toponame) || '.relation r '
         ' WHERE r.topogeo_id = ' || topogeom.id
      || ' AND r.layer_id = ' || topogeom.layer_id
      || ' AND r.element_type = 1 '
         ' AND r.element_id = n.node_id';
    EXECUTE sql INTO geom;

  ELSIF topogeom.type = 4 THEN -- mixed collection -- }{

    sql := 'WITH areas AS ( SELECT ST_Union('
         'topology.ST_GetFaceGeometry('
      || quote_literal(toponame) || ','
      || 'element_id)) as g FROM '
      || quote_ident(toponame)
      || '.relation WHERE topogeo_id = '
      || topogeom.id || ' AND layer_id = '
      || topogeom.layer_id || ' AND element_type = 3), '
         'lines AS ( SELECT ST_LineMerge(ST_Collect(e.geom)) as g FROM '
      || quote_ident(toponame) || '.edge e, '
      || quote_ident(toponame) || '.relation r '
         ' WHERE r.topogeo_id = ' || topogeom.id
      || ' AND r.layer_id = ' || topogeom.layer_id
      || ' AND r.element_type = 2 '
         ' AND abs(r.element_id) = e.edge_id ), '
         ' points as ( SELECT st_union(n.geom) as g FROM '
      || quote_ident(toponame) || '.node n, '
      || quote_ident(toponame) || '.relation r '
         ' WHERE r.topogeo_id = ' || topogeom.id
      || ' AND r.layer_id = ' || topogeom.layer_id
      || ' AND r.element_type = 1 '
         ' AND r.element_id = n.node_id ), '
         ' un as ( SELECT g FROM areas UNION ALL SELECT g FROM lines '
         '          UNION ALL SELECT g FROM points ) '
         'SELECT ST_Multi(ST_Collect(g)) FROM un';
    EXECUTE sql INTO geom;

  ELSE -- }{

    RAISE EXCEPTION 'Invalid TopoGeometries (unknown type %)', topogeom.type;

  END IF; -- }

  IF geom IS NULL THEN
    IF topogeom.type = 3 THEN -- [multi]polygon
      geom := 'MULTIPOLYGON EMPTY';
    ELSIF topogeom.type = 2 THEN -- [multi]line
      geom := 'MULTILINESTRING EMPTY';
    ELSIF topogeom.type = 1 THEN -- [multi]point
      geom := 'MULTIPOINT EMPTY';
    ELSE
      geom := 'GEOMETRYCOLLECTION EMPTY';
    END IF;
    geom := ST_SetSRID(geom, toposrid);
  END IF;

  RETURN geom;
END
$BODY$
LANGUAGE 'plpgsql' VOLATILE STRICT;
DROP CAST IF EXISTS (topology.TopoGeometry AS Geometry);
CREATE CAST (topology.TopoGeometry AS Geometry) WITH FUNCTION topology.Geometry(topology.TopoGeometry) AS IMPLICIT;
CREATE OR REPLACE FUNCTION topology.TopoElement(topo topology.TopoGeometry)
    RETURNS topology.TopoElement
    LANGUAGE sql
    COST 1
    IMMUTABLE PARALLEL SAFE
AS  $$SELECT ARRAY[topo.id,topo.layer_id]::topology.topoelement;$$;
DROP CAST IF EXISTS (topology.TopoGeometry AS int[]);
CREATE CAST (topology.TopoGeometry AS int[]) WITH FUNCTION topology.TopoElement(topology.TopoGeometry) AS ASSIGNMENT;
CREATE OR REPLACE FUNCTION topology.DropTopology(atopology varchar)
RETURNS text
AS
$$
DECLARE
  topoid integer;
  rec RECORD;
  sql TEXT;
  toposchema REGNAMESPACE;
  deferred_constraints TEXT[];
BEGIN
  -- Get topology id
  SELECT id INTO topoid
    FROM topology.topology WHERE name = atopology;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Topology % does not exist', quote_literal(atopology);
  END IF;

  RAISE NOTICE 'Dropping all layers from topology % (%)',
    quote_literal(atopology), topoid;

  -- Drop all layers in the topology
  sql := 'SELECT * FROM topology.layer WHERE topology_id = $1';
  FOR rec IN EXECUTE sql USING topoid
  LOOP

    sql := format(
      'SELECT topology.DropTopoGeometryColumn(%L, %L, %L)',
      rec.schema_name, rec.table_name, rec.feature_column
    );

    EXECUTE sql;
  END LOOP;



  -- Delete record from topology.topology
  sql := 'DELETE FROM topology.topology WHERE id = $1';
  EXECUTE sql USING topoid;



  -- Drop the schema (if it exists)
  SELECT oid FROM pg_namespace WHERE text(nspname) = atopology
  INTO toposchema;

  IF toposchema IS NOT NULL THEN --{

    -- Give immediate execution to pending constraints
    -- in the topology schema.
    --
    -- See https://trac.osgeo.org/postgis/ticket/5115
    SELECT array_agg(format('%I.%I', atopology, conname))
    FROM pg_constraint c
    WHERE connamespace = toposchema AND condeferred
    INTO deferred_constraints;

    IF deferred_constraints IS NOT NULL THEN --{
      sql := format(
        'SET constraints %s IMMEDIATE',
        array_to_string(deferred_constraints, ',')
      );

      EXECUTE sql;
    END IF; --}

    sql := format('DROP SCHEMA %I CASCADE', atopology);

    EXECUTE sql;
  END IF; --}

  RETURN format('Topology %L dropped', atopology);
END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.intersects(tg1 topology.TopoGeometry, tg2 topology.TopoGeometry)
  RETURNS bool
AS
$$
DECLARE
  tgbuf topology.TopoGeometry;
  rec RECORD;
  toponame varchar;
  query text;
BEGIN
  IF tg1.topology_id != tg2.topology_id THEN
    -- TODO: revert to ::geometry instead ?
    RAISE EXCEPTION 'Cannot compute intersection between TopoGeometries from different topologies';
  END IF;

  -- Order TopoGeometries so that tg1 has less-or-same
  -- dimensionality of tg1 (point,line,polygon,collection)
  IF tg1.type > tg2.type THEN
    tgbuf := tg2;
    tg2 := tg1;
    tg1 := tgbuf;
  END IF;

  --RAISE NOTICE 'tg1.id:% tg2.id:%', tg1.id, tg2.id;
  -- Geometry collection are not currently supported
  IF tg2.type = 4 THEN
    RAISE EXCEPTION 'GeometryCollection are not supported by intersects()';
  END IF;

        -- Get topology name
        SELECT name FROM topology.topology into toponame
                WHERE id = tg1.topology_id;

  -- Hierarchical TopoGeometries are not currently supported
  query = 'SELECT level FROM topology.layer'
    || ' WHERE '
    || ' topology_id = ' || tg1.topology_id
    || ' AND '
    || '( layer_id = ' || tg1.layer_id
    || ' OR layer_id = ' || tg2.layer_id
    || ' ) '
    || ' AND level > 0 ';

  --RAISE NOTICE '%', query;

  FOR rec IN EXECUTE query
  LOOP
    -- TODO: revert to ::geometry instead ?
    RAISE EXCEPTION 'Hierarchical TopoGeometries are not currently supported by intersects()';
  END LOOP;

  IF tg1.type = 1 THEN -- [multi]point

    IF tg2.type = 1 THEN -- point/point
  ---------------------------------------------------------
  --
  --  Two [multi]point features intersect if they share
  --  any Node
  --
  --
  --
      query =
        'SELECT a.topogeo_id FROM '
        || quote_ident(toponame) ||
        '.relation a, '
        || quote_ident(toponame) ||
        '.relation b '
        || 'WHERE a.layer_id = ' || tg1.layer_id
        || ' AND b.layer_id = ' || tg2.layer_id
        || ' AND a.topogeo_id = ' || tg1.id
        || ' AND b.topogeo_id = ' || tg2.id
        || ' AND a.element_id = b.element_id '
        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        RETURN TRUE; -- they share an element
      END LOOP;
      RETURN FALSE; -- no elements shared
  --
  ---------------------------------------------------------

    ELSIF tg2.type = 2 THEN -- point/line
  ---------------------------------------------------------
  --
  --  A [multi]point intersects a [multi]line if they share
  --  any Node.
  --
  --
  --
      query =
        'SELECT a.topogeo_id FROM '
        || quote_ident(toponame) ||
        '.relation a, '
        || quote_ident(toponame) ||
        '.relation b, '
        || quote_ident(toponame) ||
        '.edge_data e '
        || 'WHERE a.layer_id = ' || tg1.layer_id
        || ' AND b.layer_id = ' || tg2.layer_id
        || ' AND a.topogeo_id = ' || tg1.id
        || ' AND b.topogeo_id = ' || tg2.id
        || ' AND abs(b.element_id) = e.edge_id '
        || ' AND ( '
          || ' e.start_node = a.element_id '
          || ' OR '
          || ' e.end_node = a.element_id '
        || ' )'
        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        RETURN TRUE; -- they share an element
      END LOOP;
      RETURN FALSE; -- no elements shared
  --
  ---------------------------------------------------------

    ELSIF tg2.type = 3 THEN -- point/polygon
  ---------------------------------------------------------
  --
  --  A [multi]point intersects a [multi]polygon if any
  --  Node of the point is contained in any face of the
  --  polygon OR ( is end_node or start_node of any edge
  --  of any polygon face ).
  --
  --  We assume the Node-in-Face check is faster because
  --  there will be less Faces then Edges in any polygon.
  --
  --
  --
  --
      -- Check if any node is contained in a face
      query =
        'SELECT n.node_id as id FROM '
        || quote_ident(toponame) ||
        '.relation r1, '
        || quote_ident(toponame) ||
        '.relation r2, '
        || quote_ident(toponame) ||
        '.node n '
        || 'WHERE r1.layer_id = ' || tg1.layer_id
        || ' AND r2.layer_id = ' || tg2.layer_id
        || ' AND r1.topogeo_id = ' || tg1.id
        || ' AND r2.topogeo_id = ' || tg2.id
        || ' AND n.node_id = r1.element_id '
        || ' AND r2.element_id = n.containing_face '
        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        --RAISE NOTICE 'Node % in polygon face', rec.id;
        RETURN TRUE; -- one (or more) nodes are
                     -- contained in a polygon face
      END LOOP;

      -- Check if any node is start or end of any polygon
      -- face edge
      query =
        'SELECT n.node_id as nid, e.edge_id as eid '
        || ' FROM '
        || quote_ident(toponame) ||
        '.relation r1, '
        || quote_ident(toponame) ||
        '.relation r2, '
        || quote_ident(toponame) ||
        '.edge_data e, '
        || quote_ident(toponame) ||
        '.node n '
        || 'WHERE r1.layer_id = ' || tg1.layer_id
        || ' AND r2.layer_id = ' || tg2.layer_id
        || ' AND r1.topogeo_id = ' || tg1.id
        || ' AND r2.topogeo_id = ' || tg2.id
        || ' AND n.node_id = r1.element_id '
        || ' AND ( '
        || ' e.left_face = r2.element_id '
        || ' OR '
        || ' e.right_face = r2.element_id '
        || ' ) '
        || ' AND ( '
        || ' e.start_node = r1.element_id '
        || ' OR '
        || ' e.end_node = r1.element_id '
        || ' ) '
        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        --RAISE NOTICE 'Node % on edge % bound', rec.nid, rec.eid;
        RETURN TRUE; -- one node is start or end
                     -- of a face edge
      END LOOP;

      RETURN FALSE; -- no intersection
  --
  ---------------------------------------------------------

    ELSIF tg2.type = 4 THEN -- point/collection
      RAISE EXCEPTION 'Intersection point/collection not implemented yet';

    ELSE
      RAISE EXCEPTION 'Invalid TopoGeometry type %', tg2.type;
    END IF;

  ELSIF tg1.type = 2 THEN -- [multi]line
    IF tg2.type = 2 THEN -- line/line
  ---------------------------------------------------------
  --
  --  A [multi]line intersects a [multi]line if they share
  --  any Node.
  --
  --
  --
      query =
        'SELECT e1.start_node FROM '
        || quote_ident(toponame) ||
        '.relation r1, '
        || quote_ident(toponame) ||
        '.relation r2, '
        || quote_ident(toponame) ||
        '.edge_data e1, '
        || quote_ident(toponame) ||
        '.edge_data e2 '
        || 'WHERE r1.layer_id = ' || tg1.layer_id
        || ' AND r2.layer_id = ' || tg2.layer_id
        || ' AND r1.topogeo_id = ' || tg1.id
        || ' AND r2.topogeo_id = ' || tg2.id
        || ' AND abs(r1.element_id) = e1.edge_id '
        || ' AND abs(r2.element_id) = e2.edge_id '
        || ' AND ( '
        || ' e1.start_node = e2.start_node '
        || ' OR '
        || ' e1.start_node = e2.end_node '
        || ' OR '
        || ' e1.end_node = e2.start_node '
        || ' OR '
        || ' e1.end_node = e2.end_node '
        || ' )'
        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        RETURN TRUE; -- they share an element
      END LOOP;
      RETURN FALSE; -- no elements shared
  --
  ---------------------------------------------------------

    ELSIF tg2.type = 3 THEN -- line/polygon
  ---------------------------------------------------------
  --
  -- A [multi]line intersects a [multi]polygon if they share
  -- any Node (touch-only case), or if any line edge has any
  -- polygon face on the left or right (full-containment case
  -- + edge crossing case).
  --
  --
      -- E1 are line edges, E2 are polygon edges
      -- R1 are line relations.
      -- R2 are polygon relations.
      -- R2.element_id are FACE ids
      query =
        'SELECT e1.edge_id'
        || ' FROM '
        || quote_ident(toponame) ||
        '.relation r1, '
        || quote_ident(toponame) ||
        '.relation r2, '
        || quote_ident(toponame) ||
        '.edge_data e1, '
        || quote_ident(toponame) ||
        '.edge_data e2 '
        || 'WHERE r1.layer_id = ' || tg1.layer_id
        || ' AND r2.layer_id = ' || tg2.layer_id
        || ' AND r1.topogeo_id = ' || tg1.id
        || ' AND r2.topogeo_id = ' || tg2.id

        -- E1 are line edges
        || ' AND e1.edge_id = abs(r1.element_id) '

        -- E2 are face edges
        || ' AND ( e2.left_face = r2.element_id '
        || '   OR e2.right_face = r2.element_id ) '

        || ' AND ( '

        -- Check if E1 have left-or-right face
        -- being part of R2.element_id
        || ' e1.left_face = r2.element_id '
        || ' OR '
        || ' e1.right_face = r2.element_id '

        -- Check if E1 share start-or-end node
        -- with any E2.
        || ' OR '
        || ' e1.start_node = e2.start_node '
        || ' OR '
        || ' e1.start_node = e2.end_node '
        || ' OR '
        || ' e1.end_node = e2.start_node '
        || ' OR '
        || ' e1.end_node = e2.end_node '

        || ' ) '

        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        RETURN TRUE; -- either common node
                     -- or edge-in-face
      END LOOP;

      RETURN FALSE; -- no intersection
  --
  ---------------------------------------------------------

    ELSIF tg2.type = 4 THEN -- line/collection
      RAISE EXCEPTION 'Intersection line/collection not implemented yet';

    ELSE
      RAISE EXCEPTION 'Invalid TopoGeometry type %', tg2.type;
    END IF;

  ELSIF tg1.type = 3 THEN -- [multi]polygon

    IF tg2.type = 3 THEN -- polygon/polygon
  ---------------------------------------------------------
  --
  -- A [multi]polygon intersects a [multi]polygon if they share
  -- any Node (touch-only case), or if any face edge has any of the
  -- other polygon face on the left or right (full-containment case
  -- + edge crossing case).
  --
  --
      -- E1 are poly1 edges.
      -- E2 are poly2 edges
      -- R1 are poly1 relations.
      -- R2 are poly2 relations.
      -- R1.element_id are poly1 FACE ids
      -- R2.element_id are poly2 FACE ids
      query =
        'SELECT e1.edge_id'
        || ' FROM '
        || quote_ident(toponame) ||
        '.relation r1, '
        || quote_ident(toponame) ||
        '.relation r2, '
        || quote_ident(toponame) ||
        '.edge_data e1, '
        || quote_ident(toponame) ||
        '.edge_data e2 '
        || 'WHERE r1.layer_id = ' || tg1.layer_id
        || ' AND r2.layer_id = ' || tg2.layer_id
        || ' AND r1.topogeo_id = ' || tg1.id
        || ' AND r2.topogeo_id = ' || tg2.id

        -- E1 are poly1 edges
        || ' AND ( e1.left_face = r1.element_id '
        || '   OR e1.right_face = r1.element_id ) '

        -- E2 are poly2 edges
        || ' AND ( e2.left_face = r2.element_id '
        || '   OR e2.right_face = r2.element_id ) '

        || ' AND ( '

        -- Check if any edge from a polygon face
        -- has any of the other polygon face
        -- on the left or right
        || ' e1.left_face = r2.element_id '
        || ' OR '
        || ' e1.right_face = r2.element_id '
        || ' OR '
        || ' e2.left_face = r1.element_id '
        || ' OR '
        || ' e2.right_face = r1.element_id '

        -- Check if E1 share start-or-end node
        -- with any E2.
        || ' OR '
        || ' e1.start_node = e2.start_node '
        || ' OR '
        || ' e1.start_node = e2.end_node '
        || ' OR '
        || ' e1.end_node = e2.start_node '
        || ' OR '
        || ' e1.end_node = e2.end_node '

        || ' ) '

        || ' LIMIT 1';
      --RAISE NOTICE '%', query;
      FOR rec IN EXECUTE query
      LOOP
        RETURN TRUE; -- either common node
                     -- or edge-in-face
      END LOOP;

      RETURN FALSE; -- no intersection
  --
  ---------------------------------------------------------

    ELSIF tg2.type = 4 THEN -- polygon/collection
      RAISE EXCEPTION 'Intersection poly/collection not implemented yet';

    ELSE
      RAISE EXCEPTION 'Invalid TopoGeometry type %', tg2.type;
    END IF;

  ELSIF tg1.type = 4 THEN -- collection
    IF tg2.type = 4 THEN -- collection/collection
      RAISE EXCEPTION 'Intersection collection/collection not implemented yet';
    ELSE
      RAISE EXCEPTION 'Invalid TopoGeometry type %', tg2.type;
    END IF;

  ELSE
    RAISE EXCEPTION 'Invalid TopoGeometry type %', tg1.type;
  END IF;
END
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.equals(tg1 topology.TopoGeometry, tg2 topology.TopoGeometry)
  RETURNS bool
AS
$$
DECLARE
  rec RECORD;
  toponame varchar;
  query text;
BEGIN

  IF tg1.topology_id != tg2.topology_id THEN
    -- TODO: revert to ::geometry instead ?
    RAISE EXCEPTION 'Cannot compare TopoGeometries from different topologies';
  END IF;

  -- Not the same type, not equal
  IF tg1.type != tg2.type THEN
    RETURN FALSE;
  END IF;

  -- Geometry collection are not currently supported
  IF tg2.type = 4 THEN
    RAISE EXCEPTION 'GeometryCollection are not supported by equals()';
  END IF;

        -- Get topology name
        SELECT name FROM topology.topology into toponame
                WHERE id = tg1.topology_id;

  -- Two geometries are equal if they are composed by
  -- the same TopoElements
  FOR rec IN EXECUTE 'SELECT * FROM '
    || ' topology.GetTopoGeomElements('
    || quote_literal(toponame) || ', '
    || tg1.layer_id || ',' || tg1.id || ') '
    || ' EXCEPT SELECT * FROM '
    || ' topology.GetTopogeomElements('
    || quote_literal(toponame) || ', '
    || tg2.layer_id || ',' || tg2.id || ');'
  LOOP
    RETURN FALSE;
  END LOOP;

  FOR rec IN EXECUTE 'SELECT * FROM '
    || ' topology.GetTopoGeomElements('
    || quote_literal(toponame) || ', '
    || tg2.layer_id || ',' || tg2.id || ')'
    || ' EXCEPT SELECT * FROM '
    || ' topology.GetTopogeomElements('
    || quote_literal(toponame) || ', '
    || tg1.layer_id || ',' || tg1.id || '); '
  LOOP
    RETURN FALSE;
  END LOOP;
  RETURN TRUE;
END
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetNodeByPoint(atopology varchar, apoint geometry, tol1 float8)
	RETURNS int AS
	'$libdir/postgis_topology-3', 'GetNodeByPoint'
	LANGUAGE 'c' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetEdgeByPoint(atopology varchar, apoint geometry, tol1 float8)
	RETURNS int AS
	'$libdir/postgis_topology-3', 'GetEdgeByPoint'
	LANGUAGE 'c' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.GetFaceByPoint(atopology varchar, apoint geometry, tol1 float8)
	RETURNS int AS
$BODY$ -- }{
DECLARE
  rec RECORD;
  sql TEXT;
  sideFaces INT[];
BEGIN

  -- Check if any edge intersects the query circle
  sql := format(
    $$
      WITH edges_in_circle AS (
        SELECT
          left_face,
          right_face
        FROM
          %1$I.edge
        WHERE
          ST_DWithin(geom, $1, $2)
      ), side_faces AS (
        SELECT left_face f FROM edges_in_circle
          UNION
        SELECT right_face FROM edges_in_circle
      )
      SELECT array_agg(f ORDER BY f) FROM side_faces;
    $$,
    atopology
  );
  EXECUTE sql
  USING apoint, tol1
  INTO sideFaces;

  RAISE DEBUG 'Side faces: %', sideFaces;

  IF array_upper(sideFaces, 1) = 1
  THEN
    -- Edges intersecting the circle
    -- have a single side-face, our circle
    -- is surely in that face
    --
    -- NOTE: this may also be the universe face
    --
    RETURN sideFaces[1];
  END IF;

  IF array_upper(sideFaces, 1) = 2
  THEN
    IF sideFaces[1] = 0
    THEN
      -- Edges intersecting the circle
      -- have a single real side-face,
      -- we'll consider our query to be in that face
      RETURN sideFaces[2];
    ELSE
      -- Edges have multiple real side-faces
      RAISE EXCEPTION 'Two or more faces found';
    END IF;
  END IF;

  IF array_upper(sideFaces, 1) > 2
  THEN
      RAISE EXCEPTION 'Two or more faces found';
  END IF;

  -- No edge intersects the circle, check for containment
  RETURN topology.GetFaceContainingPoint(atopology, apoint);
END;
$BODY$ LANGUAGE 'plpgsql' STABLE STRICT;
--} GetFaceByPoint


-- This function finds the id of a face whose geometry
-- would properly contain the given query point.
--
-- The implementation of this function relies on a properly built
-- topology, so results against an invalid topology are unpredictable.
--
-- If the point falls on the boundary of any face an exception will be
-- raised. Dangling edges will not be considered as face boundaries,
-- which is consistent with ST_GetFaceGeometry.
--
-- The following query should always return true
-- for non-boundary query points (:point)
--
--  ST_Contains(
--    ST_GetFaceGeometry(
--       :topo,
--       ST_GetFaceContainingPoint(:topo, :point)
--    ),
--    :point
--  )
--
--
-- Availability: 3.2.0
CREATE OR REPLACE FUNCTION topology.GetFaceContainingPoint(
  atopology text,
  apoint geometry
)
RETURNS INT AS
	'$libdir/postgis_topology-3', 'GetFaceContainingPoint'
LANGUAGE 'c' STABLE;
CREATE OR REPLACE FUNCTION topology._st_mintolerance(ageom Geometry)
  RETURNS float8
AS $$
    SELECT 3.6 * power(10,  - ( 15 - log(coalesce(
      nullif(
        greatest(abs(ST_xmin($1)), abs(ST_ymin($1)),
                 abs(ST_xmax($1)), abs(ST_ymax($1))),
        0),
      1)) ));
$$ LANGUAGE 'sql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION topology._st_mintolerance(atopology varchar, ageom Geometry)
  RETURNS float8
AS $$
DECLARE
  ret FLOAT8;
BEGIN
  SELECT COALESCE(
    NULLIF(precision, 0),
    topology._st_mintolerance($2))
  FROM topology.topology
  WHERE name = $1 INTO ret;
  IF NOT FOUND THEN
    RAISE EXCEPTION
      'No topology with name "%" in topology.topology', atopology;
  END IF;
  return ret;
END;
$$ LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.AddNode(atopology varchar, apoint geometry, allowEdgeSplitting boolean DEFAULT false, setContainingFace boolean DEFAULT false)
	RETURNS int
AS
$$
DECLARE
	nodeid int;
	rec RECORD;
  containing_face int;
  seq_name_node text;
BEGIN
	--
	-- Atopology and apoint are required
	--
	IF atopology IS NULL OR apoint IS NULL THEN
		RAISE EXCEPTION 'Invalid null argument';
	END IF;

	--
	-- Apoint must be a point
	--
	IF substring(geometrytype(apoint), 1, 5) != 'POINT'
	THEN
		RAISE EXCEPTION 'Node geometry must be a point';
	END IF;

	--
	-- Check if a coincident node already exists
	--
	-- We use index AND x/y equality
	--
	FOR rec IN EXECUTE 'SELECT node_id FROM '
		|| quote_ident(atopology) || '.node ' ||
		'WHERE geom && $1 AND ST_X(geom) = ST_X($1) AND ST_Y(geom) = ST_Y($1)'
    USING apoint
	LOOP
		RETURN  rec.node_id;
	END LOOP;

	--
	-- Check if any edge crosses this node
	-- (endpoints are fine)
	--
	FOR rec IN EXECUTE 'SELECT edge_id FROM '
		|| quote_ident(atopology) || '.edge '
		|| 'WHERE ST_DWithin($1, geom, 0) AND '
    || 'NOT ST_Equals($1, ST_StartPoint(geom)) AND '
    || 'NOT ST_Equals($1, ST_EndPoint(geom))'
    USING apoint
	LOOP
    IF allowEdgeSplitting THEN
      RETURN topology.ST_ModEdgeSplit(atopology, rec.edge_id, apoint);
    ELSE
		  RAISE EXCEPTION 'An edge crosses the given node.';
    END IF;
	END LOOP;

  IF setContainingFace THEN
    containing_face := topology.GetFaceByPoint(atopology, apoint, 0);

  ELSE
    containing_face := NULL;
  END IF;

	--
	-- Get new node id from sequence
	--
  EXECUTE FORMAT(
    $fmt$
    SELECT column_default
    FROM information_schema.columns
    WHERE table_schema = %1$L AND table_name='node' AND column_name = 'node_id'
    $fmt$,
    atopology
  ) INTO seq_name_node;

	FOR rec IN EXECUTE 'SELECT ' || seq_name_node
	LOOP
		nodeid = rec.nextval;
	END LOOP;

	--
	-- Insert the new row
	--
	EXECUTE 'INSERT INTO ' || quote_ident(atopology)
		|| '.node(node_id, containing_face, geom)
		VALUES(' || nodeid || ',' || coalesce(containing_face::text, 'NULL')
    || ',$1)' USING apoint;

	RETURN nodeid;

END
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.AddEdge(atopology varchar, aline geometry)
	RETURNS int
AS
$$
DECLARE
	edgeid int;
	rec RECORD;
  ix geometry;
  seq_name_edge_data text;
BEGIN
	--
	-- Atopology and apoint are required
	--
	IF atopology IS NULL OR aline IS NULL THEN
		RAISE EXCEPTION 'Invalid null argument';
	END IF;

	--
	-- Aline must be a linestring
	--
	IF substring(geometrytype(aline), 1, 4) != 'LINE'
	THEN
		RAISE EXCEPTION 'Edge geometry must be a linestring';
	END IF;

	--
	-- Check there's no face registered in the topology
	--
	FOR rec IN EXECUTE 'SELECT count(face_id) FROM '
		|| quote_ident(atopology) || '.face '
		|| ' WHERE face_id != 0 LIMIT 1'
	LOOP
		IF rec.count > 0 THEN
			RAISE EXCEPTION 'AddEdge can only be used against topologies with no faces defined';
		END IF;
	END LOOP;

	--
	-- Check if the edge crosses an existing node
	--
	FOR rec IN EXECUTE 'SELECT node_id FROM '
		|| quote_ident(atopology) || '.node '
		|| 'WHERE ST_Crosses($1, geom)'
    USING aline
	LOOP
		RAISE EXCEPTION 'Edge crosses node %', rec.node_id;
	END LOOP;

	--
	-- Check if the edge intersects an existing edge
	-- on anything but endpoints
	--
	-- Following DE-9 Intersection Matrix represent
	-- the only relation we accept.
	--
	--    F F 1
	--    F * *
	--    1 * 2
	--
	-- Example1: linestrings touching at one endpoint
	--    FF1 F00 102
	--    FF1 F** 1*2 <-- our match
	--
	-- Example2: linestrings touching at both endpoints
	--    FF1 F0F 1F2
	--    FF1 F** 1*2 <-- our match
	--
	FOR rec IN EXECUTE 'SELECT edge_id, geom, ST_Relate($1, geom, 2) as im FROM '
		|| quote_ident(atopology) || '.edge WHERE $1 && geom'
    USING aline
	LOOP

	  IF ST_RelateMatch(rec.im, 'FF1F**1*2') THEN
	    CONTINUE; -- no interior intersection
	  END IF;

	  -- Reuse an EQUAL edge (be it closed or not)
	  IF ST_RelateMatch(rec.im, '1FFF*FFF2') THEN

	      RETURN rec.edge_id;
	  END IF;

    -- WARNING: the constructive operation might throw an exception
    BEGIN
      ix = ST_Intersection(rec.geom, aline);
    EXCEPTION
    WHEN OTHERS THEN
      RAISE NOTICE
        'Could not compute intersection between'
          ' input edge (%) and edge % (%)',
        aline::text,
        rec.edge_id,
        rec.geom::text;
    END;

    -- Find a point on the intersection which
    -- is NOT an endpoint of "aline"
    IF ST_Dimension(ix) = 0
    THEN
      WITH SharedBounds AS (
        (
          SELECT ST_Force2D(ST_StartPoint(rec.geom)) g
          UNION
          SELECT ST_Force2D(ST_EndPoint(rec.geom))
        )
        INTERSECT
        (
          SELECT ST_Force2D(ST_StartPoint(aline))
          UNION
          SELECT ST_Force2D(ST_EndPoint(aline))
        )
      )
      SELECT d.geom
      FROM ST_DumpPoints(ix) d
      WHERE ST_Force2D(geom) NOT IN ( SELECT g FROM SharedBounds )
      ORDER BY d.path
      LIMIT 1
      INTO STRICT ix;
    ELSE
      -- for linear intersection we pick
      -- an internal point.
      ix := ST_PointOnSurface(ix);
    END IF;

    RAISE EXCEPTION
      'Edge intersects (not on endpoints)'
        ' with existing edge % at or near point %',
      rec.edge_id,
      ST_AsText(ix);

	END LOOP;

	--
	-- Get new edge id from sequence
	--
  EXECUTE FORMAT(
    $fmt$
    SELECT column_default
    FROM information_schema.columns
    WHERE table_schema = %1$L AND table_name='edge_data' AND column_name = 'edge_id'
    $fmt$,
    atopology
  ) INTO seq_name_edge_data;

  FOR rec IN EXECUTE 'SELECT ' || seq_name_edge_data	LOOP
		edgeid = rec.nextval;
	END LOOP;

	--
	-- Insert the new row
	--
	EXECUTE 'INSERT INTO '
		|| quote_ident(atopology)
		|| '.edge(edge_id, start_node, end_node, '
		|| 'next_left_edge, next_right_edge, '
		|| 'left_face, right_face, '
		|| 'geom) '
		|| ' VALUES('

		-- edge_id
		|| edgeid ||','

		-- start_node
		|| 'topology.addNode('
		|| quote_literal(atopology)
		|| ', ST_StartPoint($1)), '

		-- end_node
		|| 'topology.addNode('
		|| quote_literal(atopology)
		|| ', ST_EndPoint($1)), '

		-- next_left_edge
		|| -edgeid ||','

		-- next_right_edge
		|| edgeid ||','

		-- left_face
		|| '0,'

		-- right_face
		|| '0,'

		-- geom
		|| '$1)'
    USING aline;

	RETURN edgeid;

END
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.AddFace(atopology varchar, apoly geometry, force_new boolean DEFAULT FALSE)
	RETURNS int
AS
$$
DECLARE
  bounds geometry;
  symdif geometry;
  faceid int;
  rec RECORD;
  rrec RECORD;
  relate text;
  right_edges int[];
  left_edges int[];
  all_edges geometry;
  old_faceid int;
  old_edgeid int;
  sql text;
  right_side bool;
  edgeseg geometry;
  p1 geometry;
  p2 geometry;
  p3 geometry;
  loc float8;
  segnum int;
  numsegs int;
  seq_name_face text;
BEGIN
  --
  -- Atopology and apoly are required
  --
  IF atopology IS NULL OR apoly IS NULL THEN
    RAISE EXCEPTION 'Invalid null argument';
  END IF;

  --
  -- Aline must be a polygon
  --
  IF substring(geometrytype(apoly), 1, 4) != 'POLY'
  THEN
    RAISE EXCEPTION 'Face geometry must be a polygon';
  END IF;

  for rrec IN SELECT (d).* FROM (
    SELECT ST_DumpRings(ST_ForceRHR(apoly)) d
  ) foo
  LOOP -- {
    --
    -- Find all bounds edges, forcing right-hand-rule
    -- to know what's left and what's right...
    --
    bounds = ST_Boundary(rrec.geom);

    sql := 'SELECT e.geom, e.edge_id, e.left_face, e.right_face FROM '
      || quote_ident(atopology)
      || '.edge e, (SELECT $1 as geom) r WHERE r.geom && e.geom'
    ;
    -- RAISE DEBUG 'SQL: %', sql;
    FOR rec IN EXECUTE sql USING bounds
    LOOP -- {
      --RAISE DEBUG 'Edge % has bounding box intersection', rec.edge_id;

      -- Find first non-empty segment of the edge
      numsegs = ST_NumPoints(rec.geom);
      segnum = 1;
      WHILE segnum < numsegs LOOP
        p1 = ST_PointN(rec.geom, segnum);
        p2 = ST_PointN(rec.geom, segnum+1);
        IF ST_Distance(p1, p2) > 0 THEN
          EXIT;
        END IF;
        segnum = segnum + 1;
      END LOOP;

      IF segnum = numsegs THEN
        RAISE WARNING 'Edge % is collapsed', rec.edge_id;
        CONTINUE; -- we don't want to spend time on it
      END IF;

      edgeseg = ST_MakeLine(p1, p2);

      -- Skip non-covered edges
      IF NOT ST_Equals(p2, ST_EndPoint(rec.geom)) THEN
        IF NOT ( _ST_Intersects(bounds, p1) AND _ST_Intersects(bounds, p2) )
        THEN
          --RAISE DEBUG 'Edge % has points % and % not intersecting with ring bounds', rec.edge_id, st_astext(p1), st_astext(p2);
          CONTINUE;
        END IF;
      ELSE
        -- must be a 2-points only edge, let's use Covers (more expensive)
        IF NOT _ST_Covers(bounds, edgeseg) THEN
          --RAISE DEBUG 'Edge % is not covered by ring', rec.edge_id;
          CONTINUE;
        END IF;
      END IF;

      p3 = ST_StartPoint(bounds);
      IF ST_DWithin(edgeseg, p3, 0) THEN
        -- Edge segment covers ring endpoint, See bug #874
        loc = ST_LineLocatePoint(edgeseg, p3);
        -- WARNING: this is as robust as length of edgeseg allows...
        IF loc > 0.9 THEN
          -- shift last point down
          p2 = ST_LineInterpolatePoint(edgeseg, loc - 0.1);
        ELSIF loc < 0.1 THEN
          -- shift first point up
          p1 = ST_LineInterpolatePoint(edgeseg, loc + 0.1);
        ELSE
          -- when ring start point is in between, we swap the points
          p3 = p1; p1 = p2; p2 = p3;
        END IF;
      END IF;

      right_side = ST_LineLocatePoint(bounds, p1) <
                   ST_LineLocatePoint(bounds, p2);



      IF right_side THEN
        right_edges := array_append(right_edges, rec.edge_id);
        old_faceid = rec.right_face;
      ELSE
        left_edges := array_append(left_edges, rec.edge_id);
        old_faceid = rec.left_face;
      END IF;

      IF faceid IS NULL OR faceid = 0 THEN
        faceid = old_faceid;
        old_edgeid = rec.edge_id;
      ELSIF faceid != old_faceid THEN
        RAISE EXCEPTION 'Edge % has face % registered on the side of this face, while edge % has face % on the same side', rec.edge_id, old_faceid, old_edgeid, faceid;
      END IF;

      -- Collect all edges for final full coverage check
      all_edges = ST_Collect(all_edges, rec.geom);

    END LOOP; -- }
  END LOOP; -- }

  IF all_edges IS NULL THEN
    RAISE EXCEPTION 'Found no edges on the polygon boundary';
  END IF;



  --
  -- Check that all edges found, taken together,
  -- fully match the ring boundary and nothing more
  --
  -- If the test fail either we need to add more edges
  -- from the polygon ring or we need to split
  -- some of the existing ones.
  --
  bounds = ST_Boundary(apoly);
  IF NOT ST_isEmpty(ST_SymDifference(bounds, all_edges)) THEN
    IF NOT ST_isEmpty(ST_Difference(bounds, all_edges)) THEN
      RAISE EXCEPTION 'Polygon boundary is not fully defined by existing edges at or near point %', ST_AsText(ST_PointOnSurface(ST_Difference(bounds, all_edges)));
    ELSE
      RAISE EXCEPTION 'Existing edges cover polygon boundary and more at or near point % (invalid topology?)', ST_AsText(ST_PointOnSurface(ST_Difference(all_edges, bounds)));
    END IF;
  END IF;

  IF faceid IS NOT NULL AND faceid != 0 THEN
    IF NOT force_new THEN

      RETURN faceid;
    ELSE

    END IF;
  END IF;

  --
  -- Get new face id from sequence
  --
  EXECUTE FORMAT(
    $fmt$
    SELECT column_default
    FROM information_schema.columns
    WHERE table_schema = %1$L AND table_name='face' AND column_name = 'face_id'
    $fmt$,
    atopology
  ) INTO seq_name_face;

  FOR rec IN EXECUTE 'SELECT ' || seq_name_face
  LOOP
    faceid = rec.nextval;
  END LOOP;

  --
  -- Insert new face
  --
  EXECUTE 'INSERT INTO '
    || quote_ident(atopology)
    || '.face(face_id, mbr) VALUES('
    -- face_id
    || faceid || ','
    -- minimum bounding rectangle
    || '$1)'
    USING ST_Envelope(apoly);

  --
  -- Update all edges having this face on the left
  --
  IF left_edges IS NOT NULL THEN
    EXECUTE 'UPDATE '
    || quote_ident(atopology)
    || '.edge_data SET left_face = '
    || quote_literal(faceid)
    || ' WHERE edge_id = ANY('
    || quote_literal(left_edges)
    || ') ';
  END IF;

  --
  -- Update all edges having this face on the right
  --
  IF right_edges IS NOT NULL THEN
    EXECUTE 'UPDATE '
    || quote_ident(atopology)
    || '.edge_data SET right_face = '
    || quote_literal(faceid)
    || ' WHERE edge_id = ANY('
    || quote_literal(right_edges)
    || ') ';
  END IF;

  --
  -- Set left_face/right_face of any contained edge
  --
  EXECUTE 'UPDATE '
    || quote_ident(atopology)
    || '.edge_data SET right_face = '
    || quote_literal(faceid)
    || ', left_face = '
    || quote_literal(faceid)
    || ' WHERE ST_Contains($1, geom)'
    USING apoly;

  --
  -- Set containing_face of any contained node
  --
  EXECUTE 'UPDATE '
    || quote_ident(atopology)
    || '.node SET containing_face = '
    || quote_literal(faceid)
    || ' WHERE containing_face IS NOT NULL AND ST_Contains($1, geom)'
    USING apoly;

  RETURN faceid;

END
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.TopoGeo_AddPoint(atopology varchar, apoint geometry, tolerance float8 DEFAULT 0)
	RETURNS int AS
	'$libdir/postgis_topology-3', 'TopoGeo_AddPoint'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.TopoGeo_AddLinestring(atopology varchar, aline geometry, tolerance float8 DEFAULT 0)
	RETURNS SETOF int AS
	'$libdir/postgis_topology-3', 'TopoGeo_AddLinestring'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.TopoGeo_AddPolygon(atopology varchar, apoly geometry, tolerance float8 DEFAULT 0)
	RETURNS SETOF int AS
	'$libdir/postgis_topology-3', 'TopoGeo_AddPolygon'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.TopoGeo_LoadGeometry(atopology varchar, ageom geometry, tolerance float8 DEFAULT 0)
	RETURNS void AS
	'$libdir/postgis_topology-3', 'TopoGeo_LoadGeometry'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.TopoGeo_AddGeometry(atopology varchar, ageom geometry, tolerance float8 DEFAULT 0)
	RETURNS void AS
$$
DECLARE
BEGIN
	RAISE EXCEPTION 'TopoGeo_AddGeometry not implemented yet, use TopoGeo_LoadGeometry';
END
$$
LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION topology._TopoGeo_AddLinestringNoFace(atopology varchar, aline geometry, tolerance float8 DEFAULT 0)
	RETURNS void AS
	'$libdir/postgis_topology-3', 'TopoGeo_AddLinestringNoFace'
  LANGUAGE 'c' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology._RegisterMissingFaces(atopology varchar)
	RETURNS void AS
	'$libdir/postgis_topology-3', 'RegisterMissingFaces'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.polygonize(toponame varchar)
  RETURNS text
AS
$$
DECLARE
  sql text;
  rec RECORD;
  faces int;
BEGIN

  sql := 'SELECT (st_dump(st_polygonize(geom))).geom from '
         || quote_ident(toponame) || '.edge_data';

  faces = 0;
  FOR rec in EXECUTE sql LOOP
    BEGIN
      PERFORM topology.AddFace(toponame, rec.geom);
      faces = faces + 1;
    EXCEPTION
      WHEN OTHERS THEN
        RAISE WARNING 'Error registering face % (%)', rec.geom, SQLERRM;
    END;
  END LOOP;
  RETURN faces || ' faces registered';
END
$$
LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION topology.TopoElementArray_append(topology.TopoElementArray, topology.TopoElement)
	RETURNS topology.TopoElementArray
AS
$$
	SELECT CASE
		WHEN $1 IS NULL THEN
			topology.TopoElementArray('{' || $2::text || '}')
		ELSE
			topology.TopoElementArray($1::int[][]||$2::int[])
		END;
$$
LANGUAGE 'sql' IMMUTABLE;
DROP AGGREGATE IF EXISTS topology.TopoElementArray_agg(topology.TopoElement);
-- Aggregate topology.TopoElementArray_agg(topology.TopoElement) -- LastUpdated: 200
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF pg_catalog.current_setting('server_version_num')::integer >= 120000
  THEN
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE OR REPLACE AGGREGATE topology.TopoElementArray_agg(
	sfunc = topology.TopoElementArray_append,
	basetype = topology.TopoElement,
	stype = topology.TopoElementArray
	);
 $postgis_proc_upgrade_parsed_def$;
  ELSIF 200 > version_from_num OR (
      200 = version_from_num AND version_from_isdev
    ) FROM _postgis_upgrade_info()
  THEN
    EXECUTE 'DROP AGGREGATE IF EXISTS topology.TopoElementArray_agg(topology.TopoElement)';
    EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE AGGREGATE topology.TopoElementArray_agg(
	sfunc = topology.TopoElementArray_append,
	basetype = topology.TopoElement,
	stype = topology.TopoElementArray
	);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION topology.GeometryType(tg topology.TopoGeometry)
	RETURNS text
AS
$$
	SELECT CASE
		WHEN type($1) = 1 THEN 'MULTIPOINT'
		WHEN type($1) = 2 THEN 'MULTILINESTRING'
		WHEN type($1) = 3 THEN 'MULTIPOLYGON'
		WHEN type($1) = 4 THEN 'GEOMETRYCOLLECTION'
		ELSE 'UNEXPECTED'
		END;
$$
LANGUAGE 'sql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.ST_GeometryType(tg topology.TopoGeometry)
	RETURNS text
AS
$$
	SELECT CASE
		WHEN type($1) = 1 THEN 'ST_MultiPoint'
		WHEN type($1) = 2 THEN 'ST_MultiLinestring'
		WHEN type($1) = 3 THEN 'ST_MultiPolygon'
		WHEN type($1) = 4 THEN 'ST_GeometryCollection'
		ELSE 'ST_Unexpected'
		END;
$$
LANGUAGE 'sql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.ST_Srid(tg topology.TopoGeometry)
	RETURNS INT
AS
$$
	SELECT srid FROM topology.topology
  WHERE id = topology_id(tg);
$$
LANGUAGE 'sql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.clearTopoGeom(tg topology.TopoGeometry)
  RETURNS topology.TopoGeometry
AS
$$
DECLARE
  topology_info RECORD;
  sql TEXT;
BEGIN

  -- Get topology information
  SELECT id, name FROM topology.topology
    INTO topology_info
    WHERE id = topology_id(tg);
  IF NOT FOUND THEN
      RAISE EXCEPTION 'No topology with id "%" in topology.topology', topology_id(tg);
  END IF;

  -- Clear the TopoGeometry contents
  sql := 'DELETE FROM ' || quote_ident(topology_info.name)
        || '.relation WHERE layer_id = '
        || layer_id(tg)
        || ' AND topogeo_id = '
        || id(tg);

  EXECUTE sql;

  RETURN tg;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.ST_Simplify(tg topology.TopoGeometry, tolerance float8)
  RETURNS geometry
AS
$$
DECLARE
  topology_info RECORD;
  layer_info RECORD;
  child_layer_info RECORD;
  geom geometry;
  sql TEXT;
BEGIN

  -- Get topology information
  SELECT id, name FROM topology.topology
    INTO topology_info
    WHERE id = tg.topology_id;
  IF NOT FOUND THEN
      RAISE EXCEPTION 'No topology with id "%" in topology.topology', tg.topology_id;
  END IF;

  -- Get layer info
  SELECT * FROM topology.layer
    WHERE topology_id = tg.topology_id
    AND layer_id = tg.layer_id
    INTO layer_info;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Could not find TopoGeometry layer % in topology %', tg.layer_id, tg.topology_id;
  END IF;

  --
  -- If this feature layer is on any level > 0 we will
  -- compute the topological union of all simplified child
  -- features in fact recursing.
  --
  IF layer_info.level > 0 THEN -- {

    -- Get child layer info
    SELECT * FROM topology.layer WHERE layer_id = layer_info.child_id
      AND topology_id = tg.topology_id
      INTO child_layer_info;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Invalid layer % in topology % (unexistent child layer %)', tg.layer_id, tg.topology_id, layer_info.child_id;
    END IF;

    sql := 'SELECT st_multi(st_union(topology.ST_Simplify('
      || quote_ident(child_layer_info.feature_column)
      || ',' || tolerance || '))) as geom FROM '
      || quote_ident(child_layer_info.schema_name) || '.'
      || quote_ident(child_layer_info.table_name)
      || ', ' || quote_ident(topology_info.name) || '.relation pr'
      || ' WHERE '
      || ' pr.topogeo_id = ' || tg.id
      || ' AND '
      || ' pr.layer_id = ' || tg.layer_id
      || ' AND '
      || ' id('||quote_ident(child_layer_info.feature_column)
      || ') = pr.element_id '
      || ' AND '
      || 'layer_id('||quote_ident(child_layer_info.feature_column)
      || ') = pr.element_type ';
    RAISE DEBUG '%', sql;
    EXECUTE sql INTO geom;

  ELSIF tg.type = 3 THEN -- [multi]polygon -- }{

    -- TODO: use ST_GetFaceEdges
    -- TODO: is st_unaryunion needed?
    sql := 'SELECT st_multi(st_unaryunion(ST_BuildArea(ST_Node(ST_Collect(ST_Simplify(geom, '
      || tolerance || ')))))) as geom FROM '
      || quote_ident(topology_info.name)
      || '.edge_data e, '
      || quote_ident(topology_info.name)
      || '.relation r WHERE ( e.left_face = r.element_id'
      || ' OR e.right_face = r.element_id )'
      || ' AND r.topogeo_id = ' || tg.id
      || ' AND r.layer_id = ' || tg.layer_id
      || ' AND element_type = 3 ';
    RAISE DEBUG '%', sql;
    EXECUTE sql INTO geom;

  ELSIF tg.type = 2 THEN -- [multi]line -- }{

    sql :=
      'SELECT st_multi(ST_LineMerge(ST_Node(ST_Collect(ST_Simplify(e.geom,'
      || tolerance || '))))) as g FROM '
      || quote_ident(topology_info.name) || '.edge e, '
      || quote_ident(topology_info.name) || '.relation r '
      || ' WHERE r.topogeo_id = ' || tg.id
      || ' AND r.layer_id = ' || tg.layer_id
      || ' AND r.element_type = 2 '
      || ' AND abs(r.element_id) = e.edge_id';
    EXECUTE sql INTO geom;

  ELSIF tg.type = 1 THEN -- [multi]point -- }{

    -- Can't simplify points...
    geom := topology.Geometry(tg);

  ELSIF tg.type = 4 THEN -- mixed collection -- }{

   sql := 'WITH areas AS ( '
      || 'SELECT st_multi(st_union(ST_BuildArea(ST_Node(ST_Collect(ST_Simplify(geom, '
      || tolerance || ')))) as geom FROM '
      || quote_ident(topology_info.name)
      || '.edge_data e, '
      || quote_ident(topology_info.name)
      || '.relation r WHERE ( e.left_face = r.element_id'
      || ' OR e.right_face = r.element_id )'
      || ' AND r.topogeo_id = ' || tg.id
      || ' AND r.layer_id = ' || tg.layer_id
      || ' AND element_type = 3 ), '
      || 'lines AS ( '
      || 'SELECT st_multi(ST_LineMerge(ST_Collect(ST_Simplify(e.geom,'
      || tolerance || ')))) as g FROM '
      || quote_ident(topology_info.name) || '.edge e, '
      || quote_ident(topology_info.name) || '.relation r '
      || ' WHERE r.topogeo_id = ' || tg.id
      || ' AND r.layer_id = ' || tg.layer_id
      || ' AND r.element_type = 2 '
      || ' AND abs(r.element_id) = e.edge_id ), '
      || ' points as ( SELECT st_union(n.geom) as g FROM '
      || quote_ident(topology_info.name) || '.node n, '
      || quote_ident(topology_info.name) || '.relation r '
      || ' WHERE r.topogeo_id = ' || tg.id
      || ' AND r.layer_id = ' || tg.layer_id
      || ' AND r.element_type = 1 '
      || ' AND r.element_id = n.node_id ), '
      || ' un as ( SELECT g FROM areas UNION ALL SELECT g FROM lines '
      || '          UNION ALL SELECT g FROM points ) '
      || 'SELECT ST_Multi(ST_Collect(g)) FROM un';
    EXECUTE sql INTO geom;

  ELSE -- }{

    RAISE EXCEPTION 'Invalid TopoGeometries (unknown type %)', tg.type;

  END IF; -- }

  RETURN geom;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.toTopoGeom(ageom Geometry, atopology varchar, alayer int, atolerance float8 DEFAULT 0)
  RETURNS topology.TopoGeometry
AS
$$
DECLARE
  layer_info RECORD;
  topology_info RECORD;
  tg topology.TopoGeometry;
  typ TEXT;
BEGIN

  -- Get topology information
  BEGIN
    SELECT *
    FROM topology.topology
      INTO STRICT topology_info WHERE name = atopology;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE EXCEPTION 'No topology with name "%" in topology.topology',
        atopology;
  END;

  -- Get layer information
  BEGIN
    SELECT *, CASE
      WHEN feature_type = 1 THEN 'puntal'
      WHEN feature_type = 2 THEN 'lineal'
      WHEN feature_type = 3 THEN 'areal'
      WHEN feature_type = 4 THEN 'mixed'
      ELSE 'unexpected_'||feature_type
      END as typename
    FROM topology.layer l
      INTO STRICT layer_info
      WHERE l.layer_id = alayer
      AND l.topology_id = topology_info.id;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE EXCEPTION 'No layer with id "%" in topology "%"',
        alayer, atopology;
  END;

  -- Can't convert to a hierarchical topogeometry
  IF layer_info.level > 0 THEN
      RAISE EXCEPTION 'Layer "%" of topology "%" is hierarchical, cannot convert to it.',
        alayer, atopology;
  END IF;

  --
  -- Check type compatibility and create empty TopoGeometry
  -- 1:puntal, 2:lineal, 3:areal, 4:collection
  --
  typ = geometrytype(ageom);
  IF typ = 'GEOMETRYCOLLECTION' THEN
    --  A collection can only go collection layer
    IF layer_info.feature_type != 4 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold a collection feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg := topology.CreateTopoGeom(atopology, 4, alayer);
  ELSIF typ = 'POINT' OR typ = 'MULTIPOINT' THEN -- puntal
    --  A point can go in puntal or collection layer
    IF layer_info.feature_type != 4 and layer_info.feature_type != 1 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold a puntal feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg := topology.CreateTopoGeom(atopology, 1, alayer);
  ELSIF typ = 'LINESTRING' or typ = 'MULTILINESTRING' THEN -- lineal
    --  A line can go in lineal or collection layer
    IF layer_info.feature_type != 4 and layer_info.feature_type != 2 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold a lineal feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg := topology.CreateTopoGeom(atopology, 2, alayer);
  ELSIF typ = 'POLYGON' OR typ = 'MULTIPOLYGON' THEN -- areal
    --  An area can go in areal or collection layer
    IF layer_info.feature_type != 4 and layer_info.feature_type != 3 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold an areal feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg := topology.CreateTopoGeom(atopology, 3, alayer);
  ELSE
      -- Should never happen
      RAISE EXCEPTION
        'Unsupported feature type %', typ;
  END IF;

  tg := topology.toTopoGeom(ageom, tg, atolerance);

  RETURN tg;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.toTopoGeom(ageom Geometry, tg topology.TopoGeometry, atolerance float8 DEFAULT 0)
  RETURNS topology.TopoGeometry
AS
$$
DECLARE
  layer_info RECORD;
  topology_info RECORD;
  rec RECORD;
  rec2 RECORD;
  elem TEXT;
  elems TEXT[];
  sql TEXT;
  typ TEXT;
  tolerance FLOAT8;
  alayer INT;
  atopology TEXT;
BEGIN



  -- Get topology information
  SELECT id, name FROM topology.topology
    INTO topology_info
    WHERE id = topology_id(tg);
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No topology with id "%" in topology.topology',
                    topology_id(tg);
  END IF;

  alayer := layer_id(tg);
  atopology := topology_info.name;

  -- Get tolerance, if 0 was given
  tolerance := COALESCE( NULLIF(atolerance, 0), topology._st_mintolerance(topology_info.name, ageom) );

  -- Get layer information
  BEGIN
    SELECT *, CASE
      WHEN feature_type = 1 THEN 'puntal'
      WHEN feature_type = 2 THEN 'lineal'
      WHEN feature_type = 3 THEN 'areal'
      WHEN feature_type = 4 THEN 'mixed'
      ELSE 'unexpected_'||feature_type
      END as typename
    FROM topology.layer l
      INTO STRICT layer_info
      WHERE l.layer_id = layer_id(tg)
      AND l.topology_id = topology_info.id;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE EXCEPTION 'No layer with id "%" in topology "%"',
        alayer, atopology;
  END;

  -- Can't convert to a hierarchical topogeometry
  IF layer_info.level > 0 THEN
      RAISE EXCEPTION 'Layer "%" of topology "%" is hierarchical, cannot convert a simple geometry to it.',
        alayer, atopology;
  END IF;

  --
  -- Check type compatibility and set TopoGeometry type
  -- 1:puntal, 2:lineal, 3:areal, 4:collection
  --
  typ = geometrytype(ageom);
  IF typ = 'GEOMETRYCOLLECTION' THEN
    --  A collection can only go to collection layer
    IF layer_info.feature_type != 4 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold a collection feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg.type := 4;
  ELSIF typ = 'POINT' OR typ = 'MULTIPOINT' THEN -- puntal
    --  A point can go in puntal or collection layer
    IF layer_info.feature_type != 4 and layer_info.feature_type != 1 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold a puntal feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg.type := CASE WHEN tg.type = 1 THEN 1 ELSE 4 END;
  ELSIF typ = 'LINESTRING' or typ = 'MULTILINESTRING' THEN -- lineal
    --  A line can go in lineal or collection layer
    IF layer_info.feature_type != 4 and layer_info.feature_type != 2 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold a lineal feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg.type := CASE WHEN tg.type = 2 THEN 2 ELSE 4 END;
  ELSIF typ = 'POLYGON' OR typ = 'MULTIPOLYGON' THEN -- areal
    --  An area can go in areal or collection layer
    IF layer_info.feature_type != 4 and layer_info.feature_type != 3 THEN
      RAISE EXCEPTION
        'Layer "%" of topology "%" is %, cannot hold an areal feature.',
        layer_info.layer_id, topology_info.name, layer_info.typename;
    END IF;
    tg.type := CASE WHEN tg.type = 3 THEN 3 ELSE 4 END;
  ELSE
      -- Should never happen
      RAISE EXCEPTION
        'Unexpected feature dimension %', ST_Dimension(ageom);
  END IF;

  -- Now that we have an empty topogeometry, we loop over distinct components
  -- and add them to the definition of it. We add them as soon
  -- as possible so that each element can further edit the
  -- definition by splitting
  FOR rec IN SELECT id(tg), alayer as lyr,
    geom, ST_Dimension(gd.geom) as dims
    FROM ST_Dump(ageom) AS gd
    WHERE NOT ST_IsEmpty(gd.geom)
  LOOP
    -- NOTE: Switched from using case to this because of PG 10 behavior change
    -- Using a UNION ALL only one will be processed because of the WHERE
    -- Since the WHERE clause will be processed first
    FOR rec2 IN SELECT primitive
          FROM
            (
              SELECT topology.topogeo_addPoint(atopology, rec.geom, tolerance)
                WHERE rec.dims = 0
              UNION ALL
              SELECT topology.topogeo_addLineString(atopology, rec.geom, tolerance)
                WHERE rec.dims = 1
              UNION ALL
              SELECT topology.topogeo_addPolygon(atopology, rec.geom, tolerance)
                WHERE rec.dims = 2
            ) AS f(primitive)
    LOOP
      elem := ARRAY[rec.dims+1, rec2.primitive]::text;
      IF elems @> ARRAY[elem] THEN

      ELSE

        elems := elems || elem;
        -- TODO: consider use a single INSERT statement for the whole thing
        sql := 'INSERT INTO ' || quote_ident(atopology)
            || '.relation(topogeo_id, layer_id, element_type, element_id) VALUES ('
            || rec.id || ',' || rec.lyr || ',' || rec.dims+1
            || ',' || rec2.primitive || ')'
            -- NOTE: we're avoiding duplicated rows here
            || ' EXCEPT SELECT ' || rec.id || ', ' || rec.lyr
            || ', element_type, element_id FROM '
            || quote_ident(topology_info.name)
            || '.relation WHERE layer_id = ' || rec.lyr
            || ' AND topogeo_id = ' || rec.id;

        EXECUTE sql;
      END IF;
    END LOOP;
  END LOOP;

  RETURN tg;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.TopoGeom_addElement(tg topology.TopoGeometry, el topology.TopoElement)
  RETURNS topology.TopoGeometry
AS
$$
DECLARE
  toponame TEXT;
  sql TEXT;
BEGIN

  -- Get topology name
  BEGIN
    SELECT name
    FROM topology.topology
      INTO STRICT toponame WHERE id = topology_id(tg);
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE EXCEPTION 'No topology with name "%" in topology.topology',
        atopology;
  END;

  -- Insert new element
  sql := format('INSERT INTO %s.relation'
         '(topogeo_id,layer_id,element_id,element_type)'
         ' VALUES($1,$2,$3,$4)', quote_ident(toponame));
  BEGIN
    EXECUTE sql USING id(tg), layer_id(tg), el[1], el[2];
  EXCEPTION
    WHEN unique_violation THEN
      -- already present, let go
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Got % (%)', SQLERRM, SQLSTATE;
  END;

  RETURN tg;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.TopoGeom_remElement(tg topology.TopoGeometry, el topology.TopoElement)
  RETURNS topology.TopoGeometry
AS
$$
DECLARE
  toponame TEXT;
  sql TEXT;
BEGIN

  -- Get topology name
  BEGIN
    SELECT name
    FROM topology.topology
      INTO STRICT toponame WHERE id = topology_id(tg);
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE EXCEPTION 'No topology with name "%" in topology.topology',
        atopology;
  END;

  -- Delete the element
  sql := format('DELETE FROM %s.relation WHERE '
         'topogeo_id = $1 AND layer_id = $2 AND '
         'element_id = $3 AND element_type = $4',
         quote_ident(toponame));
  EXECUTE sql USING id(tg), layer_id(tg), el[1], el[2];

  RETURN tg;

END
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.TopoGeom_addTopoGeom(tgt topology.TopoGeometry, src topology.TopoGeometry)
  RETURNS topology.TopoGeometry
AS
$BODY$
DECLARE
  sql TEXT;
  topo topology.topology;
  srcElementTypes int[];
  srcLayer topology.layer;
  tgtLayer topology.layer;
  maxElemType int;
BEGIN

  -- Get topology information
  topo := topology.FindTopology(topology_id(src));



  IF topology_id(src) != topology_id(tgt) THEN
    RAISE EXCEPTION 'Source and target TopoGeometry objects need be defined on the same topology';
  END IF;



  SELECT * FROM topology.layer
  WHERE topology_id = topo.id
    AND layer_id = layer_id(src)
  INTO srcLayer;

  SELECT * FROM topology.layer
  WHERE topology_id = topo.id
    AND layer_id = layer_id(tgt)
  INTO tgtLayer;

  -- Check simple/hierarchical compatibility
  IF srcLayer.child_id IS NULL THEN
    IF srcLayer.child_id IS NOT NULL THEN
      RAISE EXCEPTION 'Cannot add components of hierarchical TopoGeometry to a non-hierarchical TopoGeometry';
    END IF;
  ELSIF tgtLayer.child_id IS NULL THEN
      RAISE EXCEPTION 'Cannot add components of non-hierarchical TopoGeometry to a hierarchical TopoGeometry';
  ELSIF tgtLayer.child_id != srcLayer.childId THEN
      RAISE EXCEPTION 'Cannot add components of hierarchical TopoGeometry to a hierarchical TopoGeometry based on different layer';
  END IF;

  -- Add every element of the source TopoGeometry to
  -- the definition of the target TopoGeometry
  sql := format($$
WITH inserted AS (
  INSERT INTO %1$I.relation(
    topogeo_id,
    layer_id,
    element_id,
    element_type
  )
  SELECT %2$s, %3$s, element_id, element_type
  FROM %1$I.relation
  WHERE topogeo_id = %4$L
  AND layer_id = %5$L
  EXCEPT
  SELECT %2$s, %3$s, element_id, element_type
  FROM %1$I.relation
  WHERE topogeo_id = %2$L
  AND layer_id = %3$L
  RETURNING element_type
)
SELECT array_agg(DISTINCT element_type) FROM inserted
    $$,
    topo.name,      -- %1
    id(tgt),        -- %2
    layer_id(tgt),  -- %3
    id(src),        -- %4
    layer_id(src)   -- %5
  );

  RAISE DEBUG 'SQL: %', sql;

  EXECUTE sql INTO srcElementTypes;

  -- TODO: Check layer's feature_type compatibility ?
  -- or let the relationTrigger take care of it ?
--  IF tgtLayer.feature_type != 4 THEN -- 'mixed' typed target can accept anything
--    IF srcLayer.feature_type != tgtLayer.feature_type THEN
--    END IF;
--  END IF;

  RAISE DEBUG 'Target type: %', type(tgt);
  RAISE DEBUG 'Detected source element types: %', srcElementTypes;

  -- Check if target TopoGeometry type needs be changed
  IF type(tgt) != 4 -- collection TopoGeometry accept anything
  THEN
    IF array_upper(srcElementTypes, 1) > 1
    OR srcElementTypes[1] != tgt.type
    THEN
      -- source is mixed-typed or typed differently from
      -- target, so we turn target type to collection
      RAISE DEBUG 'Changing target element type to collection';
      tgt.type = 4;
    END IF;
  END IF;




  RETURN tgt;
END
$BODY$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology._AsGMLNode(id int, point geometry, nsprefix_in text, prec int, options int, idprefix text, gmlver int)
  RETURNS text
AS
$$
DECLARE
  nsprefix text;
  gml text;
BEGIN

  nsprefix := 'gml:';
  IF NOT nsprefix_in IS NULL THEN
    IF nsprefix_in = '' THEN
      nsprefix = nsprefix_in;
    ELSE
      nsprefix = nsprefix_in || ':';
    END IF;
  END IF;

  gml := '<' || nsprefix || 'Node ' || nsprefix
    || 'id="' || idprefix || 'N' || id || '"';
  IF point IS NOT NULL THEN
    gml = gml || '>'
              || '<' || nsprefix || 'pointProperty>'
              || ST_AsGML(gmlver, point, prec, options, nsprefix_in)
              || '</' || nsprefix || 'pointProperty>'
              || '</' || nsprefix || 'Node>';
  ELSE
    gml = gml || '/>';
  END IF;
  RETURN gml;
END
$$
LANGUAGE 'plpgsql' IMMUTABLE;
CREATE OR REPLACE FUNCTION topology._AsGMLEdge(edge_id int, start_node int,end_node int, line geometry, visitedTable regclass, nsprefix_in text, prec int, options int, idprefix text, gmlver int)
  RETURNS text
AS
$$
DECLARE
  visited bool;
  nsprefix text;
  gml text;
BEGIN

  nsprefix := 'gml:';
  IF nsprefix_in IS NOT NULL THEN
    IF nsprefix_in = '' THEN
      nsprefix = nsprefix_in;
    ELSE
      nsprefix = nsprefix_in || ':';
    END IF;
  END IF;

  gml := '<' || nsprefix || 'Edge ' || nsprefix
    || 'id="' || idprefix || 'E' || edge_id || '">';

  -- Start node
  gml = gml || '<' || nsprefix || 'directedNode orientation="-"';
  -- Do visited bookkeeping if visitedTable was given
  visited = NULL;
  IF visitedTable IS NOT NULL THEN
    EXECUTE 'SELECT true FROM '
            || visitedTable::text
            || ' WHERE element_type = 1 AND element_id = '
            || start_node LIMIT 1 INTO visited;
    IF visited IS NOT NULL THEN
      gml = gml || ' xlink:href="#' || idprefix || 'N' || start_node || '" />';
    ELSE
      -- Mark as visited
      EXECUTE 'INSERT INTO ' || visitedTable::text
        || '(element_type, element_id) VALUES (1, '
        || start_node || ')';
    END IF;
  END IF;
  IF visited IS NULL THEN
    gml = gml || '>';
    gml = gml || topology._AsGMLNode(start_node, NULL, nsprefix_in,
                                     prec, options, idprefix, gmlver);
    gml = gml || '</' || nsprefix || 'directedNode>';
  END IF;

  -- End node
  gml = gml || '<' || nsprefix || 'directedNode';
  -- Do visited bookkeeping if visitedTable was given
  visited = NULL;
  IF visitedTable IS NOT NULL THEN
    EXECUTE 'SELECT true FROM '
            || visitedTable::text
            || ' WHERE element_type = 1 AND element_id = '
            || end_node LIMIT 1 INTO visited;
    IF visited IS NOT NULL THEN
      gml = gml || ' xlink:href="#' || idprefix || 'N' || end_node || '" />';
    ELSE
      -- Mark as visited
      EXECUTE 'INSERT INTO ' || visitedTable::text
        || '(element_type, element_id) VALUES (1, '
        || end_node || ')';
    END IF;
  END IF;
  IF visited IS NULL THEN
    gml = gml || '>';
    gml = gml || topology._AsGMLNode(end_node, NULL, nsprefix_in,
                                     prec, options, idprefix, gmlver);
    gml = gml || '</' || nsprefix || 'directedNode>';
  END IF;

  IF line IS NOT NULL THEN
    gml = gml || '<' || nsprefix || 'curveProperty>'
              || ST_AsGML(gmlver, line, prec, options, nsprefix_in)
              || '</' || nsprefix || 'curveProperty>';
  END IF;

  gml = gml || '</' || nsprefix || 'Edge>';

  RETURN gml;
END
$$
LANGUAGE 'plpgsql' VOLATILE; -- writes into visitedTable
CREATE OR REPLACE FUNCTION topology._AsGMLFace(toponame text, face_id int, visitedTable regclass, nsprefix_in text, prec int, options int, idprefix text, gmlver int)
  RETURNS text
AS
$$
DECLARE
  visited bool;
  nsprefix text;
  gml text;
  rec RECORD;
  rec2 RECORD;
  bounds geometry;
BEGIN

  nsprefix := 'gml:';
  IF nsprefix_in IS NOT NULL THEN
    IF nsprefix_in = '' THEN
      nsprefix = nsprefix_in;
    ELSE
      nsprefix = nsprefix_in || ':';
    END IF;
  END IF;

  gml := '<' || nsprefix || 'Face ' || nsprefix
    || 'id="' || idprefix || 'F' || face_id || '">';

  -- Construct the face geometry, then for each polygon:
  FOR rec IN SELECT (ST_DumpRings((ST_Dump(ST_ForceRHR(
    topology.ST_GetFaceGeometry(toponame, face_id)))).geom)).geom
  LOOP

      -- Contents of a directed face are the list of edges
      -- that cover the specific ring
      bounds = ST_Boundary(rec.geom);

      FOR rec2 IN EXECUTE
        'SELECT e.*, ST_LineLocatePoint($1'
        || ', ST_LineInterpolatePoint(e.geom, 0.2)) as pos'
        || ', ST_LineLocatePoint($1'
        || ', ST_LineInterpolatePoint(e.geom, 0.8)) as pos2 FROM '
        || quote_ident(toponame)
        || '.edge e WHERE ( e.left_face = $2'
        || ' OR e.right_face = $2'
        || ') AND ST_Covers($1'
        || ', e.geom) ORDER BY pos'
        USING bounds, face_id
      LOOP

        gml = gml || '<' || nsprefix || 'directedEdge';

        -- if this edge goes in same direction to the
        --       ring bounds, make it with negative orientation
        IF rec2.pos2 > rec2.pos THEN -- edge goes in same direction
          gml = gml || ' orientation="-"';
        END IF;

        -- Do visited bookkeeping if visitedTable was given
        IF visitedTable IS NOT NULL THEN

          EXECUTE 'SELECT true FROM '
            || visitedTable::text
            || ' WHERE element_type = 2 AND element_id = '
            || rec2.edge_id LIMIT 1 INTO visited;
          IF visited THEN
            -- Use xlink:href if visited
            gml = gml || ' xlink:href="#' || idprefix || 'E'
                      || rec2.edge_id || '" />';
            CONTINUE;
          ELSE
            -- Mark as visited otherwise
            EXECUTE 'INSERT INTO ' || visitedTable::text
              || '(element_type, element_id) VALUES (2, '
              || rec2.edge_id || ')';
          END IF;

        END IF;

        gml = gml || '>';

        gml = gml || topology._AsGMLEdge(rec2.edge_id, rec2.start_node,
                                        rec2.end_node, rec2.geom,
                                        visitedTable, nsprefix_in,
                                        prec, options, idprefix, gmlver);
        gml = gml || '</' || nsprefix || 'directedEdge>';

      END LOOP;
    END LOOP;

  gml = gml || '</' || nsprefix || 'Face>';

  RETURN gml;
END
$$
LANGUAGE 'plpgsql' VOLATILE; -- writes into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry, nsprefix_in text, precision_in int, options_in int, visitedTable regclass, idprefix text, gmlver int)
  RETURNS text
AS
$$
DECLARE
  nsprefix text;
  precision int;
  options int;
  visited bool;
  toponame text;
  gml text;
  sql text;
  rec RECORD;
  rec2 RECORD;
BEGIN

  nsprefix := 'gml:';
  IF nsprefix_in IS NOT NULL THEN
    IF nsprefix_in = '' THEN
      nsprefix = nsprefix_in;
    ELSE
      nsprefix = nsprefix_in || ':';
    END IF;
  END IF;

  precision := 15;
  IF precision_in IS NOT NULL THEN
    precision = precision_in;
  END IF;

  options := 1;
  IF options_in IS NOT NULL THEN
    options = options_in;
  END IF;

  -- Get topology name (for subsequent queries)
  SELECT name FROM topology.topology into toponame
              WHERE id = tg.topology_id;

  -- Puntual TopoGeometry
  IF tg.type = 1 THEN
    gml = '<' || nsprefix || 'TopoPoint>';
    -- For each defining node, print a directedNode
    FOR rec IN  EXECUTE 'SELECT r.element_id, n.geom from '
      || quote_ident(toponame) || '.relation r LEFT JOIN '
      || quote_ident(toponame) || '.node n ON (r.element_id = n.node_id)'
      || ' WHERE r.layer_id = ' || tg.layer_id
      || ' AND r.topogeo_id = ' || tg.id
    LOOP
      gml = gml || '<' || nsprefix || 'directedNode';
      -- Do visited bookkeeping if visitedTable was given
      IF visitedTable IS NOT NULL THEN
        EXECUTE 'SELECT true FROM '
                || visitedTable::text
                || ' WHERE element_type = 1 AND element_id = '
                || rec.element_id LIMIT 1 INTO visited;
        IF visited IS NOT NULL THEN
          gml = gml || ' xlink:href="#' || idprefix || 'N' || rec.element_id || '" />';
          CONTINUE;
        ELSE
          -- Mark as visited
          EXECUTE 'INSERT INTO ' || visitedTable::text
            || '(element_type, element_id) VALUES (1, '
            || rec.element_id || ')';
        END IF;
      END IF;
      gml = gml || '>';
      gml = gml || topology._AsGMLNode(rec.element_id, rec.geom, nsprefix_in, precision, options, idprefix, gmlver);
      gml = gml || '</' || nsprefix || 'directedNode>';
    END LOOP;
    gml = gml || '</' || nsprefix || 'TopoPoint>';
    RETURN gml;

  ELSIF tg.type = 2 THEN -- lineal
    gml = '<' || nsprefix || 'TopoCurve>';

    FOR rec IN SELECT (ST_Dump(topology.Geometry(tg))).geom
    LOOP
      FOR rec2 IN EXECUTE
        'SELECT e.*, ST_LineLocatePoint($1'
        || ', ST_LineInterpolatePoint(e.geom, 0.2)) as pos'
        || ', ST_LineLocatePoint($1'
        || ', ST_LineInterpolatePoint(e.geom, 0.8)) as pos2 FROM '
        || quote_ident(toponame)
        || '.edge e WHERE ST_Covers($1'
        || ', e.geom) ORDER BY pos'
        -- TODO: add relation to the conditional, to reduce load ?
        USING rec.geom
      LOOP

        gml = gml || '<' || nsprefix || 'directedEdge';

        -- if this edge goes in opposite direction to the
        --       line, make it with negative orientation
        IF rec2.pos2 < rec2.pos THEN -- edge goes in opposite direction
          gml = gml || ' orientation="-"';
        END IF;

        -- Do visited bookkeeping if visitedTable was given
        IF visitedTable IS NOT NULL THEN

          EXECUTE 'SELECT true FROM '
            || visitedTable::text
            || ' WHERE element_type = 2 AND element_id = '
            || rec2.edge_id LIMIT 1 INTO visited;
          IF visited THEN
            -- Use xlink:href if visited
            gml = gml || ' xlink:href="#' || idprefix || 'E' || rec2.edge_id || '" />';
            CONTINUE;
          ELSE
            -- Mark as visited otherwise
            EXECUTE 'INSERT INTO ' || visitedTable::text
              || '(element_type, element_id) VALUES (2, '
              || rec2.edge_id || ')';
          END IF;

        END IF;

        gml = gml || '>';

        gml = gml || topology._AsGMLEdge(rec2.edge_id,
                                        rec2.start_node,
                                        rec2.end_node, rec2.geom,
                                        visitedTable,
                                        nsprefix_in, precision,
                                        options, idprefix, gmlver);

        gml = gml || '</' || nsprefix || 'directedEdge>';
      END LOOP;
    END LOOP;

    gml = gml || '</' || nsprefix || 'TopoCurve>';
    return gml;

  ELSIF tg.type = 3 THEN -- areal
    gml = '<' || nsprefix || 'TopoSurface>';

    -- For each defining face, print a directedFace
    FOR rec IN  EXECUTE 'SELECT f.face_id from '
      || quote_ident(toponame) || '.relation r LEFT JOIN '
      || quote_ident(toponame) || '.face f ON (r.element_id = f.face_id)'
      || ' WHERE r.layer_id = ' || tg.layer_id
      || ' AND r.topogeo_id = ' || tg.id
    LOOP
      gml = gml || '<' || nsprefix || 'directedFace';
      -- Do visited bookkeeping if visitedTable was given
      IF visitedTable IS NOT NULL THEN
        EXECUTE 'SELECT true FROM '
                || visitedTable::text
                || ' WHERE element_type = 3 AND element_id = '
                || rec.face_id LIMIT 1 INTO visited;
        IF visited IS NOT NULL THEN
          gml = gml || ' xlink:href="#' || idprefix || 'F' || rec.face_id || '" />';
          CONTINUE;
        ELSE
          -- Mark as visited
          EXECUTE 'INSERT INTO ' || visitedTable::text
            || '(element_type, element_id) VALUES (3, '
            || rec.face_id || ')';
        END IF;
      END IF;
      gml = gml || '>';
      gml = gml || topology._AsGMLFace(toponame, rec.face_id, visitedTable,
                                       nsprefix_in, precision,
                                       options, idprefix, gmlver);
      gml = gml || '</' || nsprefix || 'directedFace>';
    END LOOP;
    gml = gml || '</' || nsprefix || 'TopoSurface>';
    RETURN gml;

  ELSIF tg.type = 4 THEN -- collection
    RAISE EXCEPTION 'Collection TopoGeometries are not supported by AsGML';

  END IF;

  RETURN gml;

END
$$
LANGUAGE 'plpgsql' VOLATILE; -- writes into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry,nsprefix text, prec int, options int, visitedTable regclass, idprefix text)
  RETURNS text
AS
$$
 SELECT topology.AsGML($1, $2, $3, $4, $5, $6, 3);
$$
LANGUAGE 'sql' VOLATILE; -- writes into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry, nsprefix text, prec int, options int, vis regclass)
  RETURNS text AS
$$
 SELECT topology.AsGML($1, $2, $3, $4, $5, '');
$$ LANGUAGE 'sql' VOLATILE; -- writes into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry, nsprefix text, prec int, opts int)
  RETURNS text AS
$$
 SELECT topology.AsGML($1, $2, $3, $4, NULL);
$$ LANGUAGE 'sql' STABLE; -- does NOT write into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry, nsprefix text)
  RETURNS text AS
$$
 SELECT topology.AsGML($1, $2, 15, 1, NULL);
$$ LANGUAGE 'sql' STABLE; -- does NOT write into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry, visitedTable regclass)
  RETURNS text AS
$$
 SELECT topology.AsGML($1, 'gml', 15, 1, $2);
$$ LANGUAGE 'sql' VOLATILE; -- writes into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry, visitedTable regclass, nsprefix text)
  RETURNS text AS
$$
 SELECT topology.AsGML($1, $3, 15, 1, $2);
$$ LANGUAGE 'sql' VOLATILE; -- writes into visited table
CREATE OR REPLACE FUNCTION topology.AsGML(tg topology.TopoGeometry)
  RETURNS text AS
$$
 SELECT topology.AsGML($1, 'gml');
$$ LANGUAGE 'sql' STABLE; -- does NOT write into visited table
CREATE OR REPLACE FUNCTION topology.AsTopoJSON(tg topology.TopoGeometry, edgeMapTable regclass)
  RETURNS text AS
$$
DECLARE
  toponame text;
  json text;
  sql text;
  rec RECORD;
  rec2 RECORD;
  side int;
  arcid int;
  arcs int[];
  ringtxt TEXT[];
  comptxt TEXT[];
  edges_found BOOLEAN;
  old_search_path TEXT;
  all_faces int[];
  faces int[];
  shell_faces int[];
  visited_edges int[];
  looking_for_holes BOOLEAN;
BEGIN

  IF tg IS NULL THEN
    RETURN NULL;
  END IF;

  -- Get topology name (for subsequent queries)
  SELECT name FROM topology.topology into toponame
              WHERE id = tg.topology_id;

  -- TODO: implement scale ?

  -- Puntal TopoGeometry, simply delegate to AsGeoJSON
  IF tg.type = 1 THEN
    json := ST_AsGeoJSON(topology.Geometry(tg));
    return json;
  ELSIF tg.type = 2 THEN -- lineal

    FOR rec IN SELECT (ST_Dump(topology.Geometry(tg))).geom
    LOOP -- {

      sql := 'SELECT e.*, ST_LineLocatePoint($1'
            || ', ST_LineInterpolatePoint(e.geom, 0.2)) as pos'
            || ', ST_LineLocatePoint($1'
            || ', ST_LineInterpolatePoint(e.geom, 0.8)) as pos2 FROM '
            || quote_ident(toponame)
            || '.edge e WHERE ST_Covers($1'
            || ', e.geom) ORDER BY pos';
            -- TODO: add relation to the conditional, to reduce load ?
      FOR rec2 IN EXECUTE sql USING rec.geom
      LOOP -- {

        IF edgeMapTable IS NOT NULL THEN
          sql := 'SELECT arc_id-1 FROM ' || edgeMapTable::text || ' WHERE edge_id = $1';
          EXECUTE sql INTO arcid USING rec2.edge_id;
          IF arcid IS NULL THEN
            EXECUTE 'INSERT INTO ' || edgeMapTable::text
              || '(edge_id) VALUES ($1) RETURNING arc_id-1'
            INTO arcid USING rec2.edge_id;
          END IF;
        ELSE
          arcid := rec2.edge_id;
        END IF;

        -- edge goes in opposite direction
        IF rec2.pos2 < rec2.pos THEN
          arcid := -(arcid+1);
        END IF;

        arcs := arcs || arcid;

      END LOOP; -- }

      comptxt := comptxt || ( '[' || array_to_string(arcs, ',') || ']' );
      arcs := NULL;

    END LOOP; -- }

    json := '{ "type": "MultiLineString", "arcs": [' || array_to_string(comptxt,',') || ']}';

    return json;

  ELSIF tg.type = 3 THEN -- areal

    json := '{ "type": "MultiPolygon", "arcs": [';

    EXECUTE 'SHOW search_path' INTO old_search_path;
    EXECUTE 'SET search_path TO ' || quote_ident(toponame) || ',' || old_search_path;

    SELECT array_agg(id) as f
    FROM ( SELECT (topology.GetTopoGeomElements(tg))[1] as id ) as f
    INTO all_faces;



    visited_edges := ARRAY[]::int[];
    faces := all_faces;
    looking_for_holes := false;
    shell_faces := ARRAY[]::int[];

    CREATE TEMP TABLE _postgis_topology_astopojson_tmp_edges
    ON COMMIT DROP
    AS
    SELECT
         ROW_NUMBER() OVER (
            ORDER BY
              ST_XMin(e.geom),
              ST_YMin(e.geom),
              edge_id
         ) leftmost_index,
         e.edge_id,
         e.left_face,
         e.right_face,
         e.next_right_edge,
         e.next_left_edge
    FROM edge e
    WHERE
         ( e.left_face = ANY ( all_faces ) OR
           e.right_face = ANY ( all_faces ) )
    ;
    CREATE INDEX on _postgis_topology_astopojson_tmp_edges (edge_id);

    LOOP -- { until all edges were visited

      arcs := NULL;
      edges_found := false;



      FOR rec in -- {
WITH RECURSIVE
_edges AS (
  SELECT
     *,
     left_face = ANY ( faces ) as lf,
     right_face = ANY ( faces ) as rf
  FROM
    _postgis_topology_astopojson_tmp_edges
),
_leftmost_non_dangling_edge AS (
  SELECT e.edge_id
    FROM _edges e WHERE e.lf != e.rf
  ORDER BY
    leftmost_index
  LIMIT 1
),
_edgepath AS (
  SELECT
    CASE
      WHEN e.lf THEN lme.edge_id
      ELSE -lme.edge_id
    END as signed_edge_id,
    false as back,

    e.lf = e.rf as dangling,
    e.left_face, e.right_face,
    e.lf, e.rf,
    e.next_right_edge, e.next_left_edge

  FROM _edges e, _leftmost_non_dangling_edge lme
  WHERE e.edge_id = abs(lme.edge_id)
    UNION
  SELECT
    CASE
      WHEN p.dangling AND NOT p.back THEN -p.signed_edge_id
      WHEN p.signed_edge_id < 0 THEN p.next_right_edge
      ELSE p.next_left_edge
    END, -- signed_edge_id
    CASE
      WHEN p.dangling AND NOT p.back THEN true
      ELSE false
    END, -- back

    e.lf = e.rf, -- dangling
    e.left_face, e.right_face,
    e.lf, e.rf,
    e.next_right_edge, e.next_left_edge

  FROM _edges e, _edgepath p
  WHERE
    e.edge_id = CASE
      WHEN p.dangling AND NOT p.back THEN abs(p.signed_edge_id)
      WHEN p.signed_edge_id < 0 THEN abs(p.next_right_edge)
      ELSE abs(p.next_left_edge)
    END
)
SELECT abs(signed_edge_id) as edge_id, signed_edge_id, dangling,
        lf, rf, left_face, right_face
FROM _edgepath
      -- }

      LOOP  -- { over recursive query



        IF rec.left_face = ANY (all_faces) AND NOT rec.left_face = ANY (shell_faces) THEN
          shell_faces := shell_faces || rec.left_face;
        END IF;

        IF rec.right_face = ANY (all_faces) AND NOT rec.right_face = ANY (shell_faces) THEN
          shell_faces := shell_faces || rec.right_face;
        END IF;

        visited_edges := visited_edges || rec.edge_id;

        edges_found := true;

        -- TODO: drop ?
        IF rec.dangling THEN
          CONTINUE;
        END IF;

        IF rec.left_face = ANY (all_faces) AND rec.right_face = ANY (all_faces) THEN
          CONTINUE;
        END IF;

        IF edgeMapTable IS NOT NULL THEN
          sql := 'SELECT arc_id-1 FROM ' || edgeMapTable::text || ' WHERE edge_id = $1';
          EXECUTE sql INTO arcid USING rec.edge_id;
          IF arcid IS NULL THEN
            EXECUTE 'INSERT INTO ' || edgeMapTable::text
              || '(edge_id) VALUES ($1) RETURNING arc_id-1'
            INTO arcid USING rec.edge_id;
          END IF;
        ELSE
          arcid := rec.edge_id-1;
        END IF;

        -- Swap sign, use two's complement for negative edges
        IF rec.signed_edge_id >= 0 THEN
          arcid := - ( arcid + 1 );
        END IF;



        arcs := arcid || arcs;

      END LOOP; -- } over recursive query

      DELETE from _postgis_topology_astopojson_tmp_edges
      WHERE edge_id = ANY (visited_edges);
      visited_edges := ARRAY[]::int[];



      IF NOT edges_found THEN -- {

        IF looking_for_holes THEN
          looking_for_holes := false;

          comptxt := comptxt || ( '[' || array_to_string(ringtxt, ',') || ']' );
          ringtxt := NULL;
          faces := all_faces;
          shell_faces := ARRAY[]::int[];
        ELSE
          EXIT; -- end of loop
        END IF;

      ELSE -- } edges found {

        faces := shell_faces;
        IF arcs IS NOT NULL THEN

          ringtxt := ringtxt || ( '[' || array_to_string(arcs,',') || ']' );
        END IF;
        looking_for_holes := true;

      END IF; -- }

    END LOOP; -- }

    DROP TABLE _postgis_topology_astopojson_tmp_edges;

    json := json || array_to_string(comptxt, ',') || ']}';

    EXECUTE 'SET search_path TO ' || old_search_path;

  ELSIF tg.type = 4 THEN -- collection
    RAISE EXCEPTION 'Collection TopoGeometries are not supported by AsTopoJSON';

  END IF;

  RETURN json;

END
$$ LANGUAGE 'plpgsql' VOLATILE; -- writes into visited table
-- Type topology.GetFaceEdges_ReturnType -- LastUpdated: 101
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF 101 > version_from_num
     FROM _postgis_upgrade_info()
  THEN
      EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE TYPE topology.GetFaceEdges_ReturnType AS (
  sequence integer,
  edge integer
);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION topology.ST_GetFaceEdges(toponame varchar, face_id integer)
  RETURNS SETOF topology.GetFaceEdges_ReturnType AS
	'$libdir/postgis_topology-3', 'ST_GetFaceEdges'
  LANGUAGE 'c' STABLE;
CREATE OR REPLACE FUNCTION topology.ST_NewEdgeHeal(toponame varchar, e1id integer, e2id integer)
  RETURNS int AS
  '$libdir/postgis_topology-3','ST_NewEdgeHeal'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_ModEdgeHeal(toponame varchar, e1id integer, e2id integer)
  RETURNS int AS
  '$libdir/postgis_topology-3','ST_ModEdgeHeal'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_RemEdgeNewFace(toponame varchar, e1id integer)
  RETURNS int AS
	'$libdir/postgis_topology-3','ST_RemEdgeNewFace'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_RemEdgeModFace(toponame varchar, e1id integer)
  RETURNS int AS
	'$libdir/postgis_topology-3','ST_RemEdgeModFace'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_GetFaceGeometry(toponame varchar, aface integer)
  RETURNS GEOMETRY AS
	'$libdir/postgis_topology-3', 'ST_GetFaceGeometry'
  LANGUAGE 'c' STABLE;
CREATE OR REPLACE FUNCTION topology.ST_AddIsoNode(atopology varchar, aface integer, apoint geometry)
  RETURNS INTEGER AS
	'$libdir/postgis_topology-3','ST_AddIsoNode'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_MoveIsoNode(atopology character varying, anode integer, apoint geometry)
  RETURNS text AS
  '$libdir/postgis_topology-3','ST_MoveIsoNode'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_RemoveIsoNode(atopology varchar, anode integer)
  RETURNS TEXT AS
	'$libdir/postgis_topology-3','ST_RemoveIsoNode'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_RemIsoNode(varchar, integer)
  RETURNS TEXT AS
	'$libdir/postgis_topology-3','ST_RemoveIsoNode'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_RemoveIsoEdge(atopology varchar, anedge integer)
  RETURNS TEXT AS
	'$libdir/postgis_topology-3','ST_RemIsoEdge'
	LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_NewEdgesSplit(atopology varchar, anedge integer, apoint geometry)
  RETURNS INTEGER AS
  '$libdir/postgis_topology-3','ST_NewEdgesSplit'
  LANGUAGE 'c' VOLATILE;
-- Rename st_modedgessplit ( varchar, integer, geometry ) deprecated in PostGIS 200, if needed
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
DECLARE
    detail TEXT;
    argnames TEXT[];
BEGIN

    -- Check if the deprecated function exists
    BEGIN

        SELECT proargnames
        FROM pg_catalog.pg_proc
        WHERE oid = 'st_modedgessplit(varchar, integer, geometry)'::regprocedure
        INTO argnames;


    EXCEPTION
    WHEN undefined_function THEN
        RAISE DEBUG 'Replaced function st_modedgessplit(varchar, integer, geometry) does not exist';
        RETURN; -- nothing to do
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS detail := PG_EXCEPTION_DETAIL;
        RAISE EXCEPTION 'Checking if replaced function st_modedgessplit(varchar, integer, geometry) exists got % (%)', SQLERRM, SQLSTATE
            USING DETAIL = detail;
    END;

    -- Rename the replaced function, to avoid ambiguities.
    -- The renamed function will eventually be drop.
    BEGIN
        ALTER FUNCTION st_modedgessplit( varchar, integer, geometry ) RENAME TO st_modedgessplit_deprecated_by_postgis_200;
    EXCEPTION
    WHEN undefined_function THEN
        RAISE DEBUG 'Replaced function st_modedgessplit(varchar, integer, geometry) does not exist';
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS detail := PG_EXCEPTION_DETAIL;
        RAISE EXCEPTION 'Attempting to rename replaced function st_modedgessplit(varchar, integer, geometry) got % (%)', SQLERRM, SQLSTATE
            USING DETAIL = detail;
    END;

END;
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION topology.ST_ModEdgeSplit(atopology varchar, anedge integer, apoint geometry)
  RETURNS INTEGER AS
	'$libdir/postgis_topology-3','ST_ModEdgeSplit'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_AddIsoEdge(atopology varchar, anode integer, anothernode integer, acurve geometry)
  RETURNS INTEGER AS
	'$libdir/postgis_topology-3','ST_AddIsoEdge'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology._ST_AdjacentEdges(atopology varchar, anode integer, anedge integer)
RETURNS integer[] AS
$$
DECLARE
  ret integer[];
BEGIN
  WITH edgestar AS (
    SELECT *, count(*) over () AS cnt
    FROM topology.GetNodeEdges(atopology, anode)
  )
  SELECT ARRAY[ (
      SELECT p.edge AS prev FROM edgestar p
      WHERE p.sequence = CASE WHEN m.sequence-1 < 1 THEN cnt
                         ELSE m.sequence-1 END
    ), (
      SELECT p.edge AS prev FROM edgestar p WHERE p.sequence = ((m.sequence)%cnt)+1
    ) ]
  FROM edgestar m
  WHERE edge = anedge
  INTO ret;

  RETURN ret;
END
$$
LANGUAGE 'plpgsql' STABLE;
CREATE OR REPLACE FUNCTION topology.ST_ChangeEdgeGeom(atopology varchar, anedge integer, acurve geometry)
  RETURNS TEXT AS
	'$libdir/postgis_topology-3','ST_ChangeEdgeGeom'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_AddEdgeNewFaces(atopology varchar, anode integer, anothernode integer, acurve geometry)
  RETURNS INTEGER AS
	'$libdir/postgis_topology-3','ST_AddEdgeNewFaces'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_AddEdgeModFace(atopology varchar, anode integer, anothernode integer, acurve geometry)
  RETURNS INTEGER AS
	'$libdir/postgis_topology-3','ST_AddEdgeModFace'
  LANGUAGE 'c' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_InitTopoGeo(atopology varchar)
RETURNS text
AS
$$
DECLARE
  rec RECORD;
  topology_id numeric;
BEGIN
  IF atopology IS NULL THEN
    RAISE EXCEPTION 'SQL/MM Spatial exception - null argument';
  END IF;

  FOR rec IN SELECT * FROM pg_namespace WHERE text(nspname) = atopology
  LOOP
    RAISE EXCEPTION 'SQL/MM Spatial exception - schema already exists';
  END LOOP;

  FOR rec IN EXECUTE 'SELECT topology.CreateTopology('
    ||quote_literal(atopology)|| ') as id'
  LOOP
    topology_id := rec.id;
  END LOOP;

  RETURN 'Topology-Geometry ' || quote_literal(atopology)
    || ' (id:' || topology_id || ') created.';
END
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ST_CreateTopoGeo(atopology varchar, acollection geometry)
RETURNS text
AS
$$
DECLARE
  rec RECORD;
  points GEOMETRY;
  nodededges GEOMETRY;
  topoinfo RECORD;
BEGIN

  IF atopology IS NULL OR acollection IS NULL THEN
    RAISE EXCEPTION 'SQL/MM Spatial exception - null argument';
  END IF;

  -- Get topology information
  BEGIN
    SELECT * FROM topology.topology
      INTO STRICT topoinfo WHERE name = atopology;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE EXCEPTION 'SQL/MM Spatial exception - invalid topology name';
  END;

  -- Check SRID compatibility
  IF ST_SRID(acollection) != topoinfo.SRID THEN
    RAISE EXCEPTION 'Geometry SRID (%) does not match topology SRID (%)',
      ST_SRID(acollection), topoinfo.SRID;
  END IF;

  -- Verify pre-conditions (valid, empty topology schema exists)
  BEGIN -- {

    -- Verify the topology views in the topology schema to be empty
    FOR rec in EXECUTE
      'SELECT count(*) FROM '
      || quote_ident(atopology) || '.edge_data '
      || ' UNION ' ||
      'SELECT count(*) FROM '
      || quote_ident(atopology) || '.node '
    LOOP
      IF rec.count > 0 THEN
    RAISE EXCEPTION 'SQL/MM Spatial exception - non-empty view';
      END IF;
    END LOOP;

    -- face check is separated as it will contain a single (world)
    -- face record
    FOR rec in EXECUTE
      'SELECT count(*) FROM '
      || quote_ident(atopology) || '.face '
    LOOP
      IF rec.count != 1 THEN
    RAISE EXCEPTION 'SQL/MM Spatial exception - non-empty face view';
      END IF;
    END LOOP;

  EXCEPTION
    WHEN INVALID_SCHEMA_NAME THEN
      RAISE EXCEPTION 'SQL/MM Spatial exception - invalid topology name';
    WHEN UNDEFINED_TABLE THEN
      RAISE EXCEPTION 'SQL/MM Spatial exception - non-existent view';

  END; -- }



  --
  -- Node input linework with itself
  --
  WITH components AS ( SELECT geom FROM ST_Dump(acollection) )
  SELECT ST_UnaryUnion(ST_Collect(geom)) FROM (
    SELECT geom FROM components
    WHERE ST_Dimension(geom) = 1
      UNION ALL
    SELECT ST_Boundary(geom) FROM components
    WHERE ST_Dimension(geom) = 2
  ) as linework INTO STRICT nodededges;



  --
  -- Linemerge the resulting edges, to reduce the working set
  -- NOTE: this is more of a workaround for GEOS splitting overlapping
  --       lines to each of the segments.
  --
  SELECT ST_LineMerge(nodededges) INTO STRICT nodededges;



  --
  -- Collect input points and input lines endpoints
  --
  WITH components AS ( SELECT geom FROM ST_Dump(acollection) )
  SELECT ST_Union(geom) FROM (
    SELECT geom FROM components
      WHERE ST_Dimension(geom) = 0
    UNION ALL
    SELECT ST_Boundary(geom) FROM components
      WHERE ST_Dimension(geom) = 1
  ) as nodes INTO STRICT points;



  --
  -- Further split edges by points, if needed
  --
  IF points IS NOT NULL THEN
    nodededges := ST_Split(nodededges, points);

  END IF; -- points is not null


  --
  -- Add pivot face (-1 id)
  --
  EXECUTE format('INSERT INTO %I.face(face_id) VALUES (-1)', atopology);

  --
  -- Collect possibly isolated points, to add later
  --
  WITH components AS ( SELECT geom FROM ST_Dump(acollection) )
  SELECT ST_Union(geom) FROM components
  WHERE ST_Dimension(geom) = 0
  INTO STRICT points;

  --
  -- Add all linework
  -- NOTE: we do this in an ordered way to be predictable
  --
  FOR rec IN
    WITH linework AS ( SELECT geom FROM ST_Dump(nodededges) )
    SELECT topology._TopoGeo_addLinestringNoFace(atopology, geom)
    FROM linework
    ORDER BY geom
  LOOP
  END LOOP;

  --
  -- Register all faces
  --
  PERFORM topology._RegisterMissingFaces(atopology);


  --
  -- Delete pivot face (-1 id)
  --
  EXECUTE format('DELETE FROM %I.face WHERE face_id = -1', atopology);

  --
  -- Add collected points so isolated ones get correctly
  -- marked as being in their face
  -- NOTE: we do this in an ordered way to be predictable
  --
  FOR rec IN SELECT geom FROM
    ( SELECT * FROM ST_Dump(points) ) foo
    ORDER BY geom
  LOOP
    PERFORM topology.TopoGeo_addPoint(atopology, rec.geom);
  END LOOP;

  RETURN 'Topology ' || atopology || ' populated';

END
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.GetRingEdges(atopology varchar, anedge int, maxedges int DEFAULT null)
	RETURNS SETOF topology.GetFaceEdges_ReturnType AS
	'$libdir/postgis_topology-3', 'GetRingEdges'
LANGUAGE 'c' STABLE;
CREATE OR REPLACE FUNCTION topology.GetNodeEdges(atopology varchar, anode int)
	RETURNS SETOF topology.GetFaceEdges_ReturnType
AS
$BODY$
DECLARE
  curedge int;
  nextedge int;
  rec RECORD;
  retrec topology.GetFaceEdges_ReturnType;
  n int;
  sql text;
BEGIN

  n := 0;
  sql := format(
    $$
      WITH incident_edges AS (
        SELECT
          edge_id,
          start_node,
          end_node,
          ST_RemoveRepeatedPoints(geom) as geom
        FROM %1$I.edge_data
        WHERE start_node = $1
        or end_node = $1
      )
      SELECT
        edge_id,
        ST_Azimuth(ST_StartPoint(geom), ST_PointN(geom, 2)) as az
      FROM incident_edges
      WHERE start_node = $1
        UNION ALL
      SELECT
        -edge_id,
        ST_Azimuth(ST_EndPoint(geom), ST_PointN(geom, ST_NumPoints(geom)-1))
      FROM incident_edges
      WHERE end_node = $1
      ORDER BY az
    $$,
    atopology
  );


  FOR rec IN EXECUTE sql USING anode
  LOOP -- incident edges {


    n := n + 1;
    retrec.sequence := n;
    retrec.edge := rec.edge_id;
    RETURN NEXT retrec;
  END LOOP; -- incident edges }

END
$BODY$
LANGUAGE 'plpgsql' STABLE;
CREATE OR REPLACE FUNCTION topology.AddToSearchPath(a_schema_name varchar)


RETURNS text
AS
$BODY$
DECLARE
	var_result text;
	var_cur_search_path text;
	a_schema_name text := $1;
BEGIN
	WITH settings AS (
		SELECT unnest(setconfig) config
		FROM pg_db_role_setting
		WHERE setdatabase = (
			SELECT oid
			FROM pg_database
			WHERE datname = current_database()
		) and setrole = 0
	)
	SELECT regexp_replace(config, '^search_path=', '')
	FROM settings WHERE config like 'search_path=%'
	INTO var_cur_search_path;

	RAISE NOTICE 'cur_search_path from pg_db_role_setting is %', var_cur_search_path;

	-- only run this test if person creating the extension is a super user
	IF var_cur_search_path IS NULL AND (SELECT rolsuper FROM pg_roles where rolname = CURRENT_USER) THEN
		SELECT setting
		INTO var_cur_search_path
		FROM pg_file_settings
		WHERE name = 'search_path' AND applied;

		RAISE NOTICE 'cur_search_path from pg_file_settings is %', var_cur_search_path;
	END IF;

	IF var_cur_search_path IS NULL THEN
		SELECT boot_val
		INTO var_cur_search_path
		FROM pg_settings
		WHERE name = 'search_path';

		RAISE NOTICE 'cur_search_path from pg_settings is %', var_cur_search_path;
	END IF;

	IF var_cur_search_path LIKE '%' || quote_ident(a_schema_name) || '%' THEN
		var_result := a_schema_name || ' already in database search_path';
	ELSE
		var_cur_search_path := var_cur_search_path || ', '
                       || quote_ident(a_schema_name);
		EXECUTE 'ALTER DATABASE ' || quote_ident(current_database())
                             || ' SET search_path = ' || var_cur_search_path;
		var_result := a_schema_name || ' has been added to end of database search_path ';
	END IF;

	EXECUTE 'SET search_path = ' || var_cur_search_path;

  RETURN var_result;
END
$BODY$
SET search_path = pg_catalog -- make safe
LANGUAGE 'plpgsql' VOLATILE STRICT
;
CREATE OR REPLACE FUNCTION topology.AddTopoGeometryColumn(toponame varchar, schema varchar, tbl varchar, col varchar, ltype varchar, child integer)
  RETURNS integer
AS
$$
DECLARE
  intltype integer;
  newlevel integer;
  topoid integer;
  rec RECORD;
  newlayer_id integer;
  query text;
BEGIN

  -- Get topology id
  SELECT id INTO topoid
    FROM topology.topology WHERE name = toponame;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Topology % does not exist', quote_literal(toponame);
  END IF;

  IF ltype ILIKE '%POINT%' OR ltype ILIKE 'PUNTAL' THEN
    intltype = 1;
  ELSIF ltype ILIKE '%LINE%' OR ltype ILIKE 'LINEAL' THEN
    intltype = 2;
  ELSIF ltype ILIKE '%POLYGON%' OR ltype ILIKE 'AREAL' THEN
    intltype = 3;
  ELSIF ltype ILIKE '%COLLECTION%' OR ltype ILIKE 'GEOMETRY' THEN
    intltype = 4;
  ELSE
    RAISE EXCEPTION 'Layer type must be one of POINT,LINE,POLYGON,COLLECTION';
  END IF;

  --
  -- Add new TopoGeometry column in schema.table
  --
  EXECUTE 'ALTER TABLE ' || quote_ident(schema)
    || '.' || quote_ident(tbl)
    || ' ADD COLUMN ' || quote_ident(col)
    || ' topology.TopoGeometry;';

  --
  -- See if child id exists and extract its level
  --
  IF child IS NOT NULL THEN
    SELECT level + 1 FROM topology.layer
      WHERE layer_id = child
        AND topology_id = topoid
      INTO newlevel;
    IF newlevel IS NULL THEN
      RAISE EXCEPTION 'Child layer % does not exist in topology "%"', child, toponame;
    END IF;
  END IF;

  --
  -- Get new layer id from sequence
  --
  EXECUTE 'SELECT nextval(' ||
    quote_literal(
      quote_ident(toponame) || '.layer_id_seq'
    ) || ')' INTO STRICT newlayer_id;

  EXECUTE 'INSERT INTO '
       'topology.layer(topology_id, '
       'layer_id, level, child_id, schema_name, '
       'table_name, feature_column, feature_type) '
       'VALUES ('
    || topoid || ','
    || newlayer_id || ',' || COALESCE(newlevel, 0) || ','
    || COALESCE(child::text, 'NULL') || ','
    || quote_literal(schema) || ','
    || quote_literal(tbl) || ','
    || quote_literal(col) || ','
    || intltype || ');';

  --
  -- Create a sequence for TopoGeometries in this new layer
  --
  EXECUTE 'CREATE SEQUENCE ' || quote_ident(toponame)
    || '.topogeo_s_' || newlayer_id;

  --
  -- Add constraints on TopoGeom column
  --
  EXECUTE 'ALTER TABLE ' || quote_ident(schema)
    || '.' || quote_ident(tbl)
    || ' ADD CONSTRAINT "check_topogeom_' || col || '" CHECK ('
       'topology_id(' || quote_ident(col) || ') = ' || topoid
    || ' AND '
       'layer_id(' || quote_ident(col) || ') = ' || newlayer_id
    || ' AND '
       'type(' || quote_ident(col) || ') = ' || intltype
    || ');';

  --
  -- Add dependency of the feature column on the topology schema
  --
  query = 'INSERT INTO pg_catalog.pg_depend SELECT '
       'fcat.oid, fobj.oid, fsub.attnum, tcat.oid, '
       'tobj.oid, 0, ''n'' '
       'FROM pg_class fcat, pg_namespace fnsp, '
       ' pg_class fobj, pg_attribute fsub, '
       ' pg_class tcat, pg_namespace tobj '
       ' WHERE fcat.relname = ''pg_class'' '
       ' AND fnsp.nspname = ' || quote_literal(schema)
    || ' AND fobj.relnamespace = fnsp.oid '
       ' AND fobj.relname = ' || quote_literal(tbl)
    || ' AND fsub.attrelid = fobj.oid '
       ' AND fsub.attname = ' || quote_literal(col)
    || ' AND tcat.relname = ''pg_namespace'' '
       ' AND tobj.nspname = ' || quote_literal(toponame);

--
-- The only reason to add this dependency is to avoid
-- simple drop of a feature column. Still, drop cascade
-- will remove both the feature column and the sequence
-- corrupting the topology anyway ...
--


  RETURN newlayer_id;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.AddTopoGeometryColumn(varchar, varchar, varchar, varchar, varchar)
  RETURNS integer
AS
$$
  SELECT topology.AddTopoGeometryColumn($1, $2, $3, $4, $5, NULL);
$$
LANGUAGE 'sql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.RenameTopoGeometryColumn(layer_table regclass, feature_column name, new_name name)
  RETURNS topology.layer
AS
$$
DECLARE
  layer topology.layer;
  sql text;
BEGIN

  layer := topology.FindLayer(layer_table, feature_column);
  IF layer IS NULL THEN
    RAISE EXCEPTION 'Layer %.% does not exist', layer_table, feature_column;
  END IF;

  --
  -- Rename TopoGeometry column
  --
  sql := format('ALTER TABLE %s RENAME %I to %I',
    layer_table, feature_column, new_name);
  EXECUTE sql;

  -- Update topology.layer record

  -- Temporarily disable integrity check
  ALTER TABLE topology.layer DISABLE TRIGGER layer_integrity_checks;

  sql := format(
      'UPDATE topology.layer SET feature_column = %L '
      'WHERE topology_id = $1 and layer_id = $2',
      new_name
  );
  EXECUTE sql USING layer.topology_id, layer.layer_id;

  -- Re-enable integrity check
  -- TODO: tweak layer_integrity_checks to allow this
  ALTER TABLE topology.layer ENABLE TRIGGER layer_integrity_checks;

  --
  -- Rename constraints on TopoGeom column
  --
  sql := format(
    'ALTER TABLE %s RENAME CONSTRAINT '
    '"check_topogeom_%s" TO "check_topogeom_%s"',
    layer_table, feature_column, new_name
  );
  EXECUTE sql;

  layer.feature_column = new_name;
  RETURN layer;
END;
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.CreateTopology(atopology varchar, srid integer, prec float8, hasZ boolean)
RETURNS integer
AS
$BODY$
DECLARE
  rec RECORD;
  topology_id integer;
  sql TEXT;
  zsuffix TEXT := '';
BEGIN

--  FOR rec IN SELECT * FROM pg_namespace WHERE text(nspname) = atopology
--  LOOP
--    RAISE EXCEPTION 'SQL/MM Spatial exception - schema already exists';
--  END LOOP;

  IF hasZ THEN
    zsuffix := 'z';
  END IF;

  IF srid < 0 THEN
    RAISE NOTICE 'SRID value % converted to the officially unknown SRID value 0', srid;
    srid = 0;
  END IF;

  ------ Fetch next id for the new topology
  FOR rec IN SELECT nextval('topology.topology_id_seq')
  LOOP
    topology_id = rec.nextval;
  END LOOP;

  sql := format(
    $$
      CREATE SCHEMA %1$I;

      -------------{ face CREATION
      CREATE TABLE %1$I.face(
        face_id SERIAL,
        mbr GEOMETRY(polygon, %2$L), -- 2d only mbr is good enough
        CONSTRAINT face_primary_key
        PRIMARY KEY(face_id)
      );

      -- Face standard view description
      COMMENT ON TABLE %1$I.face IS
      'Contains face topology primitives';

      -------------} END OF face CREATION

      --------------{ node CREATION

      CREATE TABLE %1$I.node(
        node_id SERIAL,
        containing_face INTEGER,
        geom GEOMETRY(point%3$s, %2$L),
        CONSTRAINT node_primary_key
          PRIMARY KEY(node_id),
        CONSTRAINT face_exists
          FOREIGN KEY(containing_face)
          REFERENCES %1$I.face(face_id)
      );

      -- Node standard view description
      COMMENT ON TABLE %1$I.node IS
      'Contains node topology primitives';

      ------- Add index on containing_face, to speed up
      ------- topology editing (adding/removing faces)
      ------- See http://trac.osgeo.org/postgis/ticket/2861
      CREATE INDEX node_containing_face_idx
        ON %1$I.node (containing_face);

      --------------} END OF node CREATION

      --------------{ edge CREATION

      -- edge_data table
      CREATE TABLE %1$I.edge_data (
        edge_id SERIAL NOT NULL PRIMARY KEY,
        start_node INTEGER NOT NULL,
        end_node INTEGER NOT NULL,
        next_left_edge INTEGER NOT NULL,
        abs_next_left_edge INTEGER NOT NULL,
        next_right_edge INTEGER NOT NULL,
        abs_next_right_edge INTEGER NOT NULL,
        left_face INTEGER NOT NULL,
        right_face INTEGER NOT NULL,
        geom GEOMETRY(linestring%3$s, %2$L) NOT NULL,

        CONSTRAINT start_node_exists
          FOREIGN KEY(start_node)
          REFERENCES %1$I.node(node_id),

        CONSTRAINT end_node_exists
          FOREIGN KEY(end_node)
          REFERENCES %1$I.node(node_id),

        CONSTRAINT left_face_exists
          FOREIGN KEY(left_face)
          REFERENCES %1$I.face(face_id),

        CONSTRAINT right_face_exists
          FOREIGN KEY(right_face)
          REFERENCES %1$I.face(face_id),

        CONSTRAINT next_left_edge_exists
          FOREIGN KEY(abs_next_left_edge)
          REFERENCES %1$I.edge_data(edge_id)
          DEFERRABLE INITIALLY DEFERRED,

        CONSTRAINT next_right_edge_exists
          FOREIGN KEY(abs_next_right_edge)
          REFERENCES %1$I.edge_data(edge_id)
          DEFERRABLE INITIALLY DEFERRED
      );

      -- edge standard view (select rule)
      CREATE VIEW %1$I.edge AS
      SELECT
        edge_id, start_node, end_node, next_left_edge,
        next_right_edge, left_face, right_face, geom
      FROM %1$I.edge_data;

      -- Edge standard view description
      COMMENT ON VIEW %1$I.edge IS
      'Contains edge topology primitives';
      COMMENT ON COLUMN %1$I.edge.edge_id IS
      'Unique identifier of the edge';
      COMMENT ON COLUMN %1$I.edge.start_node IS
      'Unique identifier of the node at the start of the edge';
      COMMENT ON COLUMN %1$I.edge.end_node IS
      'Unique identifier of the node at the end of the edge';
      COMMENT ON COLUMN %1$I.edge.next_left_edge IS
      'Unique identifier of the next edge of the face on the left (when looking in the direction from START_NODE to END_NODE), moving counterclockwise around the face boundary';
      COMMENT ON COLUMN %1$I.edge.next_right_edge IS
      'Unique identifier of the next edge of the face on the right (when looking in the direction from START_NODE to END_NODE), moving counterclockwise around the face boundary';
      COMMENT ON COLUMN %1$I.edge.left_face IS
      'Unique identifier of the face on the left side of the edge when looking in the direction from START_NODE to END_NODE';
      COMMENT ON COLUMN %1$I.edge.right_face IS
      'Unique identifier of the face on the right side of the edge when looking in the direction from START_NODE to END_NODE';
      COMMENT ON COLUMN %1$I.edge.geom IS
      'The geometry of the edge';

      -- edge standard view (insert rule)
      CREATE RULE edge_insert_rule AS
      ON INSERT TO %1$I.edge
      DO INSTEAD INSERT into %1$I.edge_data
      VALUES (
        NEW.edge_id, NEW.start_node, NEW.end_node,
        NEW.next_left_edge, abs(NEW.next_left_edge),
        NEW.next_right_edge, abs(NEW.next_right_edge),
        NEW.left_face, NEW.right_face, NEW.geom
      );

      ------- Add support indices supporting edge linking foreign keys
      ------- See https://trac.osgeo.org/postgis/ticket/2083#comment:20
      CREATE INDEX ON %1$I.edge_data(abs_next_left_edge);
      CREATE INDEX ON %1$I.edge_data(abs_next_right_edge);

      --------------} END OF edge CREATION

      --------------{ layer sequence
      CREATE SEQUENCE %1$I.layer_id_seq;
      --------------} layer sequence

      --------------{ relation CREATION
      CREATE TABLE %1$I.relation (
        topogeo_id integer NOT NULL,
        layer_id integer NOT NULL,
        element_id integer NOT NULL,
        element_type integer NOT NULL,
        UNIQUE(layer_id,topogeo_id,element_id,element_type)
      );
      ------- Add index on element_type, element_id to speed up
      ------- queries looking for TopoGeometries using specific
      ------- primitive elements of the topology
      ------- See http://trac.osgeo.org/postgis/ticket/2083
      CREATE INDEX relation_element_id_idx
        ON %1$I.relation (element_id);

      CREATE TRIGGER relation_integrity_checks
      BEFORE UPDATE OR INSERT ON %1$I.relation
      FOR EACH ROW EXECUTE PROCEDURE
      topology.RelationTrigger(%4$L, %1$L);
      --------------} END OF relation CREATION

      ------- Default (world) face
      INSERT INTO %1$I.face(face_id) VALUES(0);

      ------- GiST index on face
      CREATE INDEX face_gist ON %1$I.face
      USING gist (mbr);

      ------- GiST index on node
      CREATE INDEX node_gist ON %1$I.node
      USING gist (geom);

      ------- GiST index on edge
      CREATE INDEX edge_gist ON %1$I.edge_data
      USING gist (geom);

      ------- Indexes on left_face and right_face of edge_data
      ------- NOTE: these indexes speed up GetFaceGeometry (and thus
      -------       TopoGeometry::Geometry) by a factor of 10 !
      -------       See http://trac.osgeo.org/postgis/ticket/806
      CREATE INDEX edge_left_face_idx
        ON %1$I.edge_data (left_face);
      CREATE INDEX edge_right_face_idx
        ON %1$I.edge_data (right_face);

      ------- Indexes on start_node and end_node of edge_data
      ------- NOTE: this indexes speed up node deletion
      -------       by a factor of 1000 !
      -------       See http://trac.osgeo.org/postgis/ticket/2082
      CREATE INDEX edge_start_node_idx
        ON %1$I.edge_data (start_node);
      CREATE INDEX edge_end_node_idx
        ON %1$I.edge_data (end_node);

      -- TODO: consider also adding an index on node.containing_face

    $$,
    atopology,   -- %1
    srid,        -- %2
    zsuffix,     -- %3
    topology_id  -- %4
  );

  EXECUTE sql;

  ------- Add record to the "topology" metadata table
  INSERT INTO topology.topology (id, name, srid, precision, hasZ)
  VALUES (topology_id, atopology, srid, prec, hasZ);

  RETURN topology_id;
END
$BODY$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.CreateTopology(toponame varchar, srid integer, prec float8)
RETURNS integer AS
' SELECT topology.CreateTopology($1, $2, $3, false);'
LANGUAGE 'sql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.CreateTopology(varchar, integer)
RETURNS integer AS
' SELECT topology.CreateTopology($1, $2, 0); '
LANGUAGE 'sql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.CreateTopology(varchar)
RETURNS integer AS
$$ SELECT topology.CreateTopology($1, ST_SRID('POINT EMPTY'::geometry), 0); $$
LANGUAGE 'sql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.TopologySummary(atopology varchar)
RETURNS text
AS
$BODY$
DECLARE
  rec RECORD;
  rec2 RECORD;
  var_topology_id integer;
  n int4;
  missing int4;
  sql text;
  ret text;
  tgcount int4;
BEGIN

  ret := 'Topology ' || quote_ident(atopology) ;

  BEGIN
    SELECT * FROM topology.topology WHERE name = atopology INTO STRICT rec;
    -- TODO: catch <no_rows> to give a nice error message
    var_topology_id := rec.id;

    ret := ret || ' (id ' || rec.id || ', '
               || 'SRID ' || rec.srid || ', '
               || 'precision ' || rec.precision;
    IF rec.hasz THEN ret := ret || ', has Z'; END IF;
    ret := ret || E')\n';
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      ret := ret || E' (unregistered)\n';
  END;

  BEGIN
    EXECUTE 'SELECT count(*) FROM ' || quote_ident(atopology)
      || '.node ' INTO STRICT n;
    ret = ret || n || ' nodes, ';
  EXCEPTION
    WHEN UNDEFINED_TABLE OR INVALID_SCHEMA_NAME THEN
      IF NOT EXISTS (
          SELECT * FROM pg_catalog.pg_namespace WHERE nspname = atopology
         )
      THEN
        ret = ret || 'missing schema';
        RETURN ret;
      ELSE
        ret = ret || 'missing nodes, ';
      END IF;
  END;

  BEGIN
    EXECUTE 'SELECT count(*) FROM ' || quote_ident(atopology)
      || '.edge' INTO STRICT n;
    ret = ret || n || ' edges, ';
  EXCEPTION
    WHEN UNDEFINED_TABLE OR INVALID_SCHEMA_NAME THEN
      ret = ret || 'missing edges, ';
  END;

  BEGIN
    EXECUTE format(
      $$
    SELECT
      count(*) FILTER (WHERE face_id > 0) p,
      count(*) FILTER (WHERE face_id < 0) n
    FROM %I.face
      $$,
      atopology)
    INTO STRICT rec;
    IF rec.n > 0 THEN
      ret = ret || rec.p || '? faces (pending detection), ';
    ELSE
      ret = ret || rec.p || ' faces, ';
    END IF;
  EXCEPTION
    WHEN UNDEFINED_TABLE OR UNDEFINED_COLUMN OR INVALID_SCHEMA_NAME THEN
      ret = ret || 'missing faces, ';
  END;

  BEGIN
    EXECUTE 'SELECT count(distinct layer_id) AS ln, '
      || 'count(distinct (layer_id,topogeo_id)) AS tn FROM '
      || quote_ident(atopology) || '.relation' INTO STRICT rec;
    tgcount := rec.tn;
    ret = ret || rec.tn || ' topogeoms in ' || rec.ln || E' layers\n';
  EXCEPTION
    WHEN UNDEFINED_TABLE THEN
      ret = ret || E'missing relations\n';
    WHEN UNDEFINED_COLUMN THEN
      ret = ret || E'corrupted relations\n';
  END;

  -- print information about registered layers
  FOR rec IN SELECT * FROM topology.layer l
    WHERE l.topology_id = var_topology_id
    ORDER by layer_id
  LOOP -- {
    ret = ret || 'Layer ' || rec.layer_id || ', type ';
    CASE
      WHEN rec.feature_type = 1 THEN
        ret = ret || 'Puntal';
      WHEN rec.feature_type = 2 THEN
        ret = ret || 'Lineal';
      WHEN rec.feature_type = 3 THEN
        ret = ret || 'Polygonal';
      WHEN rec.feature_type = 4 THEN
        ret = ret || 'Mixed';
      ELSE
        ret = ret || '???';
    END CASE;

    ret = ret || ' (' || rec.feature_type || '), ';

    BEGIN

      EXECUTE 'SELECT count(*) FROM ( SELECT DISTINCT topogeo_id FROM '
        || quote_ident(atopology)
        || '.relation r WHERE r.layer_id = ' || rec.layer_id
        || ' ) foo ' INTO STRICT n;

      ret = ret || n || ' topogeoms' || E'\n';

    EXCEPTION WHEN UNDEFINED_TABLE OR UNDEFINED_COLUMN THEN
      n := NULL;
      ret = ret || 'X topogeoms' || E'\n';
    END;

      IF rec.level > 0 THEN
        ret = ret || ' Hierarchy level ' || rec.level
                  || ', child layer ' || rec.child_id || E'\n';
      END IF;

      ret = ret || ' Deploy: ';
      IF rec.feature_column != '' THEN
        ret = ret || quote_ident(rec.schema_name) || '.'
                  || quote_ident(rec.table_name) || '.'
                  || quote_ident(rec.feature_column);

        IF n > 0 THEN
          sql := format(
            $$
SELECT count(*) FROM (
  SELECT topogeo_id
  FROM %1$I.relation r
  WHERE r.layer_id = %2$L
    EXCEPT
  SELECT DISTINCT id(%3$I)
  FROM %4$I.%5$I
  WHERE layer_id(%3$I) = %2$L
    AND topology_id(%3$I) = %6$L
) as foo
            $$,
            atopology,
            rec.layer_id,
            rec.feature_column,
            rec.schema_name,
            rec.table_name,
            var_topology_id
          );
          BEGIN
            RAISE DEBUG 'Executing %', sql;
            EXECUTE sql INTO STRICT missing;
            IF missing > 0 THEN
              ret = ret || ' (' || missing || ' missing topogeoms)';
            END IF;
          EXCEPTION
            WHEN UNDEFINED_TABLE THEN
              ret = ret || ' ( unexistent table )';
            WHEN UNDEFINED_COLUMN THEN
              ret = ret || ' ( unexistent column )';
          END;
        END IF;
        ret = ret || E'\n';

      ELSE
        ret = ret || E'NONE (detached)\n';
      END IF;

  END LOOP; -- }

  -- print information about unregistered layers containing topogeoms
  IF tgcount > 0 THEN -- {

    sql := 'SELECT layer_id FROM '
        || quote_ident(atopology) || '.relation EXCEPT SELECT layer_id'
        || ' FROM topology.layer WHERE topology_id = $1 ORDER BY layer_id';
    --RAISE DEBUG '%', sql;
    FOR rec IN  EXECUTE sql USING var_topology_id
    LOOP -- {
      ret = ret || 'Layer ' || rec.layer_id::text || ', UNREGISTERED, ';

      EXECUTE 'SELECT count(*) FROM ( SELECT DISTINCT topogeo_id FROM '
        || quote_ident(atopology)
        || '.relation r WHERE r.layer_id = ' || rec.layer_id
        || ' ) foo ' INTO STRICT n;

      ret = ret || n || ' topogeoms' || E'\n';

    END LOOP; -- }

  END IF; -- }

  RETURN ret;
END
$BODY$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION topology.CopyTopology(atopology varchar, newtopo varchar)
RETURNS int
AS
$BODY$
DECLARE
  rec RECORD;
  rec2 RECORD;
  oldtopo_id integer;
  newtopo_id integer;
  n int4;
  ret text;
  sql text;
BEGIN

  SELECT * FROM topology.topology where name = atopology
  INTO strict rec;
  oldtopo_id = rec.id;
  -- TODO: more gracefully handle unexistent topology

  SELECT topology.CreateTopology(newtopo, rec.SRID, rec.precision, rec.hasZ)
  INTO strict newtopo_id;

  sql := format(
    $$
      -- Copy faces
      INSERT INTO %1$I.face
      SELECT * FROM %2$I.face
      WHERE face_id != 0;

      -- Update face sequence
      SELECT setval(
        '%1$I.face_face_id_seq',
        (SELECT last_value FROM %2$I.face_face_id_seq)
      );

      -- Copy nodes
      INSERT INTO %1$I.node
      SELECT * FROM %2$I.node;

      -- Update node sequence
      SELECT setval(
        '%1$I.node_node_id_seq',
        (SELECT last_value FROM %2$I.node_node_id_seq)
      );

      -- Copy edges
      INSERT INTO %1$I.edge_data
      SELECT * FROM %2$I.edge_data;

      -- Update edge sequence
      SELECT setval(
        '%1$I.edge_data_edge_id_seq',
        (SELECT last_value FROM %2$I.edge_data_edge_id_seq)
      );
    $$,
    newtopo,
    atopology
  );
  EXECUTE sql;

  -- Copy layers and their TopoGeometry sequences
  -- and their TopoGeometry definitions, from primitives
  -- to hierarchical
  FOR rec IN
    SELECT * FROM topology.layer
    WHERE topology_id = oldtopo_id
    ORDER BY COALESCE(child_id, 0), layer_id
  LOOP
    INSERT INTO topology.layer (topology_id, layer_id, feature_type,
      level, child_id, schema_name, table_name, feature_column)
      VALUES (newtopo_id, rec.layer_id, rec.feature_type,
              rec.level, rec.child_id, newtopo,
              'LAYER' ||  rec.layer_id, '');

    -- Create layer's TopoGeometry sequences
    EXECUTE format(
      $$
        CREATE SEQUENCE %1$I.topogeo_s_%2$s;
        SELECT setval(
          '%1$I.topogeo_s_%2$s',
          (SELECT last_value FROM %3$I.topogeo_s_%2$s)
        );
      $$,
      newtopo,
      rec.layer_id,
      atopology
    );

    -- Copy TopoGeometry definitions
    EXECUTE format(
      $$
        INSERT INTO %1$I.relation
        SELECT * FROM %2$I.relation
        WHERE layer_id = $1
      $$,
      newtopo,
      atopology
    ) USING rec.layer_id;

  END LOOP;

  RETURN newtopo_id;
END
$BODY$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.FindTopology(topology.TopoGeometry)
RETURNS topology.topology
AS $$
    SELECT * FROM topology.topology
    WHERE id = topology_id($1);
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindTopology(regclass, name)
RETURNS topology.topology
AS $$
    SELECT t.*
    FROM topology.topology t
    JOIN topology.layer l ON (t.id = l.topology_id)
    WHERE format('%I.%I', l.schema_name, l.table_name)::regclass = $1
    AND l.feature_column = $2;
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindTopology(name, name, name)
RETURNS topology.topology
AS $$
    SELECT t.*
    FROM topology.topology t
    JOIN topology.layer l ON (t.id = l.topology_id)
    WHERE l.schema_name = $1
    AND l.table_name = $2
    AND l.feature_column = $3;
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindTopology(text)
RETURNS topology.topology
AS $$
    SELECT *
    FROM topology.topology
    WHERE name = $1
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindTopology(integer)
RETURNS topology.topology
AS $$
    SELECT *
    FROM topology.topology
    WHERE id = $1
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindLayer(tg topology.TopoGeometry)
RETURNS topology.layer
AS $$
    SELECT * FROM topology.layer
    WHERE topology_id = topology_id($1)
    AND layer_id = layer_id($1)
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindLayer(layer_table regclass, feature_column name)
RETURNS topology.layer
AS $$
    SELECT l.*
    FROM topology.layer l, pg_class c, pg_namespace n
    WHERE l.schema_name = n.nspname
    AND l.table_name = c.relname
    AND c.oid = $1
    AND c.relnamespace = n.oid
    AND l.feature_column = $2
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindLayer(schema_name name, table_name name, feature_column name)
RETURNS topology.layer
AS $$
    SELECT * FROM topology.layer
    WHERE schema_name = $1
    AND table_name = $2
    AND feature_column = $3;
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.FindLayer(topology_id integer, layer_id integer)
RETURNS topology.layer
AS $$
    SELECT * FROM topology.layer
    WHERE topology_id = $1
      AND layer_id = $2
$$ LANGUAGE 'sql';
CREATE OR REPLACE FUNCTION topology.populate_topology_layer()
	RETURNS TABLE(schema_name text, table_name text, feature_column text)
AS
$$
  INSERT INTO topology.layer
  WITH checks AS (
  SELECT
    n.nspname sch, r.relname tab,
    replace(c.conname, 'check_topogeom_', '') col,
    --c.consrc src,
    regexp_matches(c.consrc,
      E'\\.topology_id = (\\d+).*\\.layer_id = (\\d+).*\\.type = (\\d+)') inf
  FROM (SELECT conname, connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
		    FROM pg_constraint) AS c, pg_class r, pg_namespace n
  WHERE c.conname LIKE 'check_topogeom_%'
    AND r.oid = c.conrelid
    AND n.oid = r.relnamespace
  ), newrows AS (
    SELECT inf[1]::int as topology_id,
           inf[2]::int as layer_id,
          sch, tab, col, inf[3]::int as feature_type --, src
    FROM checks c
    WHERE NOT EXISTS (
      SELECT * FROM topology.layer l
      WHERE l.schema_name = c.sch
        AND l.table_name = c.tab
        AND l.feature_column = c.col
    )
  )
  SELECT topology_id, layer_id, sch,
         tab, col, feature_type,
         0, NULL
  FROM newrows RETURNING schema_name,table_name,feature_column;
$$
LANGUAGE 'sql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.RenameTopology(old_name varchar, new_name varchar)
RETURNS varchar
AS
$BODY$
DECLARE
  sql text;
BEGIN

  sql := format(
    'ALTER SCHEMA %I RENAME TO %I',
    old_name, new_name
  );
  EXECUTE sql;

  sql := format(
    'UPDATE topology.topology SET name = %L WHERE name = %L',
    new_name, old_name
  );
  EXECUTE sql;

  RETURN new_name;
END
$BODY$
LANGUAGE 'plpgsql' VOLATILE STRICT;
-- Type topology.ValidateTopology_ReturnType -- LastUpdated: 101
DO LANGUAGE 'plpgsql'
$postgis_proc_upgrade$
BEGIN
  IF 101 > version_from_num
     FROM _postgis_upgrade_info()
  THEN
      EXECUTE $postgis_proc_upgrade_parsed_def$ CREATE TYPE topology.ValidateTopology_ReturnType AS (
  error varchar,
  id1 integer,
  id2 integer
);
 $postgis_proc_upgrade_parsed_def$;
  END IF;
END
$postgis_proc_upgrade$;
CREATE OR REPLACE FUNCTION topology._ValidateTopologyGetFaceShellMaximalEdgeRing(atopology varchar, aface int)
RETURNS GEOMETRY AS
$BODY$
DECLARE
  sql TEXT;
  outsidePoint GEOMETRY;
  leftmostEdge INT;
  shell GEOMETRY;
BEGIN

  sql := format(
    $$
      SELECT
        ST_Translate(
          ST_StartPoint( ST_BoundingDiagonal(mbr) ),
          -1,
          -1
        )
      FROM %1$I.face
      WHERE face_id = $1
    $$,
    atopology
  );
  EXECUTE sql USING aface INTO outsidePoint;

  RAISE NOTICE 'Outside point of face %: %', aface, ST_AsText(outsidePoint);

  IF outsidePoint IS NULL THEN
    RETURN NULL;
  END IF;

  sql := format(
    $$
      SELECT
        CASE WHEN left_face = $1
        THEN
          edge_id
        ELSE
          -edge_id
        END ring_id
      FROM %1$I.edge
      WHERE left_face = $1 or right_face = $1
      ORDER BY
        geom <-> $2
      LIMIT 1
    $$,
    atopology
  );
  EXECUTE sql USING aface, outsidePoint INTO leftmostEdge;

  RAISE NOTICE 'Leftmost edge of face %: %', aface, leftmostEdge;

  IF leftmostEdge IS NULL THEN
    RETURN NULL;
  END IF;

  sql := format(
    $$
      WITH
      edgering AS (
        SELECT *
        FROM
          topology.GetRingEdges(
            %1$L,
            $1
          )
      )
      SELECT
        ST_MakeLine(
          CASE WHEN r.edge > 0 THEN
            e.geom
          ELSE
            ST_Reverse(e.geom)
          END
          ORDER BY r.sequence
        ) outerRing
      FROM edgering r, %1$I.edge e
      WHERE e.edge_id = abs(r.edge)
    $$,
    atopology
  );

  RAISE DEBUG 'SQL: %', sql;

  EXECUTE sql USING leftmostEdge
  INTO shell;

  -- TODO: check if the ring is not closed

  shell := ST_MakePolygon(shell);

  RETURN shell;
END;
$BODY$ LANGUAGE 'plpgsql' STABLE; --}

-- Assumes search_path has topology schema first
--{
CREATE OR REPLACE FUNCTION topology._ValidateTopologyGetRingEdges(starting_edge int)
RETURNS int[]
AS
$BODY$
DECLARE
  ret int[];
BEGIN
  WITH RECURSIVE edgering AS (
    SELECT
      starting_edge as signed_edge_id,
      edge_id,
      next_left_edge,
      next_right_edge
    FROM edge_data
    WHERE edge_id = abs(starting_edge)
      UNION
    SELECT
      CASE WHEN p.signed_edge_id < 0 THEN
        p.next_right_edge
      ELSE
        p.next_left_edge
      END,
      e.edge_id,
      e.next_left_edge,
      e.next_right_edge
    FROM edge_data e, edgering p
    WHERE e.edge_id =
      CASE WHEN p.signed_edge_id < 0 THEN
        abs(p.next_right_edge)
      ELSE
        abs(p.next_left_edge)
      END
  )
  SELECT array_agg(signed_edge_id)
  FROM edgering
  INTO ret;

  RETURN ret;
END;
$BODY$ LANGUAGE 'plpgsql';
--}

CREATE OR REPLACE FUNCTION topology._CheckEdgeLinking(curedge_edge_id INT, prevedge_edge_id INT, prevedge_next_left_edge INT, prevedge_next_right_edge INT)
RETURNS topology.ValidateTopology_ReturnType
AS
$BODY$
DECLARE
  retrec topology.ValidateTopology_ReturnType;
BEGIN
  IF prevedge_edge_id > 0
  THEN -- previous was outgoing, this one should be next-right
    IF prevedge_next_right_edge != curedge_edge_id THEN

      retrec.error = 'invalid next_right_edge';
      retrec.id1 = abs(prevedge_edge_id);
      retrec.id2 = curedge_edge_id; -- we put the expected one here, for convenience
      RETURN retrec;
    END IF;
  ELSE -- previous was incoming, this one should be next-left
    IF prevedge_next_left_edge != curedge_edge_id THEN

      retrec.error = 'invalid next_left_edge';
      retrec.id1 = abs(prevedge_edge_id);
      retrec.id2 = curedge_edge_id; -- we put the expected one here, for convenience
      RETURN retrec;
    END IF;
  END IF;

  RETURN retrec;
END;
$BODY$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION topology._ValidateTopologyEdgeLinking(bbox geometry DEFAULT NULL)
RETURNS SETOF topology.ValidateTopology_ReturnType
AS --{
$BODY$
DECLARE
  retrec topology.ValidateTopology_ReturnType;
  rec RECORD;
  last_node_id int;
  last_node_first_edge RECORD;
  last_node_prev_edge RECORD;
BEGIN
  RAISE NOTICE 'Checking edge linking';
  -- NOTE: this check relies on correct start_node and end_node
  --       for edges, if those are not correct the results
  --       of this check do not make much sense.
  FOR rec IN --{
      WITH
      nodes AS (
        SELECT node_id
        FROM node
        WHERE containing_face IS NULL
        AND (
          bbox IS NULL
          OR geom && bbox
        )
      ),
      incident_edges AS (
        SELECT
          n.node_id,
          e.edge_id,
          e.start_node,
          e.end_node,
          e.next_left_edge,
          e.next_right_edge,
          ST_RemoveRepeatedPoints(e.geom) as edge_geom
        FROM edge_data e, nodes n
        WHERE e.start_node = n.node_id
        or e.end_node = n.node_id
      ),
      edge_star AS (
        SELECT
          node_id,
          edge_id,
          next_left_edge,
          next_right_edge,
          ST_Azimuth(ST_StartPoint(edge_geom), ST_PointN(edge_geom, 2)) as az
        FROM incident_edges
        WHERE start_node = node_id
          UNION ALL
        SELECT
          node_id,
          -edge_id,
          next_left_edge,
          next_right_edge,
          ST_Azimuth(ST_EndPoint(edge_geom), ST_PointN(edge_geom, ST_NumPoints(edge_geom)-1))
        FROM incident_edges
        WHERE end_node = node_id
      ),
      sequenced_edge_star AS (
        SELECT
          row_number() over (partition by node_id order by az, edge_id) seq,
          *
        FROM edge_star
      )
      SELECT * FROM sequenced_edge_star
      ORDER BY node_id, seq
  LOOP --}{
    IF last_node_id IS NULL OR last_node_id != rec.node_id
    THEN --{
      IF last_node_id IS NOT NULL
      THEN
        -- Check that last edge (CW from prev one) is correctly linked
        retrec := topology._CheckEdgeLinking(
          last_node_first_edge.edge_id,
          last_node_prev_edge.edge_id,
          last_node_prev_edge.next_left_edge,
          last_node_prev_edge.next_right_edge
        );
        IF retrec IS NOT NULL
        THEN
          RETURN NEXT retrec;
        END IF;

      END IF;

      last_node_id = rec.node_id;
      last_node_first_edge = rec;
    ELSE --}{
      -- Check that this edge (CW from last one) is correctly linked
      retrec := topology._CheckEdgeLinking(
        rec.edge_id,
        last_node_prev_edge.edge_id,
        last_node_prev_edge.next_left_edge,
        last_node_prev_edge.next_right_edge
      );
      IF retrec IS NOT NULL
      THEN
        RETURN NEXT retrec;
      END IF;
    END IF; --}
    last_node_prev_edge = rec;
  END LOOP; --}
  IF last_node_id IS NOT NULL THEN --{

    -- Check that last edge (CW from prev one) is correctly linked
    retrec := topology._CheckEdgeLinking(
      last_node_first_edge.edge_id,
      last_node_prev_edge.edge_id,
      last_node_prev_edge.next_left_edge,
      last_node_prev_edge.next_right_edge
      );
    IF retrec IS NOT NULL
    THEN
      RETURN NEXT retrec;
    END IF;

  END IF; --}


END;
$BODY$ --}
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology._ValidateTopologyRings(bbox geometry DEFAULT NULL)
RETURNS SETOF topology.ValidateTopology_ReturnType
AS --{
$BODY$
DECLARE
  retrec topology.ValidateTopology_ReturnType;
  rec RECORD;
  ring_poly GEOMETRY;
  is_shell BOOLEAN;
  found_rings INT := 0;
  found_shells INT := 0;
  found_holes INT := 0;
BEGIN

  CREATE TEMP TABLE shell_check (
    face_id int PRIMARY KEY,
    ring_geom geometry
  );

  CREATE TEMP TABLE hole_check (
    ring_id int,
    hole_mbr geometry, -- point
    hole_point geometry, -- point
    in_shell int
  );

  RAISE NOTICE 'Building edge rings';

  -- Find all rings that can be formed on both sides
  -- of selected edges
  FOR rec IN
    WITH --{
    considered_edges AS (
      SELECT e.* FROM edge_data e, node n
      WHERE
        ( e.start_node = n.node_id OR e.end_node = n.node_id )
        AND
        ( bbox IS NULL OR n.geom && bbox )
    ),
    forward_rings AS (
      SELECT topology._ValidateTopologyGetRingEdges(e.edge_id) edges
      FROM considered_edges e
    ),
    forward_rings_with_id AS (
      SELECT
        (select min(e) FROM unnest(edges) e) ring_id,
        *
      FROM forward_rings
    ),
    distinct_forward_rings AS (
      SELECT
        DISTINCT ON (ring_id)
        *
      FROM forward_rings_with_id
    ),
    backward_rings AS (
      SELECT topology._ValidateTopologyGetRingEdges(-e.edge_id) edges
      FROM considered_edges e
      WHERE -edge_id NOT IN (
        SELECT x FROM (
          SELECT unnest(edges) x
          FROM distinct_forward_rings
        ) foo
      )
    ),
    backward_rings_with_id AS (
      SELECT
        (select min(e) FROM unnest(edges) e) ring_id,
        *
      FROM backward_rings
    ),
    distinct_backward_rings AS (
      SELECT
        DISTINCT ON (ring_id)
        *
      FROM backward_rings_with_id
    ),
    all_rings AS (
      SELECT * FROM distinct_forward_rings
      UNION
      SELECT * FROM distinct_backward_rings
    ),
    all_rings_with_ring_ordinal_edge AS (
      SELECT
        r.ring_id,
        e.seq,
        e.edge signed_edge_id
      FROM all_rings r
      LEFT JOIN LATERAL unnest(r.edges) WITH ORDINALITY AS e(edge, seq)
      ON TRUE
    ),
    all_rings_with_ring_geom AS (
      SELECT
        r.ring_id,
        ST_MakeLine(
          CASE WHEN signed_edge_id > 0 THEN
            e.geom
          ELSE
            ST_Reverse(e.geom)
          END
           -- TODO: how to make sure rows are ordered ?
          ORDER BY seq
        ) geom,
        array_agg(
          DISTINCT
          CASE WHEN signed_edge_id > 0 THEN
            e.left_face
          ELSE
            e.right_face
          END
        ) side_faces,
        count(signed_edge_id) num_edges,
        count(distinct abs(signed_edge_id)) distinct_edges
      FROM
        all_rings_with_ring_ordinal_edge r,
        edge_data e
      WHERE e.edge_id = abs(r.signed_edge_id)
      GROUP BY ring_id
    ) --}{
    SELECT ring_id, geom as ring_geom, side_faces, distinct_edges, num_edges
    FROM all_rings_with_ring_geom
  LOOP --}{

    found_rings := found_rings + 1;

    -- Check that there's a single face advertised
    IF array_upper(rec.side_faces,1) != 1
    THEN --{


      retrec.error = 'mixed face labeling in ring';
      retrec.id1 = rec.ring_id;
      retrec.id2 = NULL;
      RETURN NEXT retrec;
      CONTINUE;

    END IF; --}

    --RAISE DEBUG 'Ring geom: %', ST_AsTexT(rec.ring_geom);
    --RAISE DEBUG 'Distinct edges: %', rec.distinct_edges;
    --RAISE DEBUG 'Num edges: %', rec.num_edges;

    IF NOT ST_Equals(
      ST_StartPoint(rec.ring_geom),
      ST_EndPoint(rec.ring_geom)
    )
    THEN --{
      -- This should have been reported before,
      -- on the edge linking check
      retrec.error = 'non-closed ring';
      retrec.id1 = rec.ring_id;
      retrec.id2 = NULL;
      RETURN NEXT retrec;
      CONTINUE;
    END IF; --}

    -- Ring is valid, save it.
    is_shell := false;
    IF ST_NPoints(rec.ring_geom) > 3 AND
       rec.num_edges != rec.distinct_edges * 2
    THEN
      ring_poly := ST_MakePolygon(rec.ring_geom);
      IF ST_IsPolygonCCW(ring_poly) THEN
        is_shell := true;
      END IF;
    END IF;



    IF is_shell THEN --{ It's a shell (CCW)
      -- Check that a single face is ever used
      --       for each distinct CCW ring (shell)
      BEGIN
        INSERT INTO shell_check VALUES (
          rec.side_faces[1],
          ring_poly
        );
        found_shells := found_shells + 1;
      EXCEPTION WHEN unique_violation THEN
        retrec.error = 'face has multiple shells';
        retrec.id1 = rec.side_faces[1];
        retrec.id2 = rec.ring_id;
        RETURN NEXT retrec;
      END;
    ELSE -- }{ It's an hole (CW)
    -- NOTE: multiple CW rings (holes) can exist for a given face
      INSERT INTO hole_check VALUES (
        rec.ring_id,
        ST_Envelope(rec.ring_geom),
        ST_PointN(rec.ring_geom, 1),
        -- NOTE: we don't incurr in the risk
        --       of a ring touching the shell
        --       because in those cases the
        --       intruding "hole" will not really
        --       be considered an hole as its ring
        --       will not be CW
        rec.side_faces[1]
      );
      found_holes := found_holes + 1;
    END IF; --} hole

  END LOOP; --}

  RAISE NOTICE 'Found % rings, % valid shells, % valid holes',
    found_rings, found_shells, found_holes
  ;



END;
$BODY$ --}
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION topology.ValidateTopology(toponame varchar, bbox geometry DEFAULT NULL)
  RETURNS setof topology.ValidateTopology_ReturnType
AS
$$
DECLARE
  retrec topology.ValidateTopology_ReturnType;
  rec RECORD;
  rec2 RECORD;
  affected_rows integer;
  invalid_edges integer[];
  invalid_faces integer[];
  has_invalid_edge_linking BOOLEAN := false;
  has_invalid_rings BOOLEAN := false;
  search_path_backup text;
  containing_face integer;
BEGIN

  IF NOT EXISTS (
    SELECT oid
    FROM pg_catalog.pg_namespace
    WHERE nspname = toponame
  )
  THEN
    RAISE EXCEPTION 'Topology schema % does not exist', toponame;
  END IF;

  IF NOT EXISTS (
    SELECT id
    FROM topology.topology
    WHERE name = toponame
  )
  THEN
    RAISE WARNING 'Topology % is not registered in topology.topology', toponame;
  END IF;

  EXECUTE 'SHOW search_path' INTO search_path_backup;
  EXECUTE 'SET search_PATH TO ' || quote_ident(toponame) || ','
                                || search_path_backup;

  IF bbox IS NOT NULL THEN
    RAISE NOTICE 'Limiting topology checking to bbox %', ST_AsEWKT(ST_Envelope(bbox));
  END IF;


  -- Check for coincident nodes
  RAISE NOTICE 'Checking for coincident nodes';
  FOR rec IN
    SELECT a.node_id as id1, b.node_id as id2
    FROM
      node a,
      node b
    WHERE a.node_id < b.node_id
    AND a.geom = b.geom
    AND (
      bbox IS NULL
      OR (
        a.geom && bbox
        AND
        b.geom && bbox
      )
    )
  LOOP
    retrec.error = 'coincident nodes';
    retrec.id1 = rec.id1;
    retrec.id2 = rec.id2;
    RETURN NEXT retrec;
  END LOOP;

  -- Check for edge crossed nodes
  -- TODO: do this in the single edge loop
  RAISE NOTICE 'Checking for edges crossing nodes';
  FOR rec IN
    SELECT n.node_id as nid, e.edge_id as eid
    FROM
      node n,
      edge e
    WHERE e.start_node != n.node_id
    AND e.end_node != n.node_id
    AND ST_Within(n.geom, e.geom)
    AND (
      bbox IS NULL
      OR (
        n.geom && bbox
        AND
        e.geom && bbox
      )
    )
  LOOP
    retrec.error = 'edge crosses node';
    retrec.id1 = rec.eid; -- edge_id
    retrec.id2 = rec.nid; -- node_id
    RETURN NEXT retrec;
  END LOOP;

  -- Scan all edges
  RAISE NOTICE 'Checking for invalid or not-simple edges';
  FOR rec IN
    SELECT e.geom, e.edge_id as id1, e.left_face, e.right_face
    FROM edge e
    WHERE (
      bbox IS NULL
      OR e.geom && bbox
    )
    ORDER BY edge_id
  LOOP --{

    -- Any invalid edge becomes a cancer for higher level complexes
    IF NOT ST_IsValid(rec.geom) THEN

      retrec.error = 'invalid edge';
      retrec.id1 = rec.id1;
      retrec.id2 = NULL;
      RETURN NEXT retrec;
      invalid_edges := array_append(invalid_edges, rec.id1);

      IF invalid_faces IS NULL OR NOT rec.left_face = ANY ( invalid_faces )
      THEN
        invalid_faces := array_append(invalid_faces, rec.left_face);
      END IF;

      IF rec.right_face != rec.left_face AND ( invalid_faces IS NULL OR
            NOT rec.right_face = ANY ( invalid_faces ) )
      THEN
        invalid_faces := array_append(invalid_faces, rec.right_face);
      END IF;

      CONTINUE;

    END IF;

    -- Check edge being simple (ie: not self-intersecting)
    IF NOT ST_IsSimple(rec.geom) THEN
      retrec.error = 'edge not simple';
      retrec.id1 = rec.id1;
      retrec.id2 = NULL;
      RETURN NEXT retrec;
    END IF;

  END LOOP; --}

  -- Check for edge crossing
  RAISE NOTICE 'Checking for crossing edges';
  FOR rec IN
    SELECT
      e1.edge_id as id1,
      e2.edge_id as id2,
      e1.geom as g1,
      e2.geom as g2,
      ST_Relate(e1.geom, e2.geom, 2) as im
    FROM
      edge e1,
      edge e2
    WHERE
      e1.edge_id < e2.edge_id
      AND e1.geom && e2.geom
      AND (
        invalid_edges IS NULL OR (
          NOT e1.edge_id = ANY (invalid_edges)
          AND
          NOT e2.edge_id = ANY (invalid_edges)
        )
      )
      AND (
        bbox IS NULL
        OR (
          e1.geom && bbox
          AND
          e2.geom && bbox
        )
      )
  LOOP --{

    IF ST_RelateMatch(rec.im, 'FF*F*****') THEN
      -- no interior-interior or interior-boundary intersections
      CONTINUE;
    END IF;

    retrec.error = 'edge crosses edge';
    retrec.id1 = rec.id1;
    retrec.id2 = rec.id2;
    RETURN NEXT retrec;
  END LOOP; --}

  -- Check for edge start_node geometry mismatch
  -- TODO: move this in the first edge table scan
  RAISE NOTICE 'Checking for edges start_node mismatch';
  FOR rec IN
    SELECT e.edge_id as id1, n.node_id as id2
    FROM
      edge e,
      node n
    WHERE e.start_node = n.node_id
    AND NOT ST_Equals(ST_StartPoint(e.geom), n.geom)
    AND (
      bbox IS NULL
      OR e.geom && bbox
    )
  LOOP --{
    retrec.error = 'edge start node geometry mismatch';
    retrec.id1 = rec.id1;
    retrec.id2 = rec.id2;
    RETURN NEXT retrec;
  END LOOP; --}

  -- Check for edge end_node geometry mismatch
  -- TODO: move this in the first edge table scan
  RAISE NOTICE 'Checking for edges end_node mismatch';
  FOR rec IN
    SELECT e.edge_id as id1, n.node_id as id2
    FROM
      edge e,
      node n
    WHERE e.end_node = n.node_id
    AND NOT ST_Equals(ST_EndPoint(e.geom), n.geom)
    AND (
      bbox IS NULL
      OR e.geom && bbox
    )
  LOOP --{
    retrec.error = 'edge end node geometry mismatch';
    retrec.id1 = rec.id1;
    retrec.id2 = rec.id2;
    RETURN NEXT retrec;
  END LOOP; --}

  -- Check for faces w/out edges
  RAISE NOTICE 'Checking for faces without edges';
  FOR rec IN
    SELECT f.face_id as id1
    FROM face f
    LEFT JOIN edge_data e ON (
      f.face_id = e.left_face OR
      f.face_id = e.right_face
    )
    WHERE f.face_id > 0
    AND (
      bbox IS NULL
      OR mbr && bbox
    )
    AND e.edge_id IS NULL
  LOOP --{
    invalid_faces := array_append(invalid_faces, rec.id1);
    retrec.error = 'face without edges';
    retrec.id1 = rec.id1;
    retrec.id2 = NULL;
    RETURN NEXT retrec;
  END LOOP; --}

  -- Validate edge linking
  -- NOTE: relies on correct start_node/end_node on edges
  FOR rec IN SELECT * FROM topology._ValidateTopologyEdgeLinking(bbox)
  LOOP
    RETURN next rec;
    has_invalid_edge_linking := true;
  END LOOP;

  IF has_invalid_edge_linking THEN
    DROP TABLE IF EXISTS pg_temp.hole_check;
    DROP TABLE IF EXISTS pg_temp.shell_check;
    RETURN; -- does not make sense to continue
  END IF;

  --- Validate edge rings
  FOR rec IN SELECT * FROM topology._ValidateTopologyRings(bbox)
  LOOP
    RETURN next rec;
    has_invalid_rings := true;
  END LOOP;

  IF has_invalid_rings THEN
    DROP TABLE IF EXISTS pg_temp.hole_check;
    DROP TABLE IF EXISTS pg_temp.shell_check;
    RETURN; -- does not make sense to continue
  END IF;

  -- Now create a temporary table to construct all face geometries
  -- for checking their consistency

  RAISE NOTICE 'Constructing geometry of all faces';
  -- TODO: only construct exterior ring

  CREATE TEMP TABLE face_check ON COMMIT DROP AS
  SELECT
    sc.face_id,
    sc.ring_geom AS shell,
    f.mbr
  FROM
    pg_temp.shell_check sc, face f
  WHERE
    f.face_id = sc.face_id
  ;



  DROP TABLE pg_temp.shell_check;

  --
  -- Add to face_check any missing face whose mbr overlaps
  -- the given one.
  --
  -- This is done to still be able to check MBR consistency
  -- See https://trac.osgeo.org/postgis/ticket/5766#comment:6
  --
  INSERT INTO pg_temp.face_check
  SELECT face_id,
    CASE WHEN face_id = 0 THEN
      NULL
    ELSE
      topology._ValidateTopologyGetFaceShellMaximalEdgeRing(toponame, face_id)
    END as real_shell,
    mbr
  FROM face
  WHERE ( bbox IS NULL OR mbr && bbox )
  AND (
    CASE WHEN invalid_faces IS NOT NULL THEN
      NOT face_id = ANY(invalid_faces)
    ELSE
      TRUE
    END
  )
  AND face_id NOT IN (
    SELECT face_id FROM pg_temp.face_check
  );



  -- Build a gist index on geom
  CREATE INDEX ON face_check USING gist (shell);

  -- Build a btree index on id
  CREATE INDEX ON face_check (face_id);

  -- Scan the table looking for NULL geometries
  -- or geometries with wrong MBR consistency
  RAISE NOTICE 'Checking faces';
  affected_rows := 0;
  FOR rec IN
    SELECT * FROM face_check
  LOOP --{

    affected_rows := affected_rows + 1;

    IF rec.face_id != 0 THEN -- {

      -- Real face need have rings and matching MBR

      IF rec.shell IS NULL OR ST_IsEmpty(rec.shell)
      THEN
        -- Face missing !
        retrec.error := 'face has no rings';
        retrec.id1 := rec.face_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
      END IF;

      IF NOT ST_Equals(rec.mbr, ST_Envelope(rec.shell))
      THEN

        -- Inconsistent MBR!
        retrec.error := 'face has wrong mbr';
        retrec.id1 := rec.face_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
      END IF;

    ELSE --}{

      -- Universal face need have no shell rings and NULL MBR

      IF rec.shell IS NOT NULL OR NOT ST_IsEmpty(rec.shell)
      THEN
        retrec.error := 'universal face has shell rings';
        retrec.id1 := rec.face_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
      END IF;

      IF rec.mbr IS NOT NULL
      THEN
        -- TODO: make the message more specific about universal face ?
        retrec.error := 'face has wrong mbr';
        retrec.id1 := rec.face_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
      END IF;

    END IF; --}

  END LOOP; --}

  RAISE NOTICE 'Checked % faces', affected_rows;

  -- Check edges are covered by their left-right faces (#4830)
  RAISE NOTICE 'Checking for holes coverage';
  affected_rows := 0;
  FOR rec IN
    SELECT * FROM hole_check
  LOOP --{
    SELECT f.face_id
    FROM face_check f
    WHERE rec.hole_mbr @ f.shell
    AND _ST_Contains(f.shell, rec.hole_point)
    ORDER BY ST_Area(f.shell) ASC
    LIMIT 1
    INTO rec2;

    IF ( NOT FOUND AND rec.in_shell != 0 )
       OR ( rec2.face_id != rec.in_shell )
    THEN
        retrec.error := 'hole not in advertised face';
        retrec.id1 := rec.ring_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
    END IF;
    affected_rows := affected_rows + 1;

  END LOOP; --}

  RAISE NOTICE 'Finished checking for coverage of % holes', affected_rows;

  -- Check nodes have correct containing_face (#3233)
  -- NOTE: relies on correct edge linking
  RAISE NOTICE 'Checking for node containing_face correctness';
  FOR rec IN
    SELECT
      n.node_id,
      n.geom geom,
      n.containing_face,
      e.edge_id
    FROM node n
    LEFT JOIN edge e ON (
      e.start_node = n.node_id OR
      e.end_node = n.node_id
    )
    WHERE
     ( bbox IS NULL OR n.geom && bbox )
  LOOP --{

    IF rec.edge_id IS NOT NULL
    THEN --{
      -- Node is not isolated, make sure it
      -- advertises itself as such
      IF rec.containing_face IS NOT NULL
      THEN --{
        -- node is not really isolated
        retrec.error := 'not-isolated node has not-null containing_face';
        retrec.id1 := rec.node_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
      END IF; --}
    ELSE -- }{
      -- Node is isolated, make sure it
      -- advertises itself as such
      IF rec.containing_face IS NULL
      THEN --{
        -- isolated node advertises itself as non-isolated
        retrec.error := 'isolated node has null containing_face';
        retrec.id1 := rec.node_id;
        retrec.id2 := NULL;
        RETURN NEXT retrec;
      ELSE -- }{
        -- node is isolated and advertising a containing_face
        -- now let's check it's really in contained by it
        BEGIN
          containing_face := topology.GetFaceContainingPoint(toponame, rec.geom);
        EXCEPTION WHEN OTHERS THEN
          RAISE NOTICE 'Got % (%)', SQLSTATE, SQLERRM;
          retrec.error := format('got exception trying to find face containing node: %s', SQLERRM);
          retrec.id1 := rec.node_id;
          retrec.id2 := NULL;
          RETURN NEXT retrec;
        END;
        IF containing_face != rec.containing_face THEN
          retrec.error := 'isolated node has wrong containing_face';
          retrec.id1 := rec.node_id;
          retrec.id2 := NULL; -- TODO: write expected containing_face here ?
          RETURN NEXT retrec;
        END IF;
      END IF; --}
    END IF; --}

  END LOOP; --}


  DROP TABLE pg_temp.hole_check;
  DROP TABLE pg_temp.face_check;

  EXECUTE 'SET search_PATH TO ' || search_path_backup;

  RETURN;
END
$$
LANGUAGE 'plpgsql' VOLATILE; -- NOTE: we need VOLATILE to use SHOW
CREATE OR REPLACE FUNCTION topology.ValidateTopologyRelation(toponame varchar)
RETURNS TABLE(error text, layer_id int, topogeo_id int, element_id int)
AS
$BODY$
DECLARE
  layerrec RECORD;
  rel RECORD;
  search_path_backup text;
BEGIN
  IF NOT EXISTS (
    SELECT oid
    FROM pg_catalog.pg_namespace
    WHERE nspname = toponame
  )
  THEN
    RAISE EXCEPTION 'Topology schema % does not exist', toponame;
  END IF;

  IF NOT EXISTS (
    SELECT id
    FROM topology.topology
    WHERE name = toponame
  )
  THEN
    RAISE WARNING 'Topology % is not registered in topology.topology', toponame;
  END IF;

  EXECUTE 'SHOW search_path' INTO search_path_backup;
  EXECUTE 'SET search_PATH TO ' || quote_ident(toponame) || ','
                                || search_path_backup;

  FOR layerrec IN SELECT * FROM topology.layer
  LOOP --{
    IF layerrec.child_id IS NULL
    THEN --{ Layer is simple

      -- Check that all referenced nodes exist
      FOR rel IN
        SELECT r.layer_id, r.topogeo_id, r.element_id
        FROM relation r
        WHERE r.layer_id = layerrec.layer_id
        AND r.element_type = 1
        AND r.element_id NOT IN (
          SELECT node_id FROM node
        )
      LOOP
        error := 'TopoGeometry references unexistent node';
        layer_id := rel.layer_id;
        topogeo_id := rel.topogeo_id;
        element_id := rel.element_id;
        RETURN NEXT;
      END LOOP;

      -- Check that all referenced edges exist
      FOR rel IN
        SELECT r.layer_id, r.topogeo_id, r.element_id
        FROM relation r
        WHERE r.layer_id = layerrec.layer_id
        AND r.element_type = 2
        AND abs(r.element_id) NOT IN (
          SELECT edge_id FROM edge_data
        )
      LOOP
        error := 'TopoGeometry references unexistent edge';
        layer_id := rel.layer_id;
        topogeo_id := rel.topogeo_id;
        element_id := rel.element_id;
        RETURN NEXT;
      END LOOP;

      -- Check that all referenced faces exist
      FOR rel IN
        SELECT r.layer_id, r.topogeo_id, r.element_id
        FROM relation r
        WHERE r.layer_id = layerrec.layer_id
        AND r.element_type = 3
        AND r.element_id NOT IN (
          SELECT face_id FROM face
        )
      LOOP
        error := 'TopoGeometry references unexistent face';
        layer_id := rel.layer_id;
        topogeo_id := rel.topogeo_id;
        element_id := rel.element_id;
        RETURN NEXT;
      END LOOP;

    ELSE -- }{ Layer is hierarchical

      --RAISE DEBUG 'Checking hierarchical layer %', layerrec.layer_id;

      FOR rel IN
        SELECT r.layer_id, r.topogeo_id, r.element_id
        FROM relation r
        WHERE r.layer_id = layerrec.layer_id
        AND abs(r.element_id) NOT IN (
          SELECT r2.topogeo_id
          FROM relation r2
          WHERE r2.layer_id = layerrec.child_id
        )
      LOOP
        error := 'TopoGeometry references unexistent child';
        layer_id := rel.layer_id;
        topogeo_id := rel.topogeo_id;
        element_id := rel.element_id;
        RETURN NEXT;
      END LOOP;

    END IF; --} Layer is hierarchical
  END LOOP; --}

  EXECUTE 'SET search_PATH TO ' || search_path_backup;
END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION topology.RemoveUnusedPrimitives(
  atopology text,
  bbox GEOMETRY DEFAULT NULL
)
RETURNS INT AS
$BODY$
DECLARE
  topo topology.topology;
  deletedNodes INT := 0;
  deletedEdges INT := 0;
  deletedNodesDeg2 INT := 0;
  sql TEXT;
  rec RECORD;
  edgeMap JSONB := '{}';
  edge1 INT;
  edge2 INT;
  removedNode INT;
  ok BOOLEAN;
  fixedLinks INT := 0;
  mergedFaces INT[];
  moreMergedFaces INT[];
BEGIN

  topo := findTopology(atopology);
  IF topo.id IS NULL THEN
    RAISE EXCEPTION 'Could not find topology "%"', atopology;
  END IF;

  RAISE NOTICE 'Removing unused edges';

  RAISE DEBUG 'Determining edges not referenced by linear TopoGeoms';
  -- Delete edges not used in non-hierarchical TopoGeometry
  -- from linear typed layers
  sql := format(
    $$
      CREATE TEMPORARY TABLE deleted_edges AS
      SELECT
        edge_id,
        next_right_edge,
        next_left_edge,
        left_face,
        right_face,
        start_node,
        end_node
      FROM %1$I.edge_data e
      WHERE ( $1 IS NULL OR ST_Intersects(geom, $1) )
      AND NOT EXISTS (
        SELECT 1
        FROM %1$I.relation r, topology.layer l
        WHERE r.layer_id = l.layer_id
        AND l.topology_id = $2
        AND l.child_id IS NULL
        AND l.feature_type IN (2, 4)
        AND r.element_id in ( e.edge_id, -e.edge_id )
      )
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  EXECUTE sql USING bbox, topo.id;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Found % edges not referenced by linear TopoGeoms', fixedLinks;

  -- remove from deleted_edges the edges binding
  -- faces that individually (not both) take part
  -- of the definition of an areal TopoGeometry
  RAISE DEBUG 'Determining edges not binding areal TopoGeoms';
  sql := format(
    $$
      WITH breaking_merges AS (
        SELECT
          DISTINCT
          de.edge_id
          --, ARRAY[r.layer_id, r.topogeo_id] topogeo
          --, array_agg(r.element_id) faces
        FROM
          topology.layer l,
          %1$I.relation r,
          pg_temp.deleted_edges de
        WHERE l.topology_id = %2$L
        AND l.child_id IS NULL -- non-hierarchical layer
        AND l.feature_type IN (3, 4) -- areal or mixed layer
        AND r.layer_id = l.layer_id
        AND r.element_type = 3 -- face primitive
        AND de.left_face != de.right_face -- non-dangling edges
        AND ( r.element_id = de.left_face OR r.element_id = de.right_face )
        GROUP BY de.edge_id, r.layer_id, r.topogeo_id
        HAVING count(DISTINCT r.element_id) != 2
      )
      --SELECT * FROM breaking_merges
      DELETE FROM pg_temp.deleted_edges de
      WHERE edge_id IN (
        SELECT edge_id FROM breaking_merges
      )
    $$,
    topo.name,
    topo.id
  );
  --RAISE DEBUG 'SQL: %', sql;
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Retained % edges binding areal TopoGeoms', fixedLinks;
  --FOR rec IN EXECUTE sql LOOP
    --RAISE NOTICE 'Should retain edges % binding areal TopoGeom % in layer %', rec.edge_id, rec.topogeo_id, rec.layer_id;
  --END LOOP;


  RAISE DEBUG 'Deleting unused edges';
  sql := format(
    $$
      DELETE FROM %1$I.edge_data e
      WHERE e.edge_id IN (
        SELECT edge_id FROM pg_temp.deleted_edges
      )
    $$,
    topo.name
  );
  EXECUTE sql;
  GET DIAGNOSTICS deletedEdges = ROW_COUNT;
  RAISE DEBUG 'Deleted % unused edges', deletedEdges;


  RAISE DEBUG 'Fixing broken next_right_edge links';
  sql := format(
    $$
      UPDATE %1$I.edge_data e
      SET
        next_right_edge =
          CASE
          WHEN e.next_right_edge = ne.edge_id THEN
            ne.next_right_edge
          ELSE
            ne.next_left_edge
          END,
        abs_next_right_edge =
          CASE
          WHEN e.next_right_edge = ne.edge_id THEN
            abs(ne.next_right_edge)
          ELSE
            abs(ne.next_left_edge)
          END
      FROM pg_temp.deleted_edges ne
      WHERE e.abs_next_right_edge = ne.edge_id
        AND e.next_right_edge !=
        CASE
        WHEN e.next_right_edge = ne.edge_id THEN
          ne.next_right_edge
        ELSE
          ne.next_left_edge
        END
      RETURNING e.*
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  LOOP
    EXECUTE sql;
    GET DIAGNOSTICS fixedLinks = ROW_COUNT;
--    fixedLinks := 0;
--    FOR rec IN EXECUTE sql LOOP
--      fixedLinks := fixedLinks + 1;
--      RAISE DEBUG 'Updated next_right_edge link for edge %, now having next_right_edge=% and abs_next_right_edge=%', rec.edge_id, rec.next_right_edge, rec.abs_next_right_edge;
--    END LOOP;
    IF fixedLinks = 0 THEN
      RAISE DEBUG 'No (more) broken next_right_edge links';
      EXIT;
    END IF;
    RAISE DEBUG 'Updated % broken next_right_edge links', fixedLinks;
  END LOOP;

  RAISE DEBUG 'Fixing broken next_left_edge links';
  sql := format(
    $$
      UPDATE %1$I.edge_data e
      SET
        next_left_edge =
          CASE
          WHEN e.next_left_edge = ne.edge_id THEN
            ne.next_right_edge
          ELSE
            ne.next_left_edge
          END,
        abs_next_left_edge =
          CASE
          WHEN e.next_left_edge = ne.edge_id THEN
            abs(ne.next_right_edge)
          ELSE
            abs(ne.next_left_edge)
          END
      FROM pg_temp.deleted_edges ne
      WHERE e.abs_next_left_edge = ne.edge_id
        -- Avoid updating records which do not need
        -- to be updated (alternatively we could DELETE
        -- those records from deleted_edges before next iteration)
        AND e.next_left_edge !=
        CASE
        WHEN e.next_left_edge = ne.edge_id THEN
          ne.next_right_edge
        ELSE
          ne.next_left_edge
        END
      RETURNING e.*
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  LOOP
    EXECUTE sql;
    GET DIAGNOSTICS fixedLinks = ROW_COUNT;
--    fixedLinks := 0;
--    FOR rec IN EXECUTE sql LOOP
--      fixedLinks := fixedLinks + 1;
--      RAISE DEBUG 'Updated next_left_edge link for edge %, now having next_left_edge=% and abs_next_left_edge=%', rec.edge_id, rec.next_left_edge, rec.abs_next_left_edge;
--    END LOOP;
    IF fixedLinks = 0 THEN
      RAISE DEBUG 'No (more) broken next_left_edge links found';
      EXIT;
    END IF;
    RAISE DEBUG 'Updated % broken next_left_edge links', fixedLinks;
  END LOOP;

  --
  -- Build arrays of faces to be merged
  --

  RAISE DEBUG 'Building face merge sets';

  CREATE TEMPORARY TABLE mergeable_faces AS
  WITH merges AS (
    SELECT
      DISTINCT
      ARRAY[
        LEAST(left_face, right_face),
        GREATEST(left_face, right_face)
      ] faceset
    FROM deleted_edges
    WHERE left_face != right_face
  )
  SELECT faceset
  FROM merges;

  CREATE TEMPORARY TABLE merged_faces (keep INT, merge INT[]);

  LOOP -- {

    -- Fetch next merge
    DELETE FROM mergeable_faces
    WHERE ctid = (SELECT ctid FROM mergeable_faces LIMIT 1)
    RETURNING faceset
    INTO mergedFaces;
    IF mergedFaces IS NULL THEN
      EXIT;
    END IF;

    RAISE DEBUG 'Next merged faces start with: %', mergedFaces;

    LOOP --{
      WITH deleted AS (
        DELETE FROM mergeable_faces
        WHERE faceset && mergedFaces
        RETURNING faceset
      ), flood_faces AS (
        SELECT DISTINCT unnest(faceset) merged
        FROM deleted
      )
      SELECT array_agg(merged)
      FROM flood_faces
      INTO moreMergedFaces;

      IF moreMergedFaces IS NULL THEN
        EXIT;
      END IF;

      RAISE DEBUG 'There is more merged faces: %', moreMergedFaces;
      SELECT array_agg(x) FROM (
        SELECT unnest(mergedFaces) x
          UNION
        SELECT unnest(moreMergedFaces)
      ) foo
      INTO mergedFaces;
      RAISE DEBUG 'Merged faces grows to: %', mergedFaces;

    END LOOP; --}

    mergedFaces := array_agg(distinct x ORDER BY x) FROM unnest(mergedFaces) x;
    RAISE DEBUG 'Storing merged faceset: %', mergedFaces;

    INSERT INTO pg_temp.merged_faces VALUES (
      mergedFaces[1],
      array_remove(mergedFaces, mergedFaces[1])
    );

  END LOOP; --}

  DROP TABLE pg_temp.mergeable_faces;

  --
  -- Fix face labels
  --

  RAISE DEBUG 'Fixing broken left_face labels';
  sql := format(
    $$
      UPDATE %1$I.edge_data e
      SET left_face = mf.keep
      FROM pg_temp.merged_faces mf
      WHERE e.left_face != mf.keep
        AND e.left_face = ANY(mf.merge)
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Updated % broken left_face links', fixedLinks;

  RAISE DEBUG 'Fixing broken right_face labels';
  sql := format(
    $$
      UPDATE %1$I.edge_data e
      SET right_face = mf.keep
      FROM pg_temp.merged_faces mf
      WHERE e.right_face != mf.keep
        AND e.right_face = ANY(mf.merge)
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Updated % broken right_face links', fixedLinks;


  RAISE DEBUG 'Updating containing_face labels for merged faces';
  sql := format(
    $$
      UPDATE %1$I.node n
      SET containing_face = mf.keep
      FROM pg_temp.merged_faces mf
      WHERE n.containing_face != mf.keep
      AND n.containing_face = ANY(mf.merge)
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Updated % containing_face labels for nodes', fixedLinks;

  --
  -- Fix face table (delete/update mbr)
  --

  RAISE DEBUG 'Updating merged faces MBR';
  sql := format(
    $$
      WITH merged_mbr AS (
        SELECT
          mf.keep,
          ST_Envelope(
            ST_Collect(
              f.mbr
            )
          ) mbr
        FROM pg_temp.merged_faces mf
        JOIN %1$I.face f ON (
          f.face_id = mf.keep OR
          f.face_id = ANY( mf.merge )
        )
        WHERE mf.keep != 0
        GROUP by mf.keep
      )
      UPDATE %1$I.face f
      SET mbr = m.mbr
      FROM merged_mbr m
      WHERE f.face_id = m.keep
    $$,
    topo.name
  );
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Updated % merged faces MBR', fixedLinks;

  RAISE DEBUG 'Deleting removed faces';
  sql := format(
    $$
      DELETE FROM %1$I.face
      USING pg_temp.merged_faces mf
      WHERE face_id = ANY (mf.merge)
    $$,
    topo.name
  );
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Deleted % merged faces', fixedLinks;

  --
  -- Fix TopoGeometry
  --

  RAISE DEBUG 'Updating areal TopoGeometry definitions';
  -- We remove the merged faces from the definition
  -- of areal TopoGeometry objects
  sql := format(
    $$
      WITH deleted AS (
        DELETE FROM %1$I.relation r
        USING topology.layer l, pg_temp.merged_faces mf
        WHERE l.topology_id = %2$L
        AND l.feature_type IN (3, 4)
        AND l.child_id IS NULL
        AND r.layer_id = l.layer_id
        AND r.element_id = ANY (mf.merge)
        RETURNING
          r.topogeo_id,
          r.layer_id,
          l.schema_name,
          l.table_name,
          l.feature_column,
          mf.merge,
          mf.keep,
          r.element_id
      )
      SELECT
        topogeo_id,
        layer_id,
        schema_name,
        table_name,
        feature_column,
        merge,
        keep,
        array_agg(element_id) lost_faces
      FROM deleted
      GROUP BY 1,2,3,4,5,6,7
    $$,
    topo.name,
    topo.id
  );
  --RAISE NOTICE 'SQL: %', sql;
  FOR rec IN EXECUTE sql
  LOOP
    RAISE DEBUG 'Areal TopoGeometry % in layer %.%.% '
      'lost faces % (kept %) in its composition',
      rec.topogeo_id, rec.schema_name,
      rec.table_name, rec.feature_column,
      rec.lost_faces, rec.keep
    ;
  END LOOP;

  --
  -- Mark newly isolated nodes as such
  --

  RAISE DEBUG 'Determining newly isolated nodes';
  sql := format(
    $$
      WITH unlinked_nodes AS (
        SELECT start_node node_id FROM pg_temp.deleted_edges
          UNION
        SELECT end_node FROM pg_temp.deleted_edges
      ), isolated AS (
        SELECT node_id FROM unlinked_nodes
        EXCEPT SELECT start_node FROM %1$I.edge_data
        EXCEPT  SELECT end_node FROM %1$I.edge_data
      ), incident_faces AS (
        SELECT
          node_id,
          array_agg(DISTINCT face_id) incident_faces
        FROM (
          SELECT DISTINCT node_id, unnest(face_id) face_id
          FROM (
            SELECT
              i.node_id,
              ARRAY[e.left_face, e.right_face] face_id
            FROM isolated i, deleted_edges e
            WHERE e.start_node = i.node_id
              UNION
            SELECT
              i.node_id,
              ARRAY[e.left_face, e.right_face] face_id
            FROM isolated i, deleted_edges e
            WHERE e.end_node = i.node_id
          ) foo
        ) bar
        GROUP BY node_id
      ), containing_faces AS (
        SELECT
          inc.node_id,
          COALESCE(mf.keep, incident_faces[1]) face_id
        FROM incident_faces inc
        LEFT JOIN pg_temp.merged_faces mf
          ON ( inc.incident_faces && mf.merge )
      )
      UPDATE %1$I.node n
      SET containing_face = cf.face_id
      FROM containing_faces cf
      WHERE n.node_id = cf.node_id
      AND n.containing_face IS DISTINCT FROM cf.face_id
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  EXECUTE sql;
  GET DIAGNOSTICS fixedLinks = ROW_COUNT;
  RAISE DEBUG 'Isolated % nodes', fixedLinks;

  RAISE NOTICE 'Removed % unused edges', deletedEdges;


  --
  -- Clean isolated nodes
  --

  -- Cleanup isolated nodes
  -- (non-isolated ones would have become isolated by now)
  sql := format(
    $$
      SELECT
        n.node_id
      FROM
        %1$I.node n
      WHERE ( $1 IS NULL OR ST_Intersects(n.geom, $1) )
      AND n.containing_face IS NOT NULL
      AND NOT EXISTS (
        SELECT 1
        FROM %1$I.relation r, topology.layer l
        WHERE r.layer_id = l.layer_id
        AND l.topology_id = $2
        AND l.child_id IS NULL
        AND l.feature_type = 1
        AND r.element_id = n.node_id
      )
    $$,
    topo.name
  );
  RAISE NOTICE 'Removing isolated nodes';
  FOR rec in EXECUTE sql USING bbox, topo.id
  LOOP --{
    BEGIN
      PERFORM topology.ST_RemIsoNode(topo.name, rec.node_id);
      RAISE DEBUG 'Removed isolated node %', rec.node_id;
      deletedNodes := deletedNodes + 1;
    EXCEPTION WHEN OTHERS
    THEN
      RAISE WARNING 'Isolated node % could not be removed: %', rec.node_id, SQLERRM;
    END;
  END LOOP; --}
  RAISE NOTICE 'Removed % isolated nodes', deletedNodes;

  -- Remove nodes connecting only 2 edges if
  -- no lineal TopoGeometry exists that is defined
  -- by only one of them
  sql := format(
    $$
      WITH
      unused_connected_nodes_in_bbox AS (
        SELECT
          n.node_id
        FROM %1$I.node n
        WHERE
          ( $1 IS NULL OR ST_Intersects(n.geom, $1) )
          AND n.containing_face IS NULL

          EXCEPT

        SELECT r.element_id
        FROM %1$I.relation r
        JOIN topology.layer l ON ( r.layer_id = l.layer_id )
        WHERE l.child_id IS NULL
        AND l.topology_id = $2
        AND l.feature_type IN ( 1, 4 ) -- puntual or mixed layer
        AND r.element_type = 1 -- node primitive
      ),
      removable_nodes_of_degree_2_in_bbox AS (
        SELECT
          n.node_id,
          array_agg(
            e.edge_id
            -- order to make cleanup outcome predictable
            ORDER BY e.edge_id
          ) edges
        FROM
          unused_connected_nodes_in_bbox n,
          %1$I.edge e
        WHERE (
            n.node_id = e.start_node
            OR n.node_id = e.end_node
          )
        GROUP BY n.node_id
        HAVING count(e.edge_id) = 2
        -- Do not consider nodes used by closed edges as removable
        AND NOT 't' = ANY( array_agg(e.start_node = e.end_node) )
      ),
      breaking_heals AS (
        SELECT
          DISTINCT
          n.node_id
          -- , ARRAY[r.layer_id, r.topogeo_id]
          -- , array_agg(r.element_id) edges
        FROM
          removable_nodes_of_degree_2_in_bbox n,
          %1$I.relation r,
          topology.layer l
        WHERE l.topology_id = $2
          AND l.child_id IS NULL
          AND l.feature_type IN ( 2, 4 ) -- lineal or mixed layer
          AND r.layer_id = l.layer_id
          AND r.element_type = 2 -- edge primitive
          AND r.element_id IN (
            n.edges[1], -n.edges[1],
            n.edges[2], -n.edges[2]
          )
          GROUP BY n.node_id, r.layer_id, r.topogeo_id
          HAVING count(DISTINCT abs(r.element_id)) != 2
      ),
      valid_heals AS (
        SELECT
          node_id,
          edges
        FROM removable_nodes_of_degree_2_in_bbox
        WHERE node_id NOT IN (
          SELECT node_id FROM breaking_heals
        )
      )
      SELECT
        array_agg(node_id) connecting_nodes,
        edges[1] edge1,
        edges[2] edge2
      FROM valid_heals
      GROUP BY edges
    $$,
    topo.name
  );
  --RAISE DEBUG 'SQL: %', sql;
  RAISE NOTICE 'Removing unneeded nodes of degree 2';
  EXECUTE sql USING bbox, topo.id;
  FOR rec in EXECUTE sql USING bbox, topo.id
  LOOP --{
    RAISE DEBUG 'edgeMap: %', edgeMap;
    -- Edges may have changed name
    edge1 := COALESCE( (edgeMap -> rec.edge1::text)::int, rec.edge1);
    edge2 := COALESCE( (edgeMap -> rec.edge2::text)::int, rec.edge2);

    RAISE DEBUG 'Should heal edges % (now %) and % (now %) bound by nodes %',
      rec.edge1, edge1, rec.edge2, edge2, rec.connecting_nodes;

    IF edge1 = edge2 THEN
      -- Nothing to merge here, continue
      CONTINUE;
    END IF;
    ok := false;

    BEGIN
      -- TODO: replace ST_ModEdgeHeal loop with a faster direct deletion and healing
      removedNode := topology.ST_ModEdgeHeal(topo.name, edge1, edge2);
      IF NOT removedNode = ANY ( rec.connecting_nodes ) THEN
        RAISE EXCEPTION 'Healing of edges % and % was reported '
                        'to remove node % while we expected any of % instead',
                        edge1, edge2, removedNode, rec.connecting_nodes;
      END IF;
      RAISE DEBUG 'Edge % merged into %, dropping node %', edge2, edge1, removedNode;
      ok := 1;
    EXCEPTION WHEN OTHERS
    THEN
      RAISE WARNING 'Edges % and % joined by node % could not be healed: %', edge1, edge2, rec.connecting_nodes, SQLERRM;
    END;
    IF ok THEN
      -- edge2 was now renamed to edge1, update map
      edgeMap := jsonb_set(edgeMap, ARRAY[edge2::text], to_jsonb(edge1));
      deletedNodesDeg2 := deletedNodesDeg2 + 1;
    END IF;
  END LOOP; --}
  RAISE NOTICE 'Removed % unneeded nodes of degree 2', deletedNodesDeg2;

  DROP TABLE pg_temp.deleted_edges;
  DROP TABLE pg_temp.merged_faces;

  RETURN deletedEdges + deletedNodes + deletedNodesDeg2;
END;
$BODY$ LANGUAGE 'plpgsql' VOLATILE;




CREATE OR REPLACE FUNCTION topology.postgis_topology_scripts_installed() RETURNS text
	AS $$ SELECT trim('3.5.0'::text || $rev$ v2.6.7-235-g3b0a45f $rev$) AS version $$
	LANGUAGE 'sql' IMMUTABLE;
GRANT SELECT ON topology.topology TO PUBLIC;
GRANT SELECT ON topology.layer TO PUBLIC;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA topology TO PUBLIC;
DROP FUNCTION _postgis_upgrade_info();
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- Copyright (C) 2012 Regina Obe <lr@pcorp.us>
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- These are reserved for functions where the they are changed to use default args
-- This is installed after the new functions are installed
-- We don't have any of these yet for topology
-- The reason we put these after install is
-- you can't drop a function that is used by sql functions
-- without forcing a drop on those as well which may cause issues with user functions.
-- This allows us to CREATE OR REPLACE those in general topology.sql
-- without dropping them.

DO $BODY$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
    WITH updated AS (
      UPDATE topology.topology SET SRID=0 WHERE SRID<0
      RETURNING *
    )
    SELECT * FROM updated
  LOOP
    -- NOTE: these notices will not be shown during extension upgrade
    RAISE NOTICE 'Topology % had SRID<0, updated to the officially unknown SRID value 0', rec.name;
  END LOOP;
END;
$BODY$ LANGUAGE 'plpgsql';

-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--
--
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- Copyright (C) 2011-2020 Sandro Santilli <strk@kbt.io>
-- Copyright (C) 2010-2012 Regina Obe <lr@pcorp.us>
-- Copyright (C) 2009      Paul Ramsey <pramsey@cleverelephant.ca>
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
--
-- This file will be appended at the very end of every
-- sql upgrade script.
--
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-- DROP auxiliary function (created by common_before_upgrade.sql)
DROP FUNCTION _postgis_drop_function_by_identity(text, text, text);
DROP FUNCTION _postgis_drop_function_by_signature(text, text);


-- Drop deprecated functions if possible
DO LANGUAGE 'plpgsql'
$POSTGIS_PROC_UPGRADE$
DECLARE
    new_name TEXT;
    rec RECORD;
    extrec RECORD;
    sql TEXT;
    detail TEXT;
    hint TEXT;
BEGIN

    -- Try to drop all deprecated functions,
    -- and report failure to do so as a WARNING
    -- for the user to handle.
    --
    FOR rec IN

        SELECT *, oid::regprocedure as proc
        FROM pg_catalog.pg_proc
        WHERE proname ~ 'deprecated_by_postgis'

    LOOP --{

        RAISE DEBUG 'Handling deprecated function %', rec.proc;

        new_name := pg_catalog.regexp_replace(
            rec.proc::text,
            E'_deprecated_by_postgis[^(]*\\(.*',
            ''
        );

        sql := pg_catalog.format('DROP FUNCTION %s', rec.proc);
        --RAISE DEBUG 'SQL: %', sql;
        BEGIN --{
            EXECUTE sql;
        EXCEPTION
        WHEN OTHERS THEN -- }{
            hint = 'Resolve the issue';
            GET STACKED DIAGNOSTICS detail := PG_EXCEPTION_DETAIL;
            IF detail LIKE '%view % depends%' THEN
                hint = pg_catalog.format(
                    'Replace the view changing all occurrences of %s in its definition with %s',
                    rec.proc,
                    new_name
                );
            END IF;
            hint = hint || ' and upgrade again';

            RAISE WARNING 'Deprecated function % left behind: %',
                rec.proc, SQLERRM
            USING DETAIL = detail, HINT = hint;

            -- Drop the function from any extension it is part of
            -- so dump/reloads still work
            FOR extrec IN
                SELECT e.extname
                FROM
                    pg_catalog.pg_extension e,
                    pg_catalog.pg_depend d
                WHERE
                    d.refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND
                    d.refobjid = e.oid AND
                    d.classid = 'pg_catalog.pg_proc'::pg_catalog.regclass AND
                    d.objid = rec.proc::oid
            LOOP
                RAISE DEBUG 'Unpackaging % from extension %', rec.proc, extrec.extname;
                sql := pg_catalog.format('ALTER EXTENSION %I DROP FUNCTION %s', extrec.extname, rec.proc);
                EXECUTE sql;
            END LOOP;

        END; --}

    END LOOP; --}
END
$POSTGIS_PROC_UPGRADE$;

