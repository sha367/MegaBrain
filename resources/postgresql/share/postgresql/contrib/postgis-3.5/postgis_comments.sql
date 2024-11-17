
	COMMENT ON TYPE box2d IS 'postgis type: The type representing a 2-dimensional bounding box.';

	COMMENT ON TYPE box3d IS 'postgis type: The type representing a 3-dimensional bounding box.';

	COMMENT ON TYPE geometry IS 'postgis type: The type representing spatial features with planar coordinate systems.';

	COMMENT ON TYPE geometry_dump IS 'postgis type: A composite type used to describe the parts of complex geometry.';

	COMMENT ON TYPE geography IS 'postgis type: The type representing spatial features with geodetic (ellipsoidal) coordinate systems.';

COMMENT ON FUNCTION AddGeometryColumn(varchar , varchar , integer , varchar , integer , boolean ) IS 'args: table_name, column_name, srid, type, dimension, use_typmod=true - Adds a geometry column to an existing table.';
			
COMMENT ON FUNCTION AddGeometryColumn(varchar , varchar , varchar , integer , varchar , integer , boolean ) IS 'args: schema_name, table_name, column_name, srid, type, dimension, use_typmod=true - Adds a geometry column to an existing table.';
			
COMMENT ON FUNCTION AddGeometryColumn(varchar , varchar , varchar , varchar , integer , varchar , integer , boolean ) IS 'args: catalog_name, schema_name, table_name, column_name, srid, type, dimension, use_typmod=true - Adds a geometry column to an existing table.';
			
COMMENT ON FUNCTION DropGeometryColumn(varchar , varchar ) IS 'args: table_name, column_name - Removes a geometry column from a spatial table.';
			
COMMENT ON FUNCTION DropGeometryColumn(varchar , varchar , varchar ) IS 'args: schema_name, table_name, column_name - Removes a geometry column from a spatial table.';
			
COMMENT ON FUNCTION DropGeometryColumn(varchar , varchar , varchar , varchar ) IS 'args: catalog_name, schema_name, table_name, column_name - Removes a geometry column from a spatial table.';
			
COMMENT ON FUNCTION DropGeometryTable(varchar ) IS 'args: table_name - Drops a table and all its references in geometry_columns.';
			
COMMENT ON FUNCTION DropGeometryTable(varchar , varchar ) IS 'args: schema_name, table_name - Drops a table and all its references in geometry_columns.';
			
COMMENT ON FUNCTION DropGeometryTable(varchar , varchar , varchar ) IS 'args: catalog_name, schema_name, table_name - Drops a table and all its references in geometry_columns.';
			
COMMENT ON FUNCTION Find_SRID(varchar , varchar , varchar ) IS 'args: a_schema_name, a_table_name, a_geomfield_name - Returns the SRID defined for a geometry column.';
			
COMMENT ON FUNCTION Populate_Geometry_Columns(boolean ) IS 'args: use_typmod=true - Ensures geometry columns are defined with type modifiers or have appropriate spatial constraints.';
			
COMMENT ON FUNCTION Populate_Geometry_Columns(oid, boolean ) IS 'args: relation_oid, use_typmod=true - Ensures geometry columns are defined with type modifiers or have appropriate spatial constraints.';
			
COMMENT ON FUNCTION UpdateGeometrySRID(varchar , varchar , integer ) IS 'args: table_name, column_name, srid - Updates the SRID of all features in a geometry column, and the table metadata.';
			
COMMENT ON FUNCTION UpdateGeometrySRID(varchar , varchar , varchar , integer ) IS 'args: schema_name, table_name, column_name, srid - Updates the SRID of all features in a geometry column, and the table metadata.';
			
COMMENT ON FUNCTION UpdateGeometrySRID(varchar , varchar , varchar , varchar , integer ) IS 'args: catalog_name, schema_name, table_name, column_name, srid - Updates the SRID of all features in a geometry column, and the table metadata.';
			
COMMENT ON FUNCTION ST_Collect(geometry, geometry) IS 'args: g1, g2 - Creates a GeometryCollection or Multi* geometry from a set of geometries.';
			
COMMENT ON FUNCTION ST_Collect(geometry[]) IS 'args: g1_array - Creates a GeometryCollection or Multi* geometry from a set of geometries.';
			
COMMENT ON AGGREGATE ST_Collect(geometry) IS 'args: g1field - Creates a GeometryCollection or Multi* geometry from a set of geometries.';
			
COMMENT ON FUNCTION ST_LineFromMultiPoint(geometry ) IS 'args: aMultiPoint - Creates a LineString from a MultiPoint geometry.';
			
COMMENT ON FUNCTION ST_MakeEnvelope(float, float, float, float, integer) IS 'args: xmin, ymin, xmax, ymax, srid=unknown - Creates a rectangular Polygon from minimum and maximum coordinates.';
			
COMMENT ON FUNCTION ST_MakeLine(geometry, geometry) IS 'args: geom1, geom2 - Creates a LineString from Point, MultiPoint, or LineString geometries.';
			
COMMENT ON FUNCTION ST_MakeLine(geometry[]) IS 'args: geoms_array - Creates a LineString from Point, MultiPoint, or LineString geometries.';
			
COMMENT ON AGGREGATE ST_MakeLine(geometry) IS 'args: geoms - Creates a LineString from Point, MultiPoint, or LineString geometries.';
			
COMMENT ON FUNCTION ST_MakePoint(float, float) IS 'args: x, y - Creates a 2D, 3DZ or 4D Point.';
			
COMMENT ON FUNCTION ST_MakePoint(float, float, float) IS 'args: x, y, z - Creates a 2D, 3DZ or 4D Point.';
			
COMMENT ON FUNCTION ST_MakePoint(float, float, float, float) IS 'args: x, y, z, m - Creates a 2D, 3DZ or 4D Point.';
			
COMMENT ON FUNCTION ST_MakePointM(float, float, float) IS 'args: x, y, m - Creates a Point from X, Y and M values.';
			
COMMENT ON FUNCTION ST_MakePolygon(geometry) IS 'args: linestring - Creates a Polygon from a shell and optional list of holes.';
			
COMMENT ON FUNCTION ST_MakePolygon(geometry, geometry[]) IS 'args: outerlinestring, interiorlinestrings - Creates a Polygon from a shell and optional list of holes.';
			
COMMENT ON FUNCTION ST_Point(float, float) IS 'args: x, y - Creates a Point with X, Y and SRID values.';
			
COMMENT ON FUNCTION ST_Point(float, float, integer) IS 'args: x, y, srid=unknown - Creates a Point with X, Y and SRID values.';
			
COMMENT ON FUNCTION ST_PointZ(float, float, float, integer) IS 'args: x, y, z, srid=unknown - Creates a Point with X, Y, Z and SRID values.';
			
COMMENT ON FUNCTION ST_PointM(float, float, float, integer) IS 'args: x, y, m, srid=unknown - Creates a Point with X, Y, M and SRID values.';
			
COMMENT ON FUNCTION ST_PointZM(float, float, float, float, integer) IS 'args: x, y, z, m, srid=unknown - Creates a Point with X, Y, Z, M and SRID values.';
			
