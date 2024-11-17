// Copyright (c) 2024-2024, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_CYLINDER_H_
#define SFCGAL_CYLINDER_H_

#include "SFCGAL/Kernel.h"
#include "SFCGAL/export.h"
#include <CGAL/Polyhedron_3.h>
#include <CGAL/Surface_mesh.h>
#include <optional>
#include <vector>

namespace SFCGAL {

/**
 * @class Cylinder
 * @brief Represents a cylinder in 3D space
 *
 * This class provides methods to generate a polyhedron and a surface mesh
 * representation of a cylinder. It uses SFCGAL's Kernel for exact computations.
 */
class SFCGAL_API Cylinder {
public:
  using Point_3      = Kernel::Point_3;
  using Vector_3     = Kernel::Vector_3;
  using Polyhedron_3 = CGAL::Polyhedron_3<Kernel>;
  using Surface_mesh = CGAL::Surface_mesh<Point_3>;

  /**
   * @brief Constructs a Cylinder object
   * @param base_center The center point of the base of the cylinder
   * @param axis The axis of the cylinder
   * @param radius The radius of the cylinder
   * @param height The height of the cylinder
   * @param num_radial The number of radial divisions
   */
  Cylinder(const Point_3    &base_center = Point_3(0, 0, 0),
           const Vector_3   &axis        = Vector_3(0, 0, 1),
           const Kernel::FT &radius = 1.0, const Kernel::FT &height = 1.0,
           int num_radial = 32);

  /**
   * @brief Copy constructor
   */
  Cylinder(const Cylinder &other) = default;

  /**
   * @brief Assignment operator
   */
  Cylinder &
  operator=(Cylinder other);

  /**
   * @brief Destructor
   */
  ~Cylinder() = default;

  /**
   * @brief Sets the base center of the cylinder
   * @param base_center The new base center point
   */
  void
  setBaseCenter(const Point_3 &base_center);

  /**
   * @brief Sets the axis of the cylinder
   * @param axis The new axis vector
   */
  void
  setAxis(const Vector_3 &axis);

  /**
   * @brief Sets the radius of the cylinder
   * @param radius The new radius
   */
  void
  setRadius(const Kernel::FT &radius);

  /**
   * @brief Sets the height of the cylinder
   * @param height The new height
   */
  void
  setHeight(const Kernel::FT &height);

  /**
   * @brief Sets the number of radial divisions
   * @param num The new number of radial divisions
   */
  void
  setNumRadial(int num);

  /**
   * @brief Gets the base center of the cylinder
   * @return The base center point
   */
  const Point_3 &
  baseCenter() const
  {
    return m_base_center;
  }

  /**
   * @brief Gets the axis of the cylinder
   * @return The axis vector
   */
  const Vector_3 &
  axis() const
  {
    return m_axis;
  }

  /**
   * @brief Gets the radius of the cylinder
   * @return The radius
   */
  const Kernel::FT &
  radius() const
  {
    return m_radius;
  }

  /**
   * @brief Gets the height of the cylinder
   * @return The height
   */
  const Kernel::FT &
  height() const
  {
    return m_height;
  }

  /**
   * @brief Gets the number of radial divisions
   * @return The number of radial divisions
   */
  int
  numRadial() const
  {
    return m_num_radial;
  }

  /**
   * @brief Generates a polyhedron representation of the cylinder
   * @return A CGAL::Polyhedron_3 object representing the cylinder
   */
  Polyhedron_3
  generatePolyhedron();

  /**
   * @brief Generates a surface mesh representation of the cylinder
   * @return A CGAL::Surface_mesh object representing the cylinder
   */
  Surface_mesh
  generateSurfaceMesh();

  double
  volume() const
  {
    return CGAL::to_double(m_radius * m_radius * m_height * CGAL_PI);
  }

  double
  area() const
  {
    return CGAL::to_double(2 * m_radius * m_radius * CGAL_PI +
                           2 * m_radius * m_height * CGAL_PI);
  }

private:
  Point_3                     m_base_center;
  Vector_3                    m_axis;
  Kernel::FT                  m_radius;
  Kernel::FT                  m_height;
  int                         m_num_radial;
  std::optional<Polyhedron_3> m_polyhedron;
  std::optional<Surface_mesh> m_surface_mesh;

  /**
   * @brief Invalidates the cached polyhedron and surface mesh
   */
  void
  invalidateCache();

  /**
   * @brief Normalizes a vector
   * @param v The vector to normalize
   * @return The normalized vector
   */
  Vector_3
  normalize(const Vector_3 &v);
};

} // namespace SFCGAL

#endif // SFCGAL_CYLINDER_H_
