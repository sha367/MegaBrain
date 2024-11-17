
COMMENT ON TYPE topology.getfaceedges_returntype IS 'postgis type: A composite type that consists of a sequencenumber and an edge number.';

COMMENT ON TYPE topology.TopoGeometry IS 'postgis type: A composite type representing a topologically defined geometry.';

COMMENT ON TYPE topology.validatetopology_returntype IS 'postgis type: A composite type that consists of an error message and id1 and id2 to denote location of error. This is the return type for ValidateTopology.';

COMMENT ON DOMAIN topology.TopoElement IS 'postgis domain: An array of 2 integers generally used to identify a TopoGeometry component.';

COMMENT ON DOMAIN topology.TopoElementArray IS 'postgis domain: An array of TopoElement objects.';

COMMENT ON FUNCTION topology.AddTopoGeometryColumn(varchar , varchar , varchar , varchar , varchar ) IS 'args: topology_name, schema_name, table_name, column_name, feature_type - Adds a topogeometry column to an existing table, registers this new column as a layer in topology.layer and returns the new layer_id.';
			
COMMENT ON FUNCTION topology.AddTopoGeometryColumn(varchar , varchar , varchar , varchar , varchar , integer ) IS 'args: topology_name, schema_name, table_name, column_name, feature_type, child_layer - Adds a topogeometry column to an existing table, registers this new column as a layer in topology.layer and returns the new layer_id.';
			
COMMENT ON FUNCTION topology.RenameTopoGeometryColumn(regclass , name , name ) IS 'args: layer_table, feature_column, new_name - Renames a topogeometry column';
			
COMMENT ON FUNCTION topology.DropTopology(varchar ) IS 'args: topology_schema_name - Use with caution: Drops a topology schema and deletes its reference from topology.topology table and references to tables in that schema from the geometry_columns table.';
			
COMMENT ON FUNCTION topology.RenameTopology(varchar , varchar ) IS 'args: old_name, new_name - Renames a topology';
			
COMMENT ON FUNCTION topology.DropTopoGeometryColumn(varchar , varchar , varchar ) IS 'args: schema_name, table_name, column_name - Drops the topogeometry column from the table named table_name in schema schema_name and unregisters the columns from topology.layer table.';
			
COMMENT ON FUNCTION topology.Populate_Topology_Layer() IS 'Adds missing entries to topology.layer table by reading metadata from topo tables.';
			
COMMENT ON FUNCTION topology.TopologySummary(varchar ) IS 'args: topology_schema_name - Takes a topology name and provides summary totals of types of objects in topology.';
			
COMMENT ON FUNCTION topology.ValidateTopology(varchar , geometry) IS 'args: toponame, bbox - Returns a set of validatetopology_returntype objects detailing issues with topology.';
			
COMMENT ON FUNCTION topology.ValidateTopologyRelation(varchar ) IS 'args: toponame - Returns info about invalid topology relation records';
			
COMMENT ON FUNCTION topology.FindTopology(TopoGeometry) IS 'args: topogeom - Returns a topology record by different means.';
			
COMMENT ON FUNCTION topology.FindTopology(regclass, name) IS 'args: layerTable, layerColumn - Returns a topology record by different means.';
			
COMMENT ON FUNCTION topology.FindTopology(name, name, name) IS 'args: layerSchema, layerTable, layerColumn - Returns a topology record by different means.';
			
COMMENT ON FUNCTION topology.FindTopology(text) IS 'args: topoName - Returns a topology record by different means.';
			
COMMENT ON FUNCTION topology.FindTopology(int) IS 'args: id - Returns a topology record by different means.';
			
COMMENT ON FUNCTION topology.FindLayer(TopoGeometry) IS 'args: tg - Returns a topology.layer record by different means.';
			
COMMENT ON FUNCTION topology.FindLayer(regclass, name) IS 'args: layer_table, feature_column - Returns a topology.layer record by different means.';
			
COMMENT ON FUNCTION topology.FindLayer(name, name, name) IS 'args: schema_name, table_name, feature_column - Returns a topology.layer record by different means.';
			
COMMENT ON FUNCTION topology.FindLayer(integer, integer) IS 'args: topology_id, layer_id - Returns a topology.layer record by different means.';
			
COMMENT ON FUNCTION topology.CreateTopology(varchar ) IS 'args: topology_schema_name - Creates a new topology schema and registers it in the topology.topology table.';
			
COMMENT ON FUNCTION topology.CreateTopology(varchar , integer ) IS 'args: topology_schema_name, srid - Creates a new topology schema and registers it in the topology.topology table.';
			
