// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_CAPI_H_
#define SFCGAL_CAPI_H_

#include "SFCGAL/config.h"
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

// TODO : return of errors ! => error handler

/**
 *
 * Minimal C API for SFCGAL
 *
 */

/*--------------------------------------------------------------------------------------*
 *
 * Support for SFCGAL::Geometry class hierarchy
 *
 *--------------------------------------------------------------------------------------*/

/**
 * sfcgal_geometry_t is an opaque pointer type that is used to represent a
 * pointer to SFCGAL::Geometry
 * @ingroup capi
 */
typedef void sfcgal_geometry_t;

/**
 * Geometric types
 * @ingroup capi
 */
typedef enum {
  //     TYPE_GEOMETRY            = 0, //abstract
  SFCGAL_TYPE_POINT              = 1,
  SFCGAL_TYPE_LINESTRING         = 2,
  SFCGAL_TYPE_POLYGON            = 3,
  SFCGAL_TYPE_MULTIPOINT         = 4,
  SFCGAL_TYPE_MULTILINESTRING    = 5,
  SFCGAL_TYPE_MULTIPOLYGON       = 6,
  SFCGAL_TYPE_GEOMETRYCOLLECTION = 7,
  //     TYPE_CIRCULARSTRING      = 8,
  //     TYPE_COMPOUNDCURVE       = 9,
  //     TYPE_CURVEPOLYGON        = 10,
  //     TYPE_MULTICURVE          = 11, //abstract
  //     TYPE_MULTISURFACE        = 12, //abstract
  //     TYPE_CURVE               = 13, //abstract
  //     TYPE_SURFACE             = 14, //abstract
  SFCGAL_TYPE_POLYHEDRALSURFACE   = 15,
  SFCGAL_TYPE_TRIANGULATEDSURFACE = 16,
  SFCGAL_TYPE_TRIANGLE            = 17,

  //-- not official codes
  SFCGAL_TYPE_SOLID      = 101,
  SFCGAL_TYPE_MULTISOLID = 102
} sfcgal_geometry_type_t;

/**
 * Set the geometry validation mode
 * @ingroup capi
 * @note obsolete
 */
SFCGAL_API void
sfcgal_set_geometry_validation(int enabled);

