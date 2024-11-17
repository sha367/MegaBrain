
COMMENT ON FUNCTION postgis_sfcgal_version() IS 'Returns the version of SFCGAL in use';
			
COMMENT ON FUNCTION postgis_sfcgal_full_version() IS 'Returns the full version of SFCGAL in use including CGAL and Boost versions';
			
COMMENT ON FUNCTION CG_ForceLHR(geometry) IS 'args: geom - Force LHR orientation';
			
COMMENT ON FUNCTION CG_IsPlanar(geometry) IS 'args: geom - Check if a surface is or not planar';
			
COMMENT ON FUNCTION CG_IsSolid(geometry) IS 'args: geom1 - Test if the geometry is a solid. No validity check is performed.';
			
COMMENT ON FUNCTION CG_MakeSolid(geometry) IS 'args: geom1 - Cast the geometry into a solid. No check is performed. To obtain a valid solid, the input geometry must be a closed Polyhedral Surface or a closed TIN.';
			
COMMENT ON FUNCTION CG_Orientation(geometry) IS 'args: geom - Determine surface orientation';
			
COMMENT ON FUNCTION CG_Area(geometry) IS 'args: geom - Calculates the area of a geometry';
			
COMMENT ON FUNCTION CG_3DArea(geometry) IS 'args: geom1 - Computes area of 3D surface geometries. Will return 0 for solids.';
			
COMMENT ON FUNCTION CG_Volume(geometry) IS 'args: geom1 - Computes the volume of a 3D solid. If applied to surface (even closed) geometries will return 0.';
			
COMMENT ON FUNCTION ST_ForceLHR(geometry) IS 'args: geom - Force LHR orientation';
			
COMMENT ON FUNCTION ST_IsPlanar(geometry) IS 'args: geom - Check if a surface is or not planar';
			
COMMENT ON FUNCTION ST_IsSolid(geometry) IS 'args: geom1 - Test if the geometry is a solid. No validity check is performed.';
			
COMMENT ON FUNCTION ST_MakeSolid(geometry) IS 'args: geom1 - Cast the geometry into a solid. No check is performed. To obtain a valid solid, the input geometry must be a closed Polyhedral Surface or a closed TIN.';
			
COMMENT ON FUNCTION ST_Orientation(geometry) IS 'args: geom - Determine surface orientation';
			
COMMENT ON FUNCTION ST_3DArea(geometry) IS 'args: geom1 - Computes area of 3D surface geometries. Will return 0 for solids.';
			
COMMENT ON FUNCTION ST_Volume(geometry) IS 'args: geom1 - Computes the volume of a 3D solid. If applied to surface (even closed) geometries will return 0.';
			
COMMENT ON FUNCTION CG_Intersection(geometry, geometry) IS 'args: geomA, geomB - Computes the intersection of two geometries';
			
COMMENT ON FUNCTION CG_Intersects(geometry, geometry) IS 'args: geomA, geomB - Tests if two geometries intersect (they have at least one point in common)';
			
COMMENT ON FUNCTION CG_3DIntersects(geometry, geometry) IS 'args: geomA, geomB - Tests if two 3D geometries intersect';
			
COMMENT ON FUNCTION CG_Difference(geometry, geometry) IS 'args: geomA, geomB - Computes the geometric difference between two geometries';
			
COMMENT ON FUNCTION ST_3DDifference(geometry, geometry) IS 'args: geom1, geom2 - Perform 3D difference';
			
COMMENT ON FUNCTION CG_3DDifference(geometry, geometry) IS 'args: geom1, geom2 - Perform 3D difference';
			
COMMENT ON FUNCTION CG_Distance(geometry, geometry) IS 'args: geomA, geomB - Computes the minimum distance between two geometries';
			
COMMENT ON FUNCTION CG_3DDistance(geometry, geometry) IS 'args: geomA, geomB - Computes the minimum 3D distance between two geometries';
			
COMMENT ON FUNCTION ST_3DConvexHull(geometry) IS 'args: geom1 - Computes the 3D convex hull of a geometry.';
			
COMMENT ON FUNCTION CG_3DConvexHull(geometry) IS 'args: geom1 - Computes the 3D convex hull of a geometry.';
			
COMMENT ON FUNCTION ST_3DIntersection(geometry, geometry) IS 'args: geom1, geom2 - Perform 3D intersection';
			
COMMENT ON FUNCTION CG_3DIntersection(geometry, geometry) IS 'args: geom1, geom2 - Perform 3D intersection';
			
COMMENT ON FUNCTION CG_Union(geometry, geometry) IS 'args: geomA, geomB - Computes the union of two geometries';
			
COMMENT ON FUNCTION ST_3DUnion(geometry, geometry) IS 'args: geom1, geom2 - Perform 3D union.';
			