COMMENT ON FUNCTION ST_Polygon(geometry , integer ) IS 'args: lineString, srid - Creates a Polygon from a LineString with a specified SRID.';
			
COMMENT ON FUNCTION ST_TileEnvelope(integer, integer, integer, geometry, float) IS 'args: tileZoom, tileX, tileY, bounds=SRID=3857;LINESTRING(-20037508.342789 -20037508.342789,20037508.342789 20037508.342789), margin=0.0 - Creates a rectangular Polygon in Web Mercator (SRID:3857) using the XYZ tile system.';
			
COMMENT ON FUNCTION ST_HexagonGrid(float8, geometry) IS 'args: size, bounds - Returns a set of hexagons and cell indices that completely cover the bounds of the geometry argument.';
			
COMMENT ON FUNCTION ST_Hexagon(float8, integer, integer, geometry) IS 'args: size, cell_i, cell_j, origin - Returns a single hexagon, using the provided edge size and cell coordinate within the hexagon grid space.';
			
COMMENT ON FUNCTION ST_SquareGrid(float8, geometry) IS 'args: size, bounds - Returns a set of grid squares and cell indices that completely cover the bounds of the geometry argument.';
			
COMMENT ON FUNCTION ST_Square(float8, integer, integer, geometry) IS 'args: size, cell_i, cell_j, origin - Returns a single square, using the provided edge size and cell coordinate within the square grid space.';
			
COMMENT ON FUNCTION ST_Letters(text, json) IS 'args: letters, font - Returns the input letters rendered as geometry with a default start position at the origin and default text height of 100.';
			
COMMENT ON FUNCTION GeometryType(geometry ) IS 'args: geomA - Returns the type of a geometry as text.';
			
COMMENT ON FUNCTION ST_Boundary(geometry ) IS 'args: geomA - Returns the boundary of a geometry.';
			
COMMENT ON FUNCTION ST_BoundingDiagonal(geometry , boolean ) IS 'args: geom, fits=false - Returns the diagonal of a geometrys bounding box.';
			
COMMENT ON FUNCTION ST_CoordDim(geometry ) IS 'args: geomA - Return the coordinate dimension of a geometry.';
			
COMMENT ON FUNCTION ST_Dimension(geometry ) IS 'args: g - Returns the topological dimension of a geometry.';
			
COMMENT ON FUNCTION ST_Dump(geometry ) IS 'args: g1 - Returns a set of geometry_dump rows for the components of a geometry.';
			
COMMENT ON FUNCTION ST_DumpPoints(geometry ) IS 'args: geom - Returns a set of geometry_dump rows for the coordinates in a geometry.';
			
COMMENT ON FUNCTION ST_DumpSegments(geometry ) IS 'args: geom - Returns a set of geometry_dump rows for the segments in a geometry.';
			
COMMENT ON FUNCTION ST_DumpRings(geometry ) IS 'args: a_polygon - Returns a set of geometry_dump rows for the exterior and interior rings of a Polygon.';
			
COMMENT ON FUNCTION ST_EndPoint(geometry ) IS 'args: g - Returns the last point of a LineString or CircularLineString.';
			
COMMENT ON FUNCTION ST_Envelope(geometry ) IS 'args: g1 - Returns a geometry representing the bounding box of a geometry.';
			
COMMENT ON FUNCTION ST_ExteriorRing(geometry ) IS 'args: a_polygon - Returns a LineString representing the exterior ring of a Polygon.';
			
COMMENT ON FUNCTION ST_GeometryN(geometry , integer ) IS 'args: geomA, n - Return an element of a geometry collection.';
			
COMMENT ON FUNCTION ST_GeometryType(geometry ) IS 'args: g1 - Returns the SQL-MM type of a geometry as text.';
			
COMMENT ON FUNCTION ST_HasArc(geometry ) IS 'args: geomA - Tests if a geometry contains a circular arc';
			
COMMENT ON FUNCTION ST_InteriorRingN(geometry , integer ) IS 'args: a_polygon, n - Returns the Nth interior ring (hole) of a Polygon.';
			
COMMENT ON FUNCTION ST_NumCurves(geometry ) IS 'args: a_compoundcurve - Return the number of component curves in a CompoundCurve.';
			
COMMENT ON FUNCTION ST_CurveN(geometry , integer ) IS 'args: a_compoundcurve, index - Returns the Nth component curve geometry of a CompoundCurve.';
			
COMMENT ON FUNCTION ST_IsClosed(geometry ) IS 'args: g - Tests if a LineStringss start and end points are coincident. For a PolyhedralSurface tests if it is closed (volumetric).';
			
COMMENT ON FUNCTION ST_IsCollection(geometry ) IS 'args: g - Tests if a geometry is a geometry collection type.';
			
COMMENT ON FUNCTION ST_IsEmpty(geometry ) IS 'args: geomA - Tests if a geometry is empty.';
			
COMMENT ON FUNCTION ST_IsPolygonCCW(geometry) IS 'args: geom - Tests if Polygons have exterior rings oriented counter-clockwise and interior rings oriented clockwise.';
			
COMMENT ON FUNCTION ST_IsPolygonCW(geometry) IS 'args: geom - Tests if Polygons have exterior rings oriented clockwise and interior rings oriented counter-clockwise.';
			
COMMENT ON FUNCTION ST_IsRing(geometry ) IS 'args: g - Tests if a LineString is closed and simple.';
			
COMMENT ON FUNCTION ST_IsSimple(geometry ) IS 'args: geomA - Tests if a geometry has no points of self-intersection or self-tangency.';
			
COMMENT ON FUNCTION ST_M(geometry ) IS 'args: a_point - Returns the M coordinate of a Point.';
			
COMMENT ON FUNCTION ST_MemSize(geometry ) IS 'args: geomA - Returns the amount of memory space a geometry takes.';
			
COMMENT ON FUNCTION ST_NDims(geometry ) IS 'args: g1 - Returns the coordinate dimension of a geometry.';
			
COMMENT ON FUNCTION ST_NPoints(geometry ) IS 'args: g1 - Returns the number of points (vertices) in a geometry.';
			
COMMENT ON FUNCTION ST_NRings(geometry ) IS 'args: geomA - Returns the number of rings in a polygonal geometry.';
			
COMMENT ON FUNCTION ST_NumGeometries(geometry ) IS 'args: geom - Returns the number of elements in a geometry collection.';
			
COMMENT ON FUNCTION ST_NumInteriorRings(geometry ) IS 'args: a_polygon - Returns the number of interior rings (holes) of a Polygon.';
			
COMMENT ON FUNCTION ST_NumInteriorRing(geometry ) IS 'args: a_polygon - Returns the number of interior rings (holes) of a Polygon. Aias for ST_NumInteriorRings';
			
COMMENT ON FUNCTION ST_NumPatches(geometry ) IS 'args: g1 - Return the number of faces on a Polyhedral Surface. Will return null for non-polyhedral geometries.';
			
COMMENT ON FUNCTION ST_NumPoints(geometry ) IS 'args: g1 - Returns the number of points in a LineString or CircularString.';
			
COMMENT ON FUNCTION ST_PatchN(geometry , integer ) IS 'args: geomA, n - Returns the Nth geometry (face) of a PolyhedralSurface.';
			