COMMENT ON FUNCTION topology.CreateTopology(varchar , integer , double precision ) IS 'args: topology_schema_name, srid, prec - Creates a new topology schema and registers it in the topology.topology table.';
			
COMMENT ON FUNCTION topology.CreateTopology(varchar , integer , double precision , boolean ) IS 'args: topology_schema_name, srid, prec, hasz - Creates a new topology schema and registers it in the topology.topology table.';
			
COMMENT ON FUNCTION topology.CopyTopology(varchar , varchar ) IS 'args: existing_topology_name, new_name - Makes a copy of a topology (nodes, edges, faces, layers and TopoGeometries) into a new schema';
			
COMMENT ON FUNCTION topology.ST_InitTopoGeo(varchar ) IS 'args: topology_schema_name - Creates a new topology schema and registers it in the topology.topology table.';
			
COMMENT ON FUNCTION topology.ST_CreateTopoGeo(varchar , geometry ) IS 'args: atopology, acollection - Adds a collection of geometries to a given empty topology and returns a message detailing success.';
			
COMMENT ON FUNCTION topology.TopoGeo_AddPoint(varchar , geometry , float8 ) IS 'args: atopology, apoint, tolerance - Adds a point to an existing topology using a tolerance and possibly splitting an existing edge.';
			
COMMENT ON FUNCTION topology.TopoGeo_AddLineString(varchar , geometry , float8 ) IS 'args: atopology, aline, tolerance - Adds a linestring to an existing topology using a tolerance and possibly splitting existing edges/faces.';
			
COMMENT ON FUNCTION topology.TopoGeo_AddPolygon(varchar , geometry , float8 ) IS 'args: atopology, apoly, tolerance - Adds a polygon to an existing topology using a tolerance and possibly splitting existing edges/faces. Returns face identifiers.';
			
COMMENT ON FUNCTION topology.TopoGeo_LoadGeometry(varchar , geometry , float8 ) IS 'args: atopology, ageom, tolerance - Load a geometry into an existing topology, snapping and splitting as needed.';
			
COMMENT ON FUNCTION topology.ST_AddIsoNode(varchar , integer , geometry ) IS 'args: atopology, aface, apoint - Adds an isolated node to a face in a topology and returns the nodeid of the new node. If face is null, the node is still created.';
			
COMMENT ON FUNCTION topology.ST_AddIsoEdge(varchar , integer , integer , geometry ) IS 'args: atopology, anode, anothernode, alinestring - Adds an isolated edge defined by geometry alinestring to a topology connecting two existing isolated nodes anode and anothernode and returns the edge id of the new edge.';
			
COMMENT ON FUNCTION topology.ST_AddEdgeNewFaces(varchar , integer , integer , geometry ) IS 'args: atopology, anode, anothernode, acurve - Add a new edge and, if in doing so it splits a face, delete the original face and replace it with two new faces.';
			
COMMENT ON FUNCTION topology.ST_AddEdgeModFace(varchar , integer , integer , geometry ) IS 'args: atopology, anode, anothernode, acurve - Add a new edge and, if in doing so it splits a face, modify the original face and add a new face.';
			
COMMENT ON FUNCTION topology.ST_RemEdgeNewFace(varchar , integer ) IS 'args: atopology, anedge - Removes an edge and, if the removed edge separated two faces,delete the original faces and replace them with a new face.';
			
COMMENT ON FUNCTION topology.ST_RemEdgeModFace(varchar , integer ) IS 'args: atopology, anedge - Removes an edge, and if the edge separates two facesdeletes one face and modifies the other face to cover the space of both.';
			
COMMENT ON FUNCTION topology.ST_ChangeEdgeGeom(varchar , integer , geometry ) IS 'args: atopology, anedge, acurve - Changes the shape of an edge without affecting the topology structure.';
			
COMMENT ON FUNCTION topology.ST_ModEdgeSplit(varchar , integer , geometry ) IS 'args: atopology, anedge, apoint - Split an edge by creating a new node along an existing edge, modifying the original edge and adding a new edge.';
			
COMMENT ON FUNCTION topology.ST_ModEdgeHeal(varchar , integer , integer ) IS 'args: atopology, anedge, anotheredge - Heals two edges by deleting the node connecting them, modifying the first edgeand deleting the second edge. Returns the id of the deleted node.';
			