COMMENT ON AGGREGATE ST_3DUnion(geometry) IS 'args: g1field - Perform 3D union.';
			
COMMENT ON FUNCTION CG_3DUnion(geometry, geometry) IS 'args: geom1, geom2 - Perform 3D union using postgis_sfcgal.';
			
COMMENT ON AGGREGATE CG_3DUnion(geometry) IS 'args: g1field - Perform 3D union using postgis_sfcgal.';
			
COMMENT ON FUNCTION ST_AlphaShape(geometry, float , boolean ) IS 'args: geom, alpha, allow_holes = false - Computes an Alpha-shape enclosing a geometry';
			
COMMENT ON FUNCTION CG_AlphaShape(geometry, float , boolean ) IS 'args: geom, alpha, allow_holes = false - Computes an Alpha-shape enclosing a geometry';
			
COMMENT ON FUNCTION CG_ApproxConvexPartition(geometry) IS 'args: geom - Computes approximal convex partition of the polygon geometry';
			
COMMENT ON FUNCTION ST_ApproximateMedialAxis(geometry) IS 'args: geom - Compute the approximate medial axis of an areal geometry.';
			
COMMENT ON FUNCTION CG_ApproximateMedialAxis(geometry) IS 'args: geom - Compute the approximate medial axis of an areal geometry.';
			
COMMENT ON FUNCTION ST_ConstrainedDelaunayTriangles(geometry ) IS 'args: g1 - Return a constrained Delaunay triangulation around the given input geometry.';
			
COMMENT ON FUNCTION CG_ConstrainedDelaunayTriangles(geometry ) IS 'args: g1 - Return a constrained Delaunay triangulation around the given input geometry.';
			
COMMENT ON FUNCTION ST_Extrude(geometry, float, float, float) IS 'args: geom, x, y, z - Extrude a surface to a related volume';
			
COMMENT ON FUNCTION CG_Extrude(geometry, float, float, float) IS 'args: geom, x, y, z - Extrude a surface to a related volume';
			
COMMENT ON FUNCTION CG_ExtrudeStraightSkeleton(geometry, float , float ) IS 'args: geom, roof_height, body_height = 0 - Straight Skeleton Extrusion';
			
COMMENT ON FUNCTION CG_GreeneApproxConvexPartition(geometry) IS 'args: geom - Computes approximal convex partition of the polygon geometry';
			
COMMENT ON FUNCTION ST_MinkowskiSum(geometry, geometry) IS 'args: geom1, geom2 - Performs Minkowski sum';
			
COMMENT ON FUNCTION CG_MinkowskiSum(geometry, geometry) IS 'args: geom1, geom2 - Performs Minkowski sum';
			
COMMENT ON FUNCTION ST_OptimalAlphaShape(geometry, boolean , integer ) IS 'args: geom, allow_holes = false, nb_components = 1 - Computes an Alpha-shape enclosing a geometry using an "optimal" alpha value.';
			
COMMENT ON FUNCTION CG_OptimalAlphaShape(geometry, boolean , integer ) IS 'args: geom, allow_holes = false, nb_components = 1 - Computes an Alpha-shape enclosing a geometry using an "optimal" alpha value.';
			
COMMENT ON FUNCTION CG_OptimalConvexPartition(geometry) IS 'args: geom - Computes an optimal convex partition of the polygon geometry';
			
COMMENT ON FUNCTION CG_StraightSkeleton(geometry, boolean ) IS 'args: geom, use_distance_as_m = false - Compute a straight skeleton from a geometry';
			
COMMENT ON FUNCTION ST_StraightSkeleton(geometry) IS 'args: geom - Compute a straight skeleton from a geometry';
			
COMMENT ON FUNCTION ST_Tesselate(geometry) IS 'args: geom - Perform surface Tessellation of a polygon or polyhedralsurface and returns as a TIN or collection of TINS';
			
COMMENT ON FUNCTION CG_Tesselate(geometry) IS 'args: geom - Perform surface Tessellation of a polygon or polyhedralsurface and returns as a TIN or collection of TINS';
			
COMMENT ON FUNCTION CG_Triangulate(geometry) IS 'args: geom - Triangulates a polygonal geometry';
			
COMMENT ON FUNCTION CG_Visibility(geometry, geometry) IS 'args: polygon, point - Compute a visibility polygon from a point or a segment in a polygon geometry';
			
COMMENT ON FUNCTION CG_Visibility(geometry, geometry, geometry) IS 'args: polygon, pointA, pointB - Compute a visibility polygon from a point or a segment in a polygon geometry';
			
COMMENT ON FUNCTION CG_YMonotonePartition(geometry) IS 'args: geom - Computes y-monotone partition of the polygon geometry';
			