COMMENT ON FUNCTION ST_PointN(geometry , integer ) IS 'args: a_linestring, n - Returns the Nth point in the first LineString or circular LineString in a geometry.';
			
COMMENT ON FUNCTION ST_Points(geometry) IS 'args: geom - Returns a MultiPoint containing the coordinates of a geometry.';
			
COMMENT ON FUNCTION ST_StartPoint(geometry ) IS 'args: geomA - Returns the first point of a LineString.';
			
COMMENT ON FUNCTION ST_Summary(geometry ) IS 'args: g - Returns a text summary of the contents of a geometry.';
			
COMMENT ON FUNCTION ST_Summary(geography ) IS 'args: g - Returns a text summary of the contents of a geometry.';
			
COMMENT ON FUNCTION ST_X(geometry ) IS 'args: a_point - Returns the X coordinate of a Point.';
			
COMMENT ON FUNCTION ST_Y(geometry ) IS 'args: a_point - Returns the Y coordinate of a Point.';
			
COMMENT ON FUNCTION ST_Z(geometry ) IS 'args: a_point - Returns the Z coordinate of a Point.';
			
COMMENT ON FUNCTION ST_Zmflag(geometry ) IS 'args: geomA - Returns a code indicating the ZM coordinate dimension of a geometry.';
			
COMMENT ON FUNCTION ST_HasZ(geometry) IS 'args: geom - Checks if a geometry has a Z dimension.';
			
COMMENT ON FUNCTION ST_HasM(geometry) IS 'args: geom - Checks if a geometry has an M (measure) dimension.';
			
COMMENT ON FUNCTION ST_AddPoint(geometry, geometry) IS 'args: linestring, point - Add a point to a LineString.';
			
COMMENT ON FUNCTION ST_AddPoint(geometry, geometry, integer) IS 'args: linestring, point, position = -1 - Add a point to a LineString.';
			
COMMENT ON FUNCTION ST_CollectionExtract(geometry ) IS 'args: collection - Given a geometry collection, returns a multi-geometry containing only elements of a specified type.';
			
COMMENT ON FUNCTION ST_CollectionExtract(geometry , integer ) IS 'args: collection, type - Given a geometry collection, returns a multi-geometry containing only elements of a specified type.';
			
COMMENT ON FUNCTION ST_CollectionHomogenize(geometry ) IS 'args: collection - Returns the simplest representation of a geometry collection.';
			
COMMENT ON FUNCTION ST_CurveToLine(geometry, float, integer, integer) IS 'args: curveGeom, tolerance, tolerance_type, flags - Converts a geometry containing curves to a linear geometry.';
			
COMMENT ON FUNCTION ST_Scroll(geometry, geometry) IS 'args: linestring, point - Change start point of a closed LineString.';
			
COMMENT ON FUNCTION ST_FlipCoordinates(geometry) IS 'args: geom - Returns a version of a geometry with X and Y axis flipped.';
			
COMMENT ON FUNCTION ST_Force2D(geometry ) IS 'args: geomA - Force the geometries into a "2-dimensional mode".';
			
COMMENT ON FUNCTION ST_Force3D(geometry , float ) IS 'args: geomA, Zvalue = 0.0 - Force the geometries into XYZ mode. This is an alias for ST_Force3DZ.';
			
COMMENT ON FUNCTION ST_Force3DZ(geometry , float ) IS 'args: geomA, Zvalue = 0.0 - Force the geometries into XYZ mode.';
			
COMMENT ON FUNCTION ST_Force3DM(geometry , float ) IS 'args: geomA, Mvalue = 0.0 - Force the geometries into XYM mode.';
			
COMMENT ON FUNCTION ST_Force4D(geometry , float , float ) IS 'args: geomA, Zvalue = 0.0, Mvalue = 0.0 - Force the geometries into XYZM mode.';
			
COMMENT ON FUNCTION ST_ForceCollection(geometry ) IS 'args: geomA - Convert the geometry into a GEOMETRYCOLLECTION.';
			
COMMENT ON FUNCTION ST_ForceCurve(geometry) IS 'args: g - Upcast a geometry into its curved type, if applicable.';
			
COMMENT ON FUNCTION ST_ForcePolygonCCW(geometry) IS 'args: geom - Orients all exterior rings counter-clockwise and all interior rings clockwise.';
			
COMMENT ON FUNCTION ST_ForcePolygonCW(geometry) IS 'args: geom - Orients all exterior rings clockwise and all interior rings counter-clockwise.';
			
COMMENT ON FUNCTION ST_ForceSFS(geometry ) IS 'args: geomA - Force the geometries to use SFS 1.1 geometry types only.';
			
COMMENT ON FUNCTION ST_ForceSFS(geometry , text ) IS 'args: geomA, version - Force the geometries to use SFS 1.1 geometry types only.';
			
COMMENT ON FUNCTION ST_ForceRHR(geometry) IS 'args: g - Force the orientation of the vertices in a polygon to follow the Right-Hand-Rule.';
			
COMMENT ON FUNCTION ST_LineExtend(geometry , float , float) IS 'args: line, distance_forward, distance_backward=0.0 - Returns a line extended forwards and backwards by specified distances.';
			
COMMENT ON FUNCTION ST_LineToCurve(geometry ) IS 'args: geomANoncircular - Converts a linear geometry to a curved geometry.';
			
COMMENT ON FUNCTION ST_Multi(geometry ) IS 'args: geom - Return the geometry as a MULTI* geometry.';
			
COMMENT ON FUNCTION ST_Normalize(geometry ) IS 'args: geom - Return the geometry in its canonical form.';
			
COMMENT ON FUNCTION ST_Project(geometry , float , float ) IS 'args: g1, distance, azimuth - Returns a point projected from a start point by a distance and bearing (azimuth).';
			
COMMENT ON FUNCTION ST_Project(geometry , geometry , float ) IS 'args: g1, g2, distance - Returns a point projected from a start point by a distance and bearing (azimuth).';
			
COMMENT ON FUNCTION ST_Project(geography , float , float ) IS 'args: g1, distance, azimuth - Returns a point projected from a start point by a distance and bearing (azimuth).';
			
COMMENT ON FUNCTION ST_Project(geography , geography , float ) IS 'args: g1, g2, distance - Returns a point projected from a start point by a distance and bearing (azimuth).';
			
COMMENT ON FUNCTION ST_QuantizeCoordinates(geometry, int, int, int, int) IS 'args: g, prec_x, prec_y, prec_z, prec_m - Sets least significant bits of coordinates to zero';
			
COMMENT ON FUNCTION ST_RemovePoint(geometry, integer) IS 'args: linestring, offset - Remove a point from a linestring.';
			
COMMENT ON FUNCTION ST_RemoveRepeatedPoints(geometry, float8) IS 'args: geom, tolerance - Returns a version of a geometry with duplicate points removed.';
			
COMMENT ON FUNCTION ST_RemoveIrrelevantPointsForView(geometry , box2d , boolean ) IS 'args: geom, bounds, cartesian_hint = false - Removes points that are irrelevant for rendering a specific rectangluar view of a geometry.';
			