COMMENT ON FUNCTION topology.ST_NewEdgeHeal(varchar , integer , integer ) IS 'args: atopology, anedge, anotheredge - Heals two edges by deleting the node connecting them, deleting both edges,and replacing them with an edge whose direction is the same as the firstedge provided.';
			
COMMENT ON FUNCTION topology.ST_MoveIsoNode(varchar , integer , geometry ) IS 'args: atopology, anode, apoint - Moves an isolated node in a topology from one point to another. If new apoint geometry exists as a node an error is thrown. Returns description of move.';
			
COMMENT ON FUNCTION topology.ST_NewEdgesSplit(varchar , integer , geometry ) IS 'args: atopology, anedge, apoint - Split an edge by creating a new node along an existing edge, deleting the original edge and replacing it with two new edges. Returns the id of the new node created that joins the new edges.';
			
COMMENT ON FUNCTION topology.ST_RemoveIsoNode(varchar , integer ) IS 'args: atopology, anode - Removes an isolated node and returns description of action. If the node is not isolated (is start or end of an edge), then an exception is thrown.';
			
COMMENT ON FUNCTION topology.ST_RemoveIsoEdge(varchar , integer ) IS 'args: atopology, anedge - Removes an isolated edge and returns description of action. If the edge is not isolated, then an exception is thrown.';
			
COMMENT ON FUNCTION topology.GetEdgeByPoint(varchar , geometry , float8 ) IS 'args: atopology, apoint, tol1 - Finds the edge-id of an edge that intersects a given point.';
			
COMMENT ON FUNCTION topology.GetFaceByPoint(varchar , geometry , float8 ) IS 'args: atopology, apoint, tol1 - Finds face intersecting a given point.';
			
COMMENT ON FUNCTION topology.GetFaceContainingPoint(text , geometry ) IS 'args: atopology, apoint - Finds the face containing a point.';
			
COMMENT ON FUNCTION topology.GetNodeByPoint(varchar , geometry , float8 ) IS 'args: atopology, apoint, tol1 - Finds the node-id of a node at a point location.';
			
COMMENT ON FUNCTION topology.GetTopologyID(varchar) IS 'args: toponame - Returns the id of a topology in the topology.topology table given the name of the topology.';
			
COMMENT ON FUNCTION topology.GetTopologyID(varchar) IS 'args: toponame - Returns the SRID of a topology in the topology.topology table given the name of the topology.';
			
COMMENT ON FUNCTION topology.GetTopologyName(integer) IS 'args: topology_id - Returns the name of a topology (schema) given the id of the topology.';
			
COMMENT ON FUNCTION topology.ST_GetFaceEdges(varchar , integer ) IS 'args: atopology, aface - Returns a set of ordered edges that bound aface.';
			
COMMENT ON FUNCTION topology.ST_GetFaceGeometry(varchar , integer ) IS 'args: atopology, aface - Returns the polygon in the given topology with the specified face id.';
			
COMMENT ON FUNCTION topology.GetRingEdges(varchar , integer , integer ) IS 'args: atopology, aring, max_edges=null - Returns the ordered set of signed edge identifiers met by walking on ana given edge side.';
			
COMMENT ON FUNCTION topology.GetNodeEdges(varchar , integer ) IS 'args: atopology, anode - Returns an ordered set of edges incident to the given node.';
			
COMMENT ON FUNCTION topology.Polygonize(varchar ) IS 'args: toponame - Finds and registers all faces defined by topology edges.';
			
COMMENT ON FUNCTION topology.AddNode(varchar , geometry , boolean , boolean ) IS 'args: toponame, apoint, allowEdgeSplitting=false, computeContainingFace=false - Adds a point node to the node table in the specified topology schema and returns the nodeid of new node. If point already exists as node, the existing nodeid is returned.';
			
COMMENT ON FUNCTION topology.AddEdge(varchar , geometry ) IS 'args: toponame, aline - Adds a linestring edge to the edge table and associated start and end points to the point nodes table of the specified topology schema using the specified linestring geometry and returns the edgeid of the new (or existing) edge.';
			
COMMENT ON FUNCTION topology.AddFace(varchar , geometry , boolean ) IS 'args: toponame, apolygon, force_new=false - Registers a face primitive to a topology and gets its identifier.';
			
COMMENT ON FUNCTION topology.ST_Simplify(TopoGeometry, float8) IS 'args: tg, tolerance - Returns a "simplified" geometry version of the given TopoGeometry using the Douglas-Peucker algorithm.';
			
COMMENT ON FUNCTION topology.RemoveUnusedPrimitives(text, geometry) IS 'args: topology_name, bbox - Removes topology primitives which not needed to define existing TopoGeometry objects.';
			