/**
 * Returns the type of a given geometry
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_type_t
sfcgal_geometry_type_id(const sfcgal_geometry_t *);

/**
 * Tests if the given geometry is valid or not
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_is_valid(const sfcgal_geometry_t *);

/**
 * Tests if the given geometry is valid or not
 * And return details in case of invalidity
 * @param geom the input geometry
 * @param invalidity_reason input/output parameter. If non null, a
 * null-terminated string could be allocated and contain reason of the
 * invalidity
 * @param invalidity_location input/output parameter. If non null, a geometry
 * could be allocated and contain the location of the invalidity
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_is_valid_detail(const sfcgal_geometry_t *geom,
                                char                   **invalidity_reason,
                                sfcgal_geometry_t      **invalidity_location);

/**
 * Tests if the given geometry is 3D or not
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_is_3d(const sfcgal_geometry_t *);

/**
 * Tests if the given geometry is measured (has an m) or not
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_is_measured(const sfcgal_geometry_t *);

/**
 * Tests if the given geometry is empty or not
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_is_empty(const sfcgal_geometry_t *);

/**
 * Returns a deep clone of the given geometry
 * @post returns a pointer to an allocated geometry that must be deallocated by
 * @ref sfcgal_geometry_delete
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_clone(const sfcgal_geometry_t *);

/**
 * Deletes a given geometry
 * @pre the given pointer must have been previously allocated by a creation
 * function
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_delete(sfcgal_geometry_t *);

/**
 * Returns a WKT representation of the given geometry using CGAL exact integer
 * fractions as coordinate values
 * @post buffer is returned allocated and must be freed by the caller
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_text(const sfcgal_geometry_t *, char **buffer, size_t *len);

/**
 * Returns a WKT representation of the given geometry using floating point
 * coordinate values. Floating point precision can be set via the numDecimals
 * parameter. Setting numDecimals to -1 yields the same result as
 * sfcgal_geometry_as_text.
 * @post buffer is returned allocated and must be freed by the caller
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_text_decim(const sfcgal_geometry_t *, int numDecimals,
                              char **buffer, size_t *len);

/**
 * Returns a WKB representation of the given geometry
 * @post buffer is returned allocated and must be freed by the caller
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_wkb(const sfcgal_geometry_t *, char **buffer, size_t *len);

/**
 * Returns a WKB representation as hexadecimal of the given geometry
 * @post buffer is returned allocated and must be freed by the caller
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_hexwkb(const sfcgal_geometry_t *, char **buffer,
                          size_t *len);

/**
 * Creates a VTK string of the given geometry
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_vtk(const sfcgal_geometry_t *, char **buffer, size_t *len);

/**
 * Creates a VTK file of the given geometry
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_vtk_file(const sfcgal_geometry_t *, const char *filename);

/**
 * Creates a OBJ file of the given geometry
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_obj_file(const sfcgal_geometry_t *, const char *filename);

/**
 * Creates a OBJ string of the given geometry
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_as_obj(const sfcgal_geometry_t *, char **buffer, size_t *len);

/**
 * Creates an empty point
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_point_create();

/**
 * Creates a point from two X and Y coordinates
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_point_create_from_xy(double x, double y);

/**
 * Creates a point from three X, Y and Z coordinates
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_point_create_from_xyz(double x, double y, double z);

/**
 * Creates a point from three X, Y and M coordinates
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_point_create_from_xym(double x, double y, double m);

/**
 * Creates a point from four X, Y, Z and M coordinates
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_point_create_from_xyzm(double x, double y, double z, double m);

/**
 * Returns the X coordinate of the given Point
 * @pre the given geometry must be a Point
 * @pre the given point must not be empty
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_point_x(const sfcgal_geometry_t *);

/**
 * Returns the Y coordinate of the given Point
 * @pre the given geometry must be a Point
 * @pre the given point must not be empty
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_point_y(const sfcgal_geometry_t *);

/**
 * Returns the Z coordinate of the given Point
 * @pre the given geometry must be a Point
 * @pre the given point must not be empty
 * @post the Z coordinate can value NaN if the given point is 2D only
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_point_z(const sfcgal_geometry_t *);

/**
 * Returns the M coordinate of the given Point
 * @pre the given geometry must be a Point
 * @pre the given point must not be empty
 * @post the M coordinate can value NaN if the given point has no m
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_point_m(const sfcgal_geometry_t *);

/**
 * Creates an empty LineString
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_linestring_create();

/**
 * Returns the number of points of the given LineString
 * @pre linestring must be a LineString
 * @ingroup capi
 */
SFCGAL_API size_t
sfcgal_linestring_num_points(const sfcgal_geometry_t *linestring);

/**
 * Returns the ith point of a given LineString
 * @param i is the point index in the LineString
 * @pre linestring must be a LineString
 * @pre i >= and i < sfcgal_linestring_num_points
 * @post the returned Point is not writable and must not be deallocated by the
 * caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_linestring_point_n(const sfcgal_geometry_t *linestring, size_t i);

/**
 * Adds a point to a LineString
 * @param linestring is the LineString where the Point has to be added to
 * @param point is the Point to add to the given LineString
 * @pre i >= and i < sfcgal_linestring_num_points
 * @post the ownership of Point is taken by the function
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_linestring_add_point(sfcgal_geometry_t *linestring,
                            sfcgal_geometry_t *point);

/**
 * Creates an empty Triangle
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_triangle_create();

/**
 * Creates a Triangle from three given Point
 * @pre pta must be a Triangle
 * @pre ptb must be a Triangle
 * @pre ptc must be a Triangle
 * @post the ownership of the three points are not taken. The caller is still
 * responsible of their deallocation
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_triangle_create_from_points(const sfcgal_geometry_t *pta,
                                   const sfcgal_geometry_t *ptb,
                                   const sfcgal_geometry_t *ptc);

/**
 * Returns one the Triangle's vertex as a Point
 * @pre triangle must be a Triangle
 * @pre i >= 0 and i < 3
 * @post returns a pointer to one of the vertices as a Point. This pointer is
 * not writable and must not be deallocated by the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_triangle_vertex(const sfcgal_geometry_t *triangle, int i);

/**
 * Sets one vertex of a Triangle
 * @pre triangle must be a Triangle
 * @pre vertex must be a Point
 * @post returns a pointer to one of the vertices as a Point. This pointer is
 * not writable and must not be deallocated by the caller
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_triangle_set_vertex(sfcgal_geometry_t *triangle, int i,
                           const sfcgal_geometry_t *vertex);

/**
 * Sets one vertex of a Triangle from two coordinates
 * @pre triangle must be a Triangle
 * @pre i >= 0 and i < 3
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_triangle_set_vertex_from_xy(sfcgal_geometry_t *triangle, int i, double x,
                                   double y);

/**
 * Sets one vertex of a Triangle from three coordinates
 * @pre triangle must be a Triangle
 * @pre i >= 0 and i < 3
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_triangle_set_vertex_from_xyz(sfcgal_geometry_t *triangle, int i,
                                    double x, double y, double z);

/**
 * Creates an empty Polygon
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_polygon_create();

/**
 * Creates an empty Polygon from an extrior ring
 * @pre ring must be a LineString
 * @post the ownership of the given ring is taken. The caller is not responsible
 * anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_polygon_create_from_exterior_ring(sfcgal_geometry_t *ring);

/**
 * Returns the exterior ring of a given Polygon
 * @pre polygon must be a Polygon
 * @pre polygon must not be empty
 * @post the returned ring is a LineString, is not writable and must not be
 * deallocated by the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_polygon_exterior_ring(const sfcgal_geometry_t *polygon);

/**
 * Returns the number of interior rings of a given Polygon
 * @pre polygon must be a Polygon
 * @ingroup capi
 */