COMMENT ON FUNCTION ST_RemoveSmallParts(geometry , double precision , double precision ) IS 'args: geom, minSizeX, minSizeY - Removes small parts (polygon rings or linestrings) of a geometry.';
			
COMMENT ON FUNCTION ST_Reverse(geometry ) IS 'args: g1 - Return the geometry with vertex order reversed.';
			
COMMENT ON FUNCTION ST_Segmentize(geometry , float ) IS 'args: geom, max_segment_length - Returns a modified geometry/geography having no segment longer than a given distance.';
			
COMMENT ON FUNCTION ST_Segmentize(geography , float ) IS 'args: geog, max_segment_length - Returns a modified geometry/geography having no segment longer than a given distance.';
			
COMMENT ON FUNCTION ST_SetPoint(geometry, integer, geometry) IS 'args: linestring, zerobasedposition, point - Replace point of a linestring with a given point.';
			
COMMENT ON FUNCTION ST_ShiftLongitude(geometry ) IS 'args: geom - Shifts the longitude coordinates of a geometry between -180..180 and 0..360.';
			
COMMENT ON FUNCTION ST_WrapX(geometry , float8 , float8 ) IS 'args: geom, wrap, move - Wrap a geometry around an X value.';
			
COMMENT ON FUNCTION ST_SnapToGrid(geometry , float , float , float , float ) IS 'args: geomA, originX, originY, sizeX, sizeY - Snap all points of the input geometry to a regular grid.';
			
COMMENT ON FUNCTION ST_SnapToGrid(geometry , float , float ) IS 'args: geomA, sizeX, sizeY - Snap all points of the input geometry to a regular grid.';
			
COMMENT ON FUNCTION ST_SnapToGrid(geometry , float ) IS 'args: geomA, size - Snap all points of the input geometry to a regular grid.';
			
COMMENT ON FUNCTION ST_SnapToGrid(geometry , geometry , float , float , float , float ) IS 'args: geomA, pointOrigin, sizeX, sizeY, sizeZ, sizeM - Snap all points of the input geometry to a regular grid.';
			
COMMENT ON FUNCTION ST_Snap(geometry , geometry , float ) IS 'args: input, reference, tolerance - Snap segments and vertices of input geometry to vertices of a reference geometry.';
			
COMMENT ON FUNCTION ST_SwapOrdinates(geometry, cstring) IS 'args: geom, ords - Returns a version of the given geometry with given ordinate values swapped.';
			
COMMENT ON FUNCTION ST_IsValid(geometry ) IS 'args: g - Tests if a geometry is well-formed in 2D.';
			
COMMENT ON FUNCTION ST_IsValid(geometry , integer ) IS 'args: g, flags - Tests if a geometry is well-formed in 2D.';
			
COMMENT ON FUNCTION ST_IsValidDetail(geometry , integer ) IS 'args: geom, flags - Returns a valid_detail row stating if a geometry is valid or if not a reason and a location.';
			
COMMENT ON FUNCTION ST_IsValidReason(geometry ) IS 'args: geomA - Returns text stating if a geometry is valid, or a reason for invalidity.';
			
COMMENT ON FUNCTION ST_IsValidReason(geometry , integer ) IS 'args: geomA, flags - Returns text stating if a geometry is valid, or a reason for invalidity.';
			
COMMENT ON FUNCTION ST_MakeValid(geometry) IS 'args: input - Attempts to make an invalid geometry valid without losing vertices.';
			
COMMENT ON FUNCTION ST_MakeValid(geometry, text) IS 'args: input, params - Attempts to make an invalid geometry valid without losing vertices.';
			
COMMENT ON FUNCTION ST_InverseTransformPipeline(geometry , text , integer ) IS 'args: geom, pipeline, to_srid - Return a new geometry with coordinates transformed to a different spatial reference system using the inverse of a defined coordinate transformation pipeline.';
			
COMMENT ON FUNCTION ST_SetSRID(geometry , integer ) IS 'args: geom, srid - Set the SRID on a geometry.';
			
COMMENT ON FUNCTION ST_SRID(geometry ) IS 'args: g1 - Returns the spatial reference identifier for a geometry.';
			
COMMENT ON FUNCTION ST_Transform(geometry , integer ) IS 'args: g1, srid - Return a new geometry with coordinates transformed to a different spatial reference system.';
			
COMMENT ON FUNCTION ST_Transform(geometry , text ) IS 'args: geom, to_proj - Return a new geometry with coordinates transformed to a different spatial reference system.';
			
COMMENT ON FUNCTION ST_Transform(geometry , text , text ) IS 'args: geom, from_proj, to_proj - Return a new geometry with coordinates transformed to a different spatial reference system.';
			
COMMENT ON FUNCTION ST_Transform(geometry , text , integer ) IS 'args: geom, from_proj, to_srid - Return a new geometry with coordinates transformed to a different spatial reference system.';
			
COMMENT ON FUNCTION ST_TransformPipeline(geometry , text , integer ) IS 'args: g1, pipeline, to_srid - Return a new geometry with coordinates transformed to a different spatial reference system using a defined coordinate transformation pipeline.';
			
COMMENT ON FUNCTION postgis_srs_codes(text ) IS 'args: auth_name - Return the list of SRS codes associated with the given authority.';
			
COMMENT ON FUNCTION postgis_srs(text , text ) IS 'args: auth_name, auth_srid - Return a metadata record for the requested authority and srid.';
			
COMMENT ON FUNCTION postgis_srs_all() IS 'Return metadata records for every spatial reference system in the underlying Proj database.';
			
COMMENT ON FUNCTION postgis_srs_search(geometry , text ) IS 'args: bounds, auth_name=EPSG - Return metadata records for projected coordinate systems that have areas of usage that fully contain the bounds parameter.';
			
COMMENT ON FUNCTION ST_Area(geometry ) IS 'args: g1 - Returns the area of a polygonal geometry.';
			
COMMENT ON FUNCTION ST_Area(geography , boolean ) IS 'args: geog, use_spheroid = true - Returns the area of a polygonal geometry.';
			
COMMENT ON FUNCTION ST_Azimuth(geometry , geometry ) IS 'args: origin, target - Returns the north-based azimuth of a line between two points.';
			
COMMENT ON FUNCTION ST_Azimuth(geography , geography ) IS 'args: origin, target - Returns the north-based azimuth of a line between two points.';
			
COMMENT ON FUNCTION ST_Angle(geometry , geometry , geometry , geometry ) IS 'args: point1, point2, point3, point4 - Returns the angle between two vectors defined by 3 or 4 points, or 2 lines.';
			
COMMENT ON FUNCTION ST_Angle(geometry , geometry ) IS 'args: line1, line2 - Returns the angle between two vectors defined by 3 or 4 points, or 2 lines.';
			
COMMENT ON FUNCTION ST_ClosestPoint(geometry , geometry ) IS 'args: geom1, geom2 - Returns the 2D point on g1 that is closest to g2. This is the first point of the shortest line from one geometry to the other.';
			
COMMENT ON FUNCTION ST_ClosestPoint(geography , geography , boolean ) IS 'args: geom1, geom2, use_spheroid = true - Returns the 2D point on g1 that is closest to g2. This is the first point of the shortest line from one geometry to the other.';
			
