// Copyright (c) 2024-2024, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_BUFFER3D_ALGORITHM
#define SFCGAL_BUFFER3D_ALGORITHM

#include "SFCGAL/Cylinder.h"
#include "SFCGAL/Geometry.h"
#include "SFCGAL/LineString.h"
#include "SFCGAL/Point.h"
#include "SFCGAL/PolyhedralSurface.h"
#include "SFCGAL/Sphere.h"
#include "SFCGAL/algorithm/minkowskiSum3D.h"
#include <CGAL/Nef_polyhedron_3.h>
#include <CGAL/Polyhedron_3.h>
#include <CGAL/Surface_mesh.h>

namespace SFCGAL {
namespace algorithm {

/**
 * @brief Computes a 3D buffer around a Point or LineString.
 * @ingroup public_api
 */
class SFCGAL_API Buffer3D {
public:
  /**
   * @brief Buffer type enumeration
   */
  enum BufferType {
    ROUND,     ///< Minkowski sum with a sphere
    CYLSPHERE, ///< Union of cylinders and spheres
    FLAT       ///< Construction of a disk on the bisector plane
  };

  /**
   * @brief Constructs a Buffer3D object
   * @param inputGeometry The input geometry (must be a Point or LineString)
   * @param radius The buffer radius
   * @param segments The number of segments used to approximate curved surfaces
   * @throws std::invalid_argument if the input geometry is not a Point or
   * LineString
   */
  Buffer3D(const Geometry &inputGeometry, double radius, int segments);

  /**
   * @brief Computes the 3D buffer
   * @param type The type of buffer to compute
   * @return A PolyhedralSurface representing the 3D buffer
   * @throws std::invalid_argument if an invalid buffer type is provided
   */
  std::unique_ptr<PolyhedralSurface>
  compute(BufferType type) const;

private:
  std::vector<Kernel::Point_3> _inputPoints;
  double                       _radius;
  int                          _segments;

  std::unique_ptr<PolyhedralSurface>
  computePointBuffer() const;
  std::unique_ptr<PolyhedralSurface>
  computeRoundBuffer() const;
  std::unique_ptr<PolyhedralSurface>
  computeCylSphereBuffer() const;
  std::unique_ptr<PolyhedralSurface>
  computeFlatBuffer() const;

  // Helper functions for FLAT buffer
  CGAL::Point_3<Kernel>
  extend_point(const CGAL::Point_3<Kernel>  &point,
               const CGAL::Vector_3<Kernel> &direction, double distance) const;
  std::vector<CGAL::Point_3<Kernel>>
  create_circle_points(const CGAL::Point_3<Kernel>  &center,
                       const CGAL::Vector_3<Kernel> &axis, double radius,
                       int segments) const;
  CGAL::Plane_3<Kernel>
  compute_bisector_plane(const CGAL::Point_3<Kernel> &p1,
                         const CGAL::Point_3<Kernel> &p2,
                         const CGAL::Point_3<Kernel> &p3) const;
  CGAL::Point_3<Kernel>
  intersect_segment_plane(const CGAL::Point_3<Kernel> &p1,
                          const CGAL::Point_3<Kernel> &p2,
                          const CGAL::Plane_3<Kernel> &plane) const;
};

} // namespace algorithm
} // namespace SFCGAL

#endif // SFCGAL_BUFFER3D_ALGORITHM