SFCGAL_API size_t
sfcgal_polygon_num_interior_rings(const sfcgal_geometry_t *polygon);

/**
 * Returns the ith interior ring of a given Polygon
 * @pre polygon must be a Polygon
 * @pre i >= 0 and i < sfcgal_polygon_num_interior_rings
 * @post the returned ring is a LineString, is not writable and must not be
 * deallocated by the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_polygon_interior_ring_n(const sfcgal_geometry_t *polygon, size_t i);

/**
 * Adds an interior ring to a given Polygon
 * @pre polygon must be a Polygon
 * @pre ring must be a LineString
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_polygon_add_interior_ring(sfcgal_geometry_t *polygon,
                                 sfcgal_geometry_t *ring);

/**
 * Creates an empty  GeometryCollection
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_collection_create();

/**
 * Returns the number of geometries of a given GeometryCollection
 * @pre collection is a GeometryCollection
 * @ingroup capi
 */
SFCGAL_API size_t
sfcgal_geometry_collection_num_geometries(const sfcgal_geometry_t *collection);

/**
 * Returns the ith geometry of a GeometryCollection
 * @pre collection is a GeometryCollection
 * @pre i >= 0 and i < sfcgal_geometry_collection_num_geometries
 * @post the returned Geometry is not writable and must not be deallocated by
 * the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_geometry_collection_geometry_n(const sfcgal_geometry_t *collection,
                                      size_t                   i);

/**
 * Adds a Geometry to a given GeometryCollection
 * @pre collection must be a GeometryCollection
 * @post the ownership of the given geometry is taken. The caller is not
 * responsible anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_geometry_collection_add_geometry(sfcgal_geometry_t *collection,
                                        sfcgal_geometry_t *geometry);

/**
 * Creates an empty MultiPoint
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_multi_point_create();

/**
 * Creates an empty MultiLineString
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_multi_linestring_create();

/**
 * Creates an empty MultiPolygon
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_multi_polygon_create();

/**
 * Creates an empty MultiSolid
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_multi_solid_create();

/**
 * Creates an empty PolyhedralSurface
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_polyhedral_surface_create();

/**
 * Returns the number of polygons of a given PolyhedralSurface
 * @pre polyhedral must be a PolyhedralSurface
 * @ingroup capi
 */
SFCGAL_API size_t
sfcgal_polyhedral_surface_num_polygons(const sfcgal_geometry_t *polyhedral);