COMMENT ON FUNCTION ST_3DClosestPoint(geometry , geometry ) IS 'args: g1, g2 - Returns the 3D point on g1 that is closest to g2. This is the first point of the 3D shortest line.';
			
COMMENT ON FUNCTION ST_Distance(geometry , geometry ) IS 'args: g1, g2 - Returns the distance between two geometry or geography values.';
			
COMMENT ON FUNCTION ST_Distance(geography , geography , boolean ) IS 'args: geog1, geog2, use_spheroid = true - Returns the distance between two geometry or geography values.';
			
COMMENT ON FUNCTION ST_3DDistance(geometry , geometry ) IS 'args: g1, g2 - Returns the 3D cartesian minimum distance (based on spatial ref) between two geometries in projected units.';
			
COMMENT ON FUNCTION ST_DistanceSphere(geometry , geometry , float8 ) IS 'args: geomlonlatA, geomlonlatB, radius=6371008 - Returns minimum distance in meters between two lon/lat geometries using a spherical earth model.';
			
COMMENT ON FUNCTION ST_DistanceSpheroid(geometry , geometry , spheroid ) IS 'args: geomlonlatA, geomlonlatB, measurement_spheroid=WGS84 - Returns the minimum distance between two lon/lat geometries using a spheroidal earth model.';
			
COMMENT ON FUNCTION ST_FrechetDistance(geometry , geometry , float) IS 'args: g1, g2, densifyFrac = -1 - Returns the Fréchet distance between two geometries.';
			
COMMENT ON FUNCTION ST_HausdorffDistance(geometry , geometry ) IS 'args: g1, g2 - Returns the Hausdorff distance between two geometries.';
			
COMMENT ON FUNCTION ST_HausdorffDistance(geometry , geometry , float) IS 'args: g1, g2, densifyFrac - Returns the Hausdorff distance between two geometries.';
			
COMMENT ON FUNCTION ST_Length(geometry ) IS 'args: a_2dlinestring - Returns the 2D length of a linear geometry.';
			
COMMENT ON FUNCTION ST_Length(geography , boolean ) IS 'args: geog, use_spheroid = true - Returns the 2D length of a linear geometry.';
			
COMMENT ON FUNCTION ST_Length2D(geometry ) IS 'args: a_2dlinestring - Returns the 2D length of a linear geometry. Alias for ST_Length';
			
COMMENT ON FUNCTION ST_3DLength(geometry ) IS 'args: a_3dlinestring - Returns the 3D length of a linear geometry.';
			
COMMENT ON FUNCTION ST_LengthSpheroid(geometry , spheroid ) IS 'args: a_geometry, a_spheroid - Returns the 2D or 3D length/perimeter of a lon/lat geometry on a spheroid.';
			
COMMENT ON FUNCTION ST_LongestLine(geometry , geometry ) IS 'args: g1, g2 - Returns the 2D longest line between two geometries.';
			
COMMENT ON FUNCTION ST_3DLongestLine(geometry , geometry ) IS 'args: g1, g2 - Returns the 3D longest line between two geometries';
			
COMMENT ON FUNCTION ST_MaxDistance(geometry , geometry ) IS 'args: g1, g2 - Returns the 2D largest distance between two geometries in projected units.';
			
COMMENT ON FUNCTION ST_3DMaxDistance(geometry , geometry ) IS 'args: g1, g2 - Returns the 3D cartesian maximum distance (based on spatial ref) between two geometries in projected units.';
			
COMMENT ON FUNCTION ST_MinimumClearance(geometry ) IS 'args: g - Returns the minimum clearance of a geometry, a measure of a geometrys robustness.';
			
COMMENT ON FUNCTION ST_MinimumClearanceLine(geometry ) IS 'args: g - Returns the two-point LineString spanning a geometrys minimum clearance.';
			
COMMENT ON FUNCTION ST_Perimeter(geometry ) IS 'args: g1 - Returns the length of the boundary of a polygonal geometry or geography.';
			
COMMENT ON FUNCTION ST_Perimeter(geography , boolean ) IS 'args: geog, use_spheroid = true - Returns the length of the boundary of a polygonal geometry or geography.';
			
COMMENT ON FUNCTION ST_Perimeter2D(geometry ) IS 'args: geomA - Returns the 2D perimeter of a polygonal geometry. Alias for ST_Perimeter.';
			
COMMENT ON FUNCTION ST_3DPerimeter(geometry ) IS 'args: geomA - Returns the 3D perimeter of a polygonal geometry.';
			
COMMENT ON FUNCTION ST_ShortestLine(geometry , geometry ) IS 'args: geom1, geom2 - Returns the 2D shortest line between two geometries';
			
COMMENT ON FUNCTION ST_ShortestLine(geography , geography , boolean ) IS 'args: geom1, geom2, use_spheroid = true - Returns the 2D shortest line between two geometries';
			
COMMENT ON FUNCTION ST_3DShortestLine(geometry , geometry ) IS 'args: g1, g2 - Returns the 3D shortest line between two geometries';
			
COMMENT ON FUNCTION ST_ClipByBox2D(geometry, box2d) IS 'args: geom, box - Computes the portion of a geometry falling within a rectangle.';
			
COMMENT ON FUNCTION ST_Difference(geometry , geometry , float8 ) IS 'args: geomA, geomB, gridSize = -1 - Computes a geometry representing the part of geometry A that does not intersect geometry B.';
			
COMMENT ON FUNCTION ST_Intersection(geometry, geometry, float8) IS 'args: geomA, geomB, gridSize = -1 - Computes a geometry representing the shared portion of geometries A and B.';
			
COMMENT ON FUNCTION ST_Intersection(geography, geography) IS 'args: geogA, geogB - Computes a geometry representing the shared portion of geometries A and B.';
			
COMMENT ON AGGREGATE ST_MemUnion(geometry) IS 'args: geomfield - Aggregate function which unions geometries in a memory-efficent but slower way';
			
COMMENT ON FUNCTION ST_Node(geometry ) IS 'args: geom - Nodes a collection of lines.';
			
COMMENT ON FUNCTION ST_Split(geometry, geometry) IS 'args: input, blade - Returns a collection of geometries created by splitting a geometry by another geometry.';
			
COMMENT ON FUNCTION ST_Subdivide(geometry, integer, float8) IS 'args: geom, max_vertices=256, gridSize = -1 - Computes a rectilinear subdivision of a geometry.';
			
COMMENT ON FUNCTION ST_SymDifference(geometry , geometry , float8 ) IS 'args: geomA, geomB, gridSize = -1 - Computes a geometry representing the portions of geometries A and B that do not intersect.';
			
COMMENT ON FUNCTION ST_UnaryUnion(geometry , float8 ) IS 'args: geom, gridSize = -1 - Computes the union of the components of a single geometry.';
			
COMMENT ON FUNCTION ST_Union(geometry, geometry) IS 'args: g1, g2 - Computes a geometry representing the point-set union of the input geometries.';
			
COMMENT ON FUNCTION ST_Union(geometry, geometry, float8) IS 'args: g1, g2, gridSize - Computes a geometry representing the point-set union of the input geometries.';
			