COMMENT ON FUNCTION topology.CreateTopoGeom(varchar , integer , integer, topoelementarray) IS 'args: toponame, tg_type, layer_id, tg_objs - Creates a new topo geometry object from topo element array - tg_type: 1:[multi]point, 2:[multi]line, 3:[multi]poly, 4:collection';
			
COMMENT ON FUNCTION topology.CreateTopoGeom(varchar , integer , integer) IS 'args: toponame, tg_type, layer_id - Creates a new topo geometry object from topo element array - tg_type: 1:[multi]point, 2:[multi]line, 3:[multi]poly, 4:collection';
			
COMMENT ON FUNCTION topology.toTopoGeom(geometry , varchar , integer, float8) IS 'args: geom, toponame, layer_id, tolerance - Converts a simple Geometry into a topo geometry.';
			
COMMENT ON FUNCTION topology.toTopoGeom(geometry , topogeometry , float8) IS 'args: geom, topogeom, tolerance - Converts a simple Geometry into a topo geometry.';
			
COMMENT ON AGGREGATE topology.TopoElementArray_Agg(topoelement) IS 'args: tefield - Returns a topoelementarray for a set of element_id, type arrays (topoelements).';
			
COMMENT ON FUNCTION topology.TopoElement(topogeometry ) IS 'args: topo - Converts a topogeometry to a topoelement.';
			
COMMENT ON FUNCTION topology.clearTopoGeom(topogeometry ) IS 'args: topogeom - Clears the content of a topo geometry.';
			
COMMENT ON FUNCTION topology.TopoGeom_addElement(topogeometry , topoelement ) IS 'args: tg, el - Adds an element to the definition of a TopoGeometry.';
			
COMMENT ON FUNCTION topology.TopoGeom_remElement(topogeometry , topoelement ) IS 'args: tg, el - Removes an element from the definition of a TopoGeometry.';
			
COMMENT ON FUNCTION topology.TopoGeom_addTopoGeom(topogeometry , topogeometry ) IS 'args: tgt, src - Adds element of a TopoGeometry to the definition of another TopoGeometry.';
			
COMMENT ON FUNCTION topology.GetTopoGeomElementArray(varchar , integer , integer) IS 'args: toponame, layer_id, tg_id - Returns a topoelementarray (an array of topoelements) containing the topological elements and type of the given TopoGeometry (primitive elements).';
			
COMMENT ON FUNCTION topology.GetTopoGeomElementArray(topogeometry ) IS 'args: tg - Returns a topoelementarray (an array of topoelements) containing the topological elements and type of the given TopoGeometry (primitive elements).';
			
COMMENT ON FUNCTION topology.GetTopoGeomElements(varchar , integer , integer) IS 'args: toponame, layer_id, tg_id - Returns a set of topoelement objects containing the topological element_id,element_type of the given TopoGeometry (primitive elements).';
			
COMMENT ON FUNCTION topology.GetTopoGeomElements(topogeometry ) IS 'args: tg - Returns a set of topoelement objects containing the topological element_id,element_type of the given TopoGeometry (primitive elements).';
			
COMMENT ON FUNCTION topology.ST_SRID(topogeometry ) IS 'args: tg - Returns the spatial reference identifier for a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry ) IS 'args: tg - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , text ) IS 'args: tg, nsprefix_in - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , regclass ) IS 'args: tg, visitedTable - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , regclass , text ) IS 'args: tg, visitedTable, nsprefix - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , text , integer , integer ) IS 'args: tg, nsprefix_in, precision, options - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , text , integer , integer , regclass ) IS 'args: tg, nsprefix_in, precision, options, visitedTable - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , text , integer , integer , regclass , text ) IS 'args: tg, nsprefix_in, precision, options, visitedTable, idprefix - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsGML(topogeometry , text , integer , integer , regclass , text , int ) IS 'args: tg, nsprefix_in, precision, options, visitedTable, idprefix, gmlversion - Returns the GML representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.AsTopoJSON(topogeometry , regclass ) IS 'args: tg, edgeMapTable - Returns the TopoJSON representation of a topogeometry.';
			
COMMENT ON FUNCTION topology.Equals(topogeometry , topogeometry ) IS 'args: tg1, tg2 - Returns true if two topogeometries are composed of the same topology primitives.';
			
COMMENT ON FUNCTION topology.Intersects(topogeometry , topogeometry ) IS 'args: tg1, tg2 - Returns true if any pair of primitives from the two topogeometries intersect.';
			