/**
 * Returns the ith polygon of a given PolyhedralSurface
 * @pre polyhedral must be a PolyhedralSurface
 * @pre i >= 0 and i < sfcgal_polyhedral_surface_num_polygons(polyhedral)
 * @post the returned Polygon is not writable and must not be deallocated by the
 * caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_polyhedral_surface_polygon_n(const sfcgal_geometry_t *polyhedral,
                                    size_t                   i);

/**
 * Adds a Polygon to a given PolyhedralSurface
 * @pre polyhedral must be a PolyhedralSurface
 * @pre polygon must be a Polygon
 * @post the ownership of the Polygon is taken. The caller is not responsible
 * anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_polyhedral_surface_add_polygon(sfcgal_geometry_t *polyhedral,
                                      sfcgal_geometry_t *polygon);

/**
 * Creates an empty TriangulatedSurface
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_triangulated_surface_create();

/**
 * Returns the number of triangles of a given TriangulatedSurface
 * @pre tin must be a TriangulatedSurface
 * @ingroup capi
 */
SFCGAL_API size_t
sfcgal_triangulated_surface_num_triangles(const sfcgal_geometry_t *tin);

/**
 * Returns the ith Triangle of a given TriangulatedSurface
 * @pre tin must be a TriangulatedSurface
 * @pre i >= 0 and i < sfcgal_triangulated_surface_num_triangles( tin )
 * @post the returned Triangle is not writable and must not be deallocated by
 * the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_triangulated_surface_triangle_n(const sfcgal_geometry_t *tin, size_t i);

/**
 * Adds a Triangle to a given TriangulatedSurface
 * @pre tin must be a TriangulatedSurface
 * @pre triangle must be a Triangle
 * @post the ownership of the Triangle is taken. The caller is not responsible
 * anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_triangulated_surface_add_triangle(sfcgal_geometry_t *tin,
                                         sfcgal_geometry_t *triangle);

/**
 * Creates an empty Solid
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_solid_create();

/**
 * Creates a Solid from an exterior shell
 * @pre ring must be a PolyhedralSurface
 * @post the ownership of the given shell is taken. The caller is not
 * responsible anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_solid_create_from_exterior_shell(sfcgal_geometry_t *shell);

/**
 * Returns the number of shells of a given Solid
 * @pre solid must be a Solid
 * @ingroup capi
 */
SFCGAL_API size_t
sfcgal_solid_num_shells(const sfcgal_geometry_t *solid);

/**
 * Returns the ith shell of a given Solid
 * @pre solid must be a Solid
 * @pre i >= 0 and i < sfcgal_solid_num_shells( tin )
 * @post the returned PolyhedralSurface is not writable and must not be
 * deallocated by the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_solid_shell_n(const sfcgal_geometry_t *solid, size_t i);

/**
 * Adds a shell to a given Solid
 * @pre solid must be a Solid
 * @pre shell must be a PolyhedralSurface
 * @post the ownership of the shell is taken. The caller is not responsible
 * anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_solid_add_interior_shell(sfcgal_geometry_t *solid,
                                sfcgal_geometry_t *shell);

/**
 * Gets the validity flag of the geometry.
 */
SFCGAL_API int
sfcgal_geometry_has_validity_flag(const sfcgal_geometry_t *geom);

/**
 * Sets the validity flag of the geometry.
 * FIXME We better have geometry constructors to directly build valid geometries
 */
SFCGAL_API void
sfcgal_geometry_force_valid(sfcgal_geometry_t *geom, int valid);

/*--------------------------------------------------------------------------------------*
 *
 * Support for SFCGAL::PreparedGeometry
 *
 *--------------------------------------------------------------------------------------*/

/**
 * Opaque type that represents the C++ type SFCGAL::PreparedGeometry
 * @ingroup capi
 */
typedef void sfcgal_prepared_geometry_t;

typedef uint32_t srid_t;

/**
 * Creates an empty PreparedGeometry
 * @ingroup capi
 */
SFCGAL_API sfcgal_prepared_geometry_t *
sfcgal_prepared_geometry_create();

/**
 * Creates a PreparedGeometry from a Geometry and an SRID
 * @ingroup capi
 */
SFCGAL_API sfcgal_prepared_geometry_t *
sfcgal_prepared_geometry_create_from_geometry(sfcgal_geometry_t *geometry,
                                              srid_t             srid);

/**
 * Deletes a given PreparedGeometry
 * @pre prepared must be a PreparedGeometry
 * @post the underlying Geometry linked to the given PreparedGeometry is also
 * deleted
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_prepared_geometry_delete(sfcgal_prepared_geometry_t *prepared);

/**
 * Returns the Geometry associated with a given PreparedGeometry
 * @pre prepared must be a PreparedGeometry
 * @post the returned Geometry is not writable and must not be deallocated by
 * the caller
 * @ingroup capi
 */