COMMENT ON FUNCTION ST_Union(geometry[]) IS 'args: g1_array - Computes a geometry representing the point-set union of the input geometries.';
			
COMMENT ON AGGREGATE ST_Union(geometry) IS 'args: g1field - Computes a geometry representing the point-set union of the input geometries.';
			
COMMENT ON AGGREGATE ST_Union(geometry, float8) IS 'args: g1field, gridSize - Computes a geometry representing the point-set union of the input geometries.';
			
COMMENT ON FUNCTION ST_Buffer(geometry , float , text ) IS 'args: g1, radius_of_buffer, buffer_style_parameters = '' - Computes a geometry covering all points within a given distance from a geometry.';
			
COMMENT ON FUNCTION ST_Buffer(geometry , float , integer ) IS 'args: g1, radius_of_buffer, num_seg_quarter_circle - Computes a geometry covering all points within a given distance from a geometry.';
			
COMMENT ON FUNCTION ST_Buffer(geography , float , text ) IS 'args: g1, radius_of_buffer, buffer_style_parameters - Computes a geometry covering all points within a given distance from a geometry.';
			
COMMENT ON FUNCTION ST_Buffer(geography , float , integer ) IS 'args: g1, radius_of_buffer, num_seg_quarter_circle - Computes a geometry covering all points within a given distance from a geometry.';
			
COMMENT ON FUNCTION ST_BuildArea(geometry ) IS 'args: geom - Creates a polygonal geometry formed by the linework of a geometry.';
			
COMMENT ON FUNCTION ST_Centroid(geometry ) IS 'args: g1 - Returns the geometric center of a geometry.';
			
COMMENT ON FUNCTION ST_Centroid(geography , boolean ) IS 'args: g1, use_spheroid = true - Returns the geometric center of a geometry.';
			
COMMENT ON FUNCTION ST_ChaikinSmoothing(geometry, integer, boolean) IS 'args: geom, nIterations = 1, preserveEndPoints = false - Returns a smoothed version of a geometry, using the Chaikin algorithm';
			
COMMENT ON FUNCTION ST_ConcaveHull(geometry , float , boolean ) IS 'args: param_geom, param_pctconvex, param_allow_holes = false - Computes a possibly concave geometry that contains all input geometry vertices';
			
COMMENT ON FUNCTION ST_ConvexHull(geometry ) IS 'args: geomA - Computes the convex hull of a geometry.';
			
COMMENT ON FUNCTION ST_DelaunayTriangles(geometry , float , int4 ) IS 'args: g1, tolerance = 0.0, flags = 0 - Returns the Delaunay triangulation of the vertices of a geometry.';
			
COMMENT ON FUNCTION ST_FilterByM(geometry, double precision, double precision, boolean) IS 'args: geom, min, max = null, returnM = false - Removes vertices based on their M value';
			
COMMENT ON FUNCTION ST_GeneratePoints(geometry, integer, integer) IS 'args: g, npoints, seed = 0 - Generates a multipoint of random points contained in a Polygon or MultiPolygon.';
			
COMMENT ON FUNCTION ST_GeometricMedian(geometry, float8, int, boolean) IS 'args: geom, tolerance = NULL, max_iter = 10000, fail_if_not_converged = false - Returns the geometric median of a MultiPoint.';
			
COMMENT ON FUNCTION ST_LineMerge(geometry ) IS 'args: amultilinestring - Return the lines formed by sewing together a MultiLineString.';
			
COMMENT ON FUNCTION ST_LineMerge(geometry , boolean ) IS 'args: amultilinestring, directed - Return the lines formed by sewing together a MultiLineString.';
			
COMMENT ON FUNCTION ST_MaximumInscribedCircle(geometry ) IS 'args: geom - Computes the largest circle contained within a geometry.';
			
COMMENT ON FUNCTION ST_LargestEmptyCircle(geometry , double precision , geometry ) IS 'args: geom, tolerance=0.0, boundary=POINT EMPTY - Computes the largest circle not overlapping a geometry.';
			
COMMENT ON FUNCTION ST_MinimumBoundingCircle(geometry , integer ) IS 'args: geomA, num_segs_per_qt_circ=48 - Returns the smallest circle polygon that contains a geometry.';
			
COMMENT ON FUNCTION ST_MinimumBoundingRadius(geometry) IS 'args: geom - Returns the center point and radius of the smallest circle that contains a geometry.';
			
COMMENT ON FUNCTION ST_OrientedEnvelope(geometry) IS 'args: geom - Returns a minimum-area rectangle containing a geometry.';
			
COMMENT ON FUNCTION ST_OffsetCurve(geometry , float , text ) IS 'args: line, signed_distance, style_parameters='' - Returns an offset line at a given distance and side from an input line.';
			
COMMENT ON FUNCTION ST_PointOnSurface(geometry ) IS 'args: g1 - Computes a point guaranteed to lie in a polygon, or on a geometry.';
			
COMMENT ON AGGREGATE ST_Polygonize(geometry) IS 'args: geomfield - Computes a collection of polygons formed from the linework of a set of geometries.';
			
COMMENT ON FUNCTION ST_Polygonize(geometry[]) IS 'args: geom_array - Computes a collection of polygons formed from the linework of a set of geometries.';
			
COMMENT ON FUNCTION ST_ReducePrecision(geometry , float8 ) IS 'args: g, gridsize - Returns a valid geometry with points rounded to a grid tolerance.';
			
COMMENT ON FUNCTION ST_SharedPaths(geometry, geometry) IS 'args: lineal1, lineal2 - Returns a collection containing paths shared by the two input linestrings/multilinestrings.';
			
COMMENT ON FUNCTION ST_Simplify(geometry, float) IS 'args: geom, tolerance - Returns a simplified representation of a geometry, using the Douglas-Peucker algorithm.';
			
COMMENT ON FUNCTION ST_Simplify(geometry, float, boolean) IS 'args: geom, tolerance, preserveCollapsed - Returns a simplified representation of a geometry, using the Douglas-Peucker algorithm.';
			
COMMENT ON FUNCTION ST_SimplifyPreserveTopology(geometry, float) IS 'args: geom, tolerance - Returns a simplified and valid representation of a geometry, using the Douglas-Peucker algorithm.';
			
COMMENT ON FUNCTION ST_SimplifyPolygonHull(geometry , float , boolean ) IS 'args: param_geom, vertex_fraction, is_outer = true - Computes a simplifed topology-preserving outer or inner hull of a polygonal geometry.';
			
COMMENT ON FUNCTION ST_SimplifyVW(geometry, float) IS 'args: geom, tolerance - Returns a simplified representation of a geometry, using the Visvalingam-Whyatt algorithm';
			
COMMENT ON FUNCTION ST_SetEffectiveArea(geometry, float, integer) IS 'args: geom, threshold = 0, set_area = 1 - Sets the effective area for each vertex, using the Visvalingam-Whyatt algorithm.';
			
COMMENT ON FUNCTION ST_TriangulatePolygon(geometry) IS 'args: geom - Computes the constrained Delaunay triangulation of polygons';
			
COMMENT ON FUNCTION ST_VoronoiLines(geometry, float8, geometry) IS 'args: geom, tolerance = 0.0, extend_to = NULL - Returns the boundaries of the Voronoi diagram of the vertices of a geometry.';
			
COMMENT ON FUNCTION ST_VoronoiPolygons(geometry, float8, geometry) IS 'args: geom, tolerance = 0.0, extend_to = NULL - Returns the cells of the Voronoi diagram of the vertices of a geometry.';
			
COMMENT ON FUNCTION ST_CoverageInvalidEdges(geometry, float8 ) IS 'args: geom, tolerance = 0 - Window function that finds locations where polygons fail to form a valid coverage.';
			
COMMENT ON FUNCTION ST_CoverageSimplify(geometry, float8 , boolean ) IS 'args: geom, tolerance, simplifyBoundary = true - Window function that simplifies the edges of a polygonal coverage.';
			
COMMENT ON AGGREGATE ST_CoverageUnion(geometry) IS 'args: geom - Computes the union of a set of polygons forming a coverage by removing shared edges.';
			
COMMENT ON FUNCTION ST_Affine(geometry , float , float , float , float , float , float , float , float , float , float , float , float ) IS 'args: geomA, a, b, c, d, e, f, g, h, i, xoff, yoff, zoff - Apply a 3D affine transformation to a geometry.';
			
COMMENT ON FUNCTION ST_Affine(geometry , float , float , float , float , float , float ) IS 'args: geomA, a, b, d, e, xoff, yoff - Apply a 3D affine transformation to a geometry.';
			
COMMENT ON FUNCTION ST_Rotate(geometry, float) IS 'args: geomA, rotRadians - Rotates a geometry about an origin point.';
			
COMMENT ON FUNCTION ST_Rotate(geometry, float, float, float) IS 'args: geomA, rotRadians, x0, y0 - Rotates a geometry about an origin point.';
			
COMMENT ON FUNCTION ST_Rotate(geometry, float, geometry) IS 'args: geomA, rotRadians, pointOrigin - Rotates a geometry about an origin point.';
			
COMMENT ON FUNCTION ST_RotateX(geometry, float) IS 'args: geomA, rotRadians - Rotates a geometry about the X axis.';
			
COMMENT ON FUNCTION ST_RotateY(geometry, float) IS 'args: geomA, rotRadians - Rotates a geometry about the Y axis.';
			
COMMENT ON FUNCTION ST_RotateZ(geometry, float) IS 'args: geomA, rotRadians - Rotates a geometry about the Z axis.';
			
COMMENT ON FUNCTION ST_Scale(geometry , float, float, float) IS 'args: geomA, XFactor, YFactor, ZFactor - Scales a geometry by given factors.';
			
COMMENT ON FUNCTION ST_Scale(geometry , float, float) IS 'args: geomA, XFactor, YFactor - Scales a geometry by given factors.';
			
COMMENT ON FUNCTION ST_Scale(geometry , geometry) IS 'args: geom, factor - Scales a geometry by given factors.';
			
COMMENT ON FUNCTION ST_Scale(geometry , geometry, geometry) IS 'args: geom, factor, origin - Scales a geometry by given factors.';
			
COMMENT ON FUNCTION ST_Translate(geometry , float , float ) IS 'args: g1, deltax, deltay - Translates a geometry by given offsets.';
			
COMMENT ON FUNCTION ST_Translate(geometry , float , float , float ) IS 'args: g1, deltax, deltay, deltaz - Translates a geometry by given offsets.';
			
COMMENT ON FUNCTION ST_TransScale(geometry , float, float, float, float) IS 'args: geomA, deltaX, deltaY, XFactor, YFactor - Translates and scales a geometry by given offsets and factors.';
			
COMMENT ON FUNCTION ST_ClusterDBSCAN(geometry, float8 , integer ) IS 'args: geom, eps, minpoints - Window function that returns a cluster id for each input geometry using the DBSCAN algorithm.';
			
COMMENT ON AGGREGATE ST_ClusterIntersecting(geometry) IS 'args: g - Aggregate function that clusters input geometries into connected sets.';
			
COMMENT ON FUNCTION ST_ClusterIntersectingWin(geometry) IS 'args: geom - Window function that returns a cluster id for each input geometry, clustering input geometries into connected sets.';
			
COMMENT ON FUNCTION ST_ClusterKMeans(geometry, integer , float ) IS 'args: geom, number_of_clusters, max_radius - Window function that returns a cluster id for each input geometry using the K-means algorithm.';
			
COMMENT ON AGGREGATE ST_ClusterWithin(geometry, float8 ) IS 'args: g, distance - Aggregate function that clusters geometries by separation distance.';
			
COMMENT ON FUNCTION ST_ClusterWithinWin(geometry, float8 ) IS 'args: geom, distance - Window function that returns a cluster id for each input geometry, clustering using separation distance.';
			
COMMENT ON FUNCTION Box2D(geometry ) IS 'args: geom - Returns a BOX2D representing the 2D extent of a geometry.';
			
COMMENT ON FUNCTION Box3D(geometry ) IS 'args: geom - Returns a BOX3D representing the 3D extent of a geometry.';
			
COMMENT ON FUNCTION ST_EstimatedExtent(text , text , text , boolean ) IS 'args: schema_name, table_name, geocolumn_name, parent_only - Returns the estimated extent of a spatial table.';
			
COMMENT ON FUNCTION ST_EstimatedExtent(text , text , text ) IS 'args: schema_name, table_name, geocolumn_name - Returns the estimated extent of a spatial table.';
			
COMMENT ON FUNCTION ST_EstimatedExtent(text , text ) IS 'args: table_name, geocolumn_name - Returns the estimated extent of a spatial table.';
			
COMMENT ON FUNCTION ST_Expand(geometry , float) IS 'args: geom, units_to_expand - Returns a bounding box expanded from another bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_Expand(geometry , float, float, float, float) IS 'args: geom, dx, dy, dz=0, dm=0 - Returns a bounding box expanded from another bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_Expand(box2d , float) IS 'args: box, units_to_expand - Returns a bounding box expanded from another bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_Expand(box2d , float, float) IS 'args: box, dx, dy - Returns a bounding box expanded from another bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_Expand(box3d , float) IS 'args: box, units_to_expand - Returns a bounding box expanded from another bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_Expand(box3d , float, float, float) IS 'args: box, dx, dy, dz=0 - Returns a bounding box expanded from another bounding box or a geometry.';
			
COMMENT ON AGGREGATE ST_Extent(geometry) IS 'args: geomfield - Aggregate function that returns the bounding box of geometries.';
			
COMMENT ON AGGREGATE ST_3DExtent(geometry) IS 'args: geomfield - Aggregate function that returns the 3D bounding box of geometries.';
			
COMMENT ON FUNCTION ST_MakeBox2D(geometry , geometry ) IS 'args: pointLowLeft, pointUpRight - Creates a BOX2D defined by two 2D point geometries.';
			
COMMENT ON FUNCTION ST_3DMakeBox(geometry , geometry ) IS 'args: point3DLowLeftBottom, point3DUpRightTop - Creates a BOX3D defined by two 3D point geometries.';
			