SFCGAL_API const sfcgal_geometry_t *
sfcgal_prepared_geometry_geometry(const sfcgal_prepared_geometry_t *prepared);

/**
 * Sets the Geometry associated with the given PreparedGeometry
 * @pre prepared must be a PreparedGeometry
 * @post the ownership of the given geometry is taken. The caller is not
 * responsible anymore of its deallocation
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_prepared_geometry_set_geometry(sfcgal_prepared_geometry_t *prepared,
                                      sfcgal_geometry_t          *geometry);

/**
 * Returns SRID associated with a given PreparedGeometry
 * @pre prepared must be a PreparedGeometry
 * @ingroup capi
 */
SFCGAL_API srid_t
sfcgal_prepared_geometry_srid(const sfcgal_prepared_geometry_t *prepared);

/**
 * Sets SRID associated with a given PreparedGeometry
 * @pre prepared must be a PreparedGeometry
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_prepared_geometry_set_srid(sfcgal_prepared_geometry_t *prepared, srid_t);

/**
 * Returns an EWKT representation of the given PreparedGeometry
 * @param num_decimals number of decimals. -2 for a variable number of decimals.
 * -1 for an exact representation
 * @post buffer is returned allocated and must be freed by the caller
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_prepared_geometry_as_ewkt(const sfcgal_prepared_geometry_t *prepared,
                                 int num_decimals, char **buffer, size_t *len);

/*--------------------------------------------------------------------------------------*
 *
 * I/O functions
 *
 *--------------------------------------------------------------------------------------*/

/**
 * io::readWKT
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_io_read_wkt(const char *, size_t len);
SFCGAL_API sfcgal_prepared_geometry_t *
sfcgal_io_read_ewkt(const char *, size_t len);

/**
 * io::readWKB
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_io_read_wkb(const char *, size_t len);

/**
 * Serialization
 */
/* allocates into char**, must be freed by the caller */
SFCGAL_API void
sfcgal_io_write_binary_prepared(const sfcgal_prepared_geometry_t *, char **,
                                size_t *);
SFCGAL_API sfcgal_prepared_geometry_t *
sfcgal_io_read_binary_prepared(const char *, size_t l);

/*--------------------------------------------------------------------------------------*
 *
 * Spatial processing
 *
 *--------------------------------------------------------------------------------------*/

/**
 * Tests the intersection of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_intersects(const sfcgal_geometry_t *geom1,
                           const sfcgal_geometry_t *geom2);

/**
 * Tests the 3D intersection of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_intersects_3d(const sfcgal_geometry_t *geom1,
                              const sfcgal_geometry_t *geom2);

/**
 * Returns the intersection of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_intersection(const sfcgal_geometry_t *geom1,
                             const sfcgal_geometry_t *geom2);

/**
 * Returns the 3D intersection of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_intersection_3d(const sfcgal_geometry_t *geom1,
                                const sfcgal_geometry_t *geom2);

/**
 * Returns the difference of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_difference(const sfcgal_geometry_t *geom1,
                           const sfcgal_geometry_t *geom2);

/**
 * Returns the 3D difference of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_difference_3d(const sfcgal_geometry_t *geom1,
                              const sfcgal_geometry_t *geom2);

/**
 * Returns the union of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_union(const sfcgal_geometry_t *geom1,
                      const sfcgal_geometry_t *geom2);

/**
 * Returns the 3D union of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_union_3d(const sfcgal_geometry_t *geom1,
                         const sfcgal_geometry_t *geom2);

/**
 * Returns the convex hull of geom
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_convexhull(const sfcgal_geometry_t *geom);

/**
 * Returns the 3D convex hull of geom
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_convexhull_3d(const sfcgal_geometry_t *geom);

/**
 * Returns the volume of geom (must be a volume)
 * @pre isValid(geom) == true
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_geometry_volume(const sfcgal_geometry_t *geom);

/**
 * Returns the area of geom
 * @pre isValid(geom) == true
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_geometry_area(const sfcgal_geometry_t *geom);

/**
 * Returns the 3D area of geom
 * @pre isValid(geom) == true
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_geometry_area_3d(const sfcgal_geometry_t *geom);

/**
 * Tests if the given Geometry is planar
 * @pre isValid(geom) == true
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_is_planar(const sfcgal_geometry_t *geom);

/**
 * Returns the orientation of the given Polygon
 * -1 for a counter clockwise orientation
 * 1 for a clockwise orientation
 * 0 for an invalid or undetermined orientation
 * @pre geom is a Polygon
 * @pre isValid(geom) == true
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_orientation(const sfcgal_geometry_t *geom);

/**
 * Returns a tesselation of the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_tesselate(const sfcgal_geometry_t *geom);

/**
 * Returns a triangulation of the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_triangulate_2dz(const sfcgal_geometry_t *geom);

/**
 * Returns an extrusion of the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_extrude(const sfcgal_geometry_t *geom, double ex, double ey,
                        double ez);

/**
 * Convert a PolyhedralSurface to a Solid
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup detail
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_make_solid(const sfcgal_geometry_t *geom);

/**
 * Force a Left Handed Rule on the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_force_lhr(const sfcgal_geometry_t *geom);

/**
 * Force a Right Handed Rule on the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_force_rhr(const sfcgal_geometry_t *geom);

/**
 * Computes the distance of the two given Geometry objects
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_geometry_distance(const sfcgal_geometry_t *geom1,
                         const sfcgal_geometry_t *geom2);

/**
 * Computes the 3D distance of the two given Geometry objects
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @ingroup capi
 */
SFCGAL_API double
sfcgal_geometry_distance_3d(const sfcgal_geometry_t *geom1,
                            const sfcgal_geometry_t *geom2);

/**
 * Round coordinates of the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_round(const sfcgal_geometry_t *geom, int r);

/**
 * Returns the minkowski sum geom1 + geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_minkowski_sum(const sfcgal_geometry_t *geom1,
                              const sfcgal_geometry_t *geom2);

/**
 * Returns the offset polygon of the given Geometry.
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_offset_polygon(const sfcgal_geometry_t *geom, double radius);

/**
 * Returns the straight skeleton of the given Geometry
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_straight_skeleton(const sfcgal_geometry_t *geom);

/**
 * Returns the straight skeleton of the given Geometry with the distance to the
 * border as M coordinate
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_straight_skeleton_distance_in_m(const sfcgal_geometry_t *geom);

/**
 * Returns the extrude straight skeleton of the given Polygon
 * @pre geom must be a Polygon
 * @pre isValid(geom) == true
 * @pre height != 0
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_extrude_straight_skeleton(const sfcgal_geometry_t *geom,
                                          double                   height);

/**
 * Returns the union of the polygon z-extrusion (with respect to
 * building_height) and the extrude straight skeleton (with respect to
 * roof_height) of the given Polygon
 * @pre geom must be a Polygon
 * @pre isValid(geom) == true
 * @pre roof_height != 0
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_extrude_polygon_straight_skeleton(const sfcgal_geometry_t *geom,
                                                  double building_height,
                                                  double roof_height);

/**
 * Returns the approximate medial axis for the given Polygon
 * Approximate medial axis is based on straight skeleton
 * @pre isValid(geom) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_approximate_medial_axis(const sfcgal_geometry_t *geom);

/**
 * Returns the straight skeleton partition for the given Polygon
 * @pre isValid(geom) == true
 * @pre geom must be a Polygon, Triangle or MultiPolygon
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_straight_skeleton_partition(const sfcgal_geometry_t *geom,
                                            bool autoOrientation);

/**
 * Tests the coverage of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_covers(const sfcgal_geometry_t *geom1,
                       const sfcgal_geometry_t *geom2);

/**
 * Tests the 3D coverage of geom1 and geom2
 * @pre isValid(geom1) == true
 * @pre isValid(geom2) == true
 * @ingroup capi
 */
SFCGAL_API int
sfcgal_geometry_covers_3d(const sfcgal_geometry_t *geom1,
                          const sfcgal_geometry_t *geom2);

/**
 * Returns the substring of the given LineString between fractional distances
 * @pre isValid(geom) == true
 * @pre geom is a Linestring
 * @pre -1 <= start <= 1
 * @pre -1 <= end <= 1
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_line_sub_string(const sfcgal_geometry_t *geom, double start,
                                double end);

#if !_MSC_VER
/**
 * Returns the alpha shapes of geom
 * @pre isValid(geom) == true
 * @pre alpha >= 0
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_alpha_shapes(const sfcgal_geometry_t *geom, double alpha,
                             bool allow_holes);

/**
 * Returns the optimal alpha shapes of geom
 * @pre isValid(geom) == true
 * @pre alpha >= 0
 * @pre nb_components >= 0
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_optimal_alpha_shapes(const sfcgal_geometry_t *geom,
                                     bool allow_holes, size_t nb_components);
#endif

/**
 * Returns the y monotone partition of a geometry (polygon without hole)
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_y_monotone_partition_2(const sfcgal_geometry_t *geom);

/**
 * Returns the approximal convex partition of a geometry (polygon without hole)
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_approx_convex_partition_2(const sfcgal_geometry_t *geom);

/**
 * Returns the greene approximal convex partition of a geometry (polygon without
 * hole)
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_greene_approx_convex_partition_2(const sfcgal_geometry_t *geom);

/**
 * Returns the optimal convex partition of a geometry (polygon without hole)
 * @pre isValid(geom) == true
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_optimal_convex_partition_2(const sfcgal_geometry_t *geom);

/**
 * Returns the visibility polygon of a Point inside a Polygon
 * @param polygon input geometry
 * @param point input geometry
 * @ingroup capi
 * @pre polygon is a valid geometry
 * @pre point must be inside polygon or on the boundary
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_visibility_point(const sfcgal_geometry_t *polygon,
                                 const sfcgal_geometry_t *point);

/**
 * @brief build the visibility polygon of the segment [pointA ; pointB] on a
 * Polygon
 * @param polygon input geometry
 * @param pointA input geometry
 * @param pointB input geometry
 * @ingroup public_api
 * @pre polygon is a valid geometry
 * @pre pointA and pointB must be vertices of poly, adjacents and respect the
 * direction
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_visibility_segment(const sfcgal_geometry_t *polygon,
                                   const sfcgal_geometry_t *pointA,
                                   const sfcgal_geometry_t *pointB);

/**
 * Buffer3D types
 * @ingroup capi
 */
typedef enum {
  SFCGAL_BUFFER3D_ROUND,
  SFCGAL_BUFFER3D_CYLSPHERE,
  SFCGAL_BUFFER3D_FLAT
} sfcgal_buffer3d_type_t;

/**
 * Computes a 3D buffer around a geometry
 * @param geom The input geometry (must be a Point or LineString)
 * @param radius The buffer radius
 * @param segments The number of segments to use for approximating curved
 * surfaces
 * @param buffer_type The type of buffer to compute (ROUND, CYLSPHERE, or FLAT)
 * @return A new geometry representing the 3D buffer
 * @pre isValid(geom) == true
 * @pre radius > 0
 * @pre segments > 2
 * @post isValid(return) == true
 * @ingroup capi
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_buffer3d(const sfcgal_geometry_t *geom, double radius,
                         int segments, sfcgal_buffer3d_type_t buffer_type);

/*--------------------------------------------------------------------------------------*
 *
 * Transformation
 *
 *--------------------------------------------------------------------------------------*/

/**
 * Rotates a geometry around the origin (0,0,0) by a given angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate(const sfcgal_geometry_t *geom, double angle);

/**
 * Rotates a geometry around a specified point by a given angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @param cx X-coordinate of the center point
 * @param cy Y-coordinate of the center point
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate_2d(const sfcgal_geometry_t *geom, double angle,
                          double cx, double cy);

/**
 * Rotates a 3D geometry around a specified axis by a given angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @param ax X-coordinate of the axis vector
 * @param ay Y-coordinate of the axis vector
 * @param az Z-coordinate of the axis vector
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate_3d(const sfcgal_geometry_t *geom, double angle,
                          double ax, double ay, double az);

/**
 * Rotates a 3D geometry around a specified axis and center point by a given
 * angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @param ax X-coordinate of the axis vector
 * @param ay Y-coordinate of the axis vector
 * @param az Z-coordinate of the axis vector
 * @param cx X-coordinate of the center point
 * @param cy Y-coordinate of the center point
 * @param cz Z-coordinate of the center point
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate_3d_around_center(const sfcgal_geometry_t *geom,
                                        double angle, double ax, double ay,
                                        double az, double cx, double cy,
                                        double cz);

/**
 * Rotates a geometry around the X axis by a given angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate_x(const sfcgal_geometry_t *geom, double angle);

/**
 * Rotates a geometry around the Y axis by a given angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate_y(const sfcgal_geometry_t *geom, double angle);

/**
 * Rotates a geometry around the Z axis by a given angle
 * @param geom The geometry to rotate
 * @param angle Rotation angle in radians
 * @return The rotated geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_rotate_z(const sfcgal_geometry_t *geom, double angle);

/**
 * Scale a geometry by a given factor
 * @param geom The geometry to scale
 * @param s Scale factor
 * @return The scaled geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_scale(const sfcgal_geometry_t *geom, double s);

/**
 * Scale a geometry by different factors for each dimension
 * @param geom The geometry to scale
 * @param sx Scale factor for x dimension
 * @param sy Scale factor for y dimension
 * @param sz Scale factor for z dimension
 * @return The scaled geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_scale_3d(const sfcgal_geometry_t *geom, double sx, double sy,
                         double sz);

/**
 * Scale a geometry by different factors for each dimension around a center
 * point
 * @param geom The geometry to scale
 * @param sx Scale factor for x dimension
 * @param sy Scale factor for y dimension
 * @param sz Scale factor for z dimension
 * @param cx X-coordinate of the center point
 * @param cy Y-coordinate of the center point
 * @param cz Z-coordinate of the center point
 * @return The scaled geometry
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_scale_3d_around_center(const sfcgal_geometry_t *geom, double sx,
                                       double sy, double sz, double cx,
                                       double cy, double cz);

/**
 * Translate a geometry by a 3D vector
 * @param geom the geometry to translate
 * @param dx x component of the translation vector
 * @param dy y component of the translation vector
 * @param dz z component of the translation vector
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_translate_3d(sfcgal_geometry_t *geom, double dx, double dy,
                             double dz);

/**
 * Translate a geometry by a 2D vector
 * @param geom the geometry to translate
 * @param dx x component of the translation vector
 * @param dy y component of the translation vector
 */
SFCGAL_API sfcgal_geometry_t *
sfcgal_geometry_translate_2d(sfcgal_geometry_t *geom, double dx, double dy);

/*--------------------------------------------------------------------------------------*
 *
 * Error handling
 *
 *--------------------------------------------------------------------------------------*/

/**
 * Warning and error handlers
 * @ingroup capi
 */
typedef int (*sfcgal_error_handler_t)(const char *, ...);

/**
 * Sets the error handlers. These callbacks are called on warning or error
 * @param warning_handler is the printf-styled callback function that will be
 * called when a function raises a warning. The default behaviour is to call
 * printf.
 * @param error_handler is the printf-style callback function that will be
 * called when a function generates an error. The default behaviour is to call
 * printf.
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_set_error_handlers(sfcgal_error_handler_t warning_handler,
                          sfcgal_error_handler_t error_handler);

/*--------------------------------------------------------------------------------------*
 *
 * Memory allocation
 *
 *--------------------------------------------------------------------------------------*/

typedef void *(*sfcgal_alloc_handler_t)(size_t);
typedef void (*sfcgal_free_handler_t)(void *);

/**
 * Sets the error handlers. These callbacks are called on warning or error
 * @param malloc_handler is the function to call for memory allocation. The
 * default behaviour is to call malloc()
 * @param free_handler is the function to call for memory deallocation. The
 * default behaviour is to call free()
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_set_alloc_handlers(sfcgal_alloc_handler_t malloc_handler,
                          sfcgal_free_handler_t  free_handler);

/*--------------------------------------------------------------------------------------*
 *
 * Init
 *
 *--------------------------------------------------------------------------------------*/

/**
 * This function must be called before all the other one.
 * @ingroup capi
 */
SFCGAL_API void
sfcgal_init();

/**
 * Get version
 * @ingroup capi
 */
SFCGAL_API const char *
sfcgal_version();

/**
 * Get full version (including CGAL and Boost versions)
 * @ingroup capi
 */
SFCGAL_API const char *
sfcgal_full_version();

#ifdef __cplusplus
}
#endif
#endif