COMMENT ON FUNCTION ST_XMax(box3d ) IS 'args: aGeomorBox2DorBox3D - Returns the X maxima of a 2D or 3D bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_XMin(box3d ) IS 'args: aGeomorBox2DorBox3D - Returns the X minima of a 2D or 3D bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_YMax(box3d ) IS 'args: aGeomorBox2DorBox3D - Returns the Y maxima of a 2D or 3D bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_YMin(box3d ) IS 'args: aGeomorBox2DorBox3D - Returns the Y minima of a 2D or 3D bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_ZMax(box3d ) IS 'args: aGeomorBox2DorBox3D - Returns the Z maxima of a 2D or 3D bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_ZMin(box3d ) IS 'args: aGeomorBox2DorBox3D - Returns the Z minima of a 2D or 3D bounding box or a geometry.';
			
COMMENT ON FUNCTION ST_LineInterpolatePoint(geometry , float8 ) IS 'args: a_linestring, a_fraction - Returns a point interpolated along a line at a fractional location.';
			
COMMENT ON FUNCTION ST_LineInterpolatePoint(geography , float8 , boolean ) IS 'args: a_linestring, a_fraction, use_spheroid = true - Returns a point interpolated along a line at a fractional location.';
			
COMMENT ON FUNCTION ST_3DLineInterpolatePoint(geometry , float8 ) IS 'args: a_linestring, a_fraction - Returns a point interpolated along a 3D line at a fractional location.';
			
COMMENT ON FUNCTION ST_LineInterpolatePoints(geometry , float8 , boolean ) IS 'args: a_linestring, a_fraction, repeat - Returns points interpolated along a line at a fractional interval.';
			
COMMENT ON FUNCTION ST_LineInterpolatePoints(geography , float8 , boolean , boolean ) IS 'args: a_linestring, a_fraction, use_spheroid = true, repeat = true - Returns points interpolated along a line at a fractional interval.';
			
COMMENT ON FUNCTION ST_LineLocatePoint(geometry , geometry ) IS 'args: a_linestring, a_point - Returns the fractional location of the closest point on a line to a point.';
			
COMMENT ON FUNCTION ST_LineLocatePoint(geography , geography , boolean ) IS 'args: a_linestring, a_point, use_spheroid = true - Returns the fractional location of the closest point on a line to a point.';
			
COMMENT ON FUNCTION ST_LineSubstring(geometry , float8 , float8 ) IS 'args: a_linestring, startfraction, endfraction - Returns the part of a line between two fractional locations.';
			
COMMENT ON FUNCTION ST_LineSubstring(geography , float8 , float8 ) IS 'args: a_linestring, startfraction, endfraction - Returns the part of a line between two fractional locations.';
			
COMMENT ON FUNCTION ST_LocateAlong(geometry , float8 , float8 ) IS 'args: geom_with_measure, measure, offset = 0 - Returns the point(s) on a geometry that match a measure value.';
			
COMMENT ON FUNCTION ST_LocateBetween(geometry , float8 , float8 , float8 ) IS 'args: geom, measure_start, measure_end, offset = 0 - Returns the portions of a geometry that match a measure range.';
			
COMMENT ON FUNCTION ST_LocateBetweenElevations(geometry , float8 , float8 ) IS 'args: geom, elevation_start, elevation_end - Returns the portions of a geometry that lie in an elevation (Z) range.';
			
COMMENT ON FUNCTION ST_InterpolatePoint(geometry , geometry ) IS 'args: linear_geom_with_measure, point - Returns the interpolated measure of a geometry closest to a point.';
			
COMMENT ON FUNCTION ST_AddMeasure(geometry , float8 , float8 ) IS 'args: geom_mline, measure_start, measure_end - Interpolates measures along a linear geometry.';
			
COMMENT ON FUNCTION ST_IsValidTrajectory(geometry ) IS 'args: line - Tests if the geometry is a valid trajectory.';
			
COMMENT ON FUNCTION ST_ClosestPointOfApproach(geometry , geometry ) IS 'args: track1, track2 - Returns a measure at the closest point of approach of two trajectories.';
			
COMMENT ON FUNCTION ST_DistanceCPA(geometry , geometry ) IS 'args: track1, track2 - Returns the distance between the closest point of approach of two trajectories.';
			
COMMENT ON FUNCTION ST_CPAWithin(geometry , geometry , float8 ) IS 'args: track1, track2, dist - Tests if the closest point of approach of two trajectoriesis within the specified distance.';
			
COMMENT ON FUNCTION PostGIS_Extensions_Upgrade(text) IS 'args: target_version=null - Packages and upgrades PostGIS extensions (e.g. postgis_raster,postgis_topology, postgis_sfcgal) to given or latest version.';
			
COMMENT ON FUNCTION PostGIS_Full_Version() IS 'Reports full PostGIS version and build configuration infos.';
			
COMMENT ON FUNCTION PostGIS_GEOS_Version() IS 'Returns the version number of the GEOS library.';
			
COMMENT ON FUNCTION PostGIS_GEOS_Compiled_Version() IS 'Returns the version number of the GEOS library against which PostGIS was built.';
			
COMMENT ON FUNCTION PostGIS_Liblwgeom_Version() IS 'Returns the version number of the liblwgeom library. This should match the version of PostGIS.';
			
COMMENT ON FUNCTION PostGIS_LibXML_Version() IS 'Returns the version number of the libxml2 library.';
			
COMMENT ON FUNCTION PostGIS_LibJSON_Version() IS 'Returns the version number of the libjson-c library.';
			
COMMENT ON FUNCTION PostGIS_Lib_Build_Date() IS 'Returns build date of the PostGIS library.';
			
COMMENT ON FUNCTION PostGIS_Lib_Version() IS 'Returns the version number of the PostGIS library.';
			
COMMENT ON FUNCTION PostGIS_PROJ_Version() IS 'Returns the version number of the PROJ4 library.';
			
COMMENT ON FUNCTION PostGIS_PROJ_Compiled_Version() IS 'Returns the version number of the PROJ library against which PostGIS was built.';
			
COMMENT ON FUNCTION PostGIS_Wagyu_Version() IS 'Returns the version number of the internal Wagyu library.';
			
COMMENT ON FUNCTION PostGIS_Scripts_Build_Date() IS 'Returns build date of the PostGIS scripts.';
			
COMMENT ON FUNCTION PostGIS_Scripts_Installed() IS 'Returns version of the PostGIS scripts installed in this database.';
			
COMMENT ON FUNCTION PostGIS_Scripts_Released() IS 'Returns the version number of the postgis.sql script released with the installed PostGIS lib.';
			
COMMENT ON FUNCTION PostGIS_Version() IS 'Returns PostGIS version number and compile-time options.';
			
COMMENT ON FUNCTION PostGIS_AddBBox(geometry ) IS 'args: geomA - Add bounding box to the geometry.';
			
COMMENT ON FUNCTION PostGIS_DropBBox(geometry ) IS 'args: geomA - Drop the bounding box cache from the geometry.';
			
COMMENT ON FUNCTION PostGIS_HasBBox(geometry ) IS 'args: geomA - Returns TRUE if the bbox of this geometry is cached, FALSE otherwise.';
			