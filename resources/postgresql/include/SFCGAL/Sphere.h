// Copyright (c) 2024-2024, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_SPHERE_H_
#define SFCGAL_SPHERE_H_

#include <optional>
#include <vector>

#include <CGAL/Polyhedron_3.h>
#include <CGAL/squared_distance_3.h>

#include "SFCGAL/Kernel.h"
#include "SFCGAL/export.h"
#include "SFCGAL/numeric.h"

namespace SFCGAL {

/**
 * @brief Represents a sphere in 3D space
 *
 * This class provides methods to generate a polyhedron and a point cloud
 * representation of a sphere. It uses SFCGAL's Kernel for exact computations.
 */
class SFCGAL_API Sphere {
public:
  /**
   * @brief Constructs a Sphere object
   * @param radius The radius of the sphere
   * @param center The center point of the sphere
   * @param num_vertical The number of vertical divisions
   * @param num_horizontal The number of horizontal divisions
   * @param direction The direction vector for sphere orientation
   */
  Sphere(const Kernel::FT      &radius = 1.0,
         const Kernel::Point_3 &center = Kernel::Point_3(0, 0, 0),
         int num_vertical = 16, int num_horizontal = 32,
         const Kernel::Vector_3 &direction = Kernel::Vector_3(0, 0, 1));

  /**
   * @brief Copy constructor
   */
  Sphere(const Sphere &other) = default;

  /**
   * @brief Assignment operator
   */
  Sphere &
  operator=(Sphere other);

  /**
   * @brief Destructor
   */
  ~Sphere() = default;

  /**
   * @brief Sets the radius of the sphere
   * @param radius The new radius
   */
  inline void
  setRadius(const Kernel::FT &radius)
  {
    m_radius = radius;
    invalidateCache();
  }

  /**
   * @brief Sets the center of the sphere
   * @param center The new center point
   */
  inline void
  setCenter(const Kernel::Point_3 &center)
  {
    m_center = center;
    invalidateCache();
  }

  /**
   * @brief Sets the number of vertical divisions
   * @param num The new number of vertical divisions
   */
  inline void
  setNumVertical(int num)
  {
    m_num_vertical = num;
    invalidateCache();
  }

  /**
   * @brief Sets the number of horizontal divisions
   * @param num The new number of horizontal divisions
   */
  inline void
  setNumHorizontal(int num)
  {
    m_num_horizontal = num;
    invalidateCache();
  }

  /**
   * @brief Sets the direction of the sphere
   * @param direction The new direction vector
   */
  inline void
  setDirection(const Kernel::Vector_3 &direction)
  {
    m_direction = normalizeVector(direction);
    invalidateCache();
  }

  /**
   * @brief Gets the radius of the sphere
   * @return The radius
   */
  inline const Kernel::FT &
  radius() const
  {
    return m_radius;
  }

  /**
   * @brief Gets the center of the sphere
   * @return The center point
   */
  inline const Kernel::Point_3 &
  center() const
  {
    return m_center;
  }

  /**
   * @brief Gets the number of vertical divisions
   * @return The number of vertical divisions
   */
  inline int
  numVertical() const
  {
    return m_num_vertical;
  }

  /**
   * @brief Gets the number of horizontal divisions
   * @return The number of horizontal divisions
   */
  inline int
  numHorizontal() const
  {
    return m_num_horizontal;
  }

  /**
   * @brief Gets the direction of the sphere
   * @return The direction vector
   */
  inline const Kernel::Vector_3 &
  direction() const
  {
    return m_direction;
  }

  /**
   * @brief Generates a polyhedron representation of the sphere
   * @return A CGAL::Polyhedron_3 object representing the sphere
   */
  CGAL::Polyhedron_3<Kernel>
  generatePolyhedron();

  /**
   * @brief Generates a point cloud representation of the sphere
   * @return A vector of Point_3 objects representing points on the sphere's
   * surface
   */
  std::vector<Kernel::Point_3>
  generatePoints();

  /**
   * @brief Calculates the volume of the Sphere
   * @return The volume of the sphere
   */
  double
  volume() const
  {
    return CGAL::to_double((4.0 / 3.0) * m_radius * m_radius * m_radius *
                           CGAL_PI);
  }

  /**
   * @brief Calculates the surface area of the Sphere
   * @return The surface area of the sphere
   */
  double
  area() const
  {
    return CGAL::to_double(4 * m_radius * m_radius * CGAL_PI);
  }

private:
  Kernel::FT                                  m_radius;
  Kernel::Point_3                             m_center;
  int                                         m_num_vertical;
  int                                         m_num_horizontal;
  Kernel::Vector_3                            m_direction;
  std::optional<CGAL::Polyhedron_3<Kernel>>   m_polyhedron;
  std::optional<std::vector<Kernel::Point_3>> m_points;

  void
  invalidateCache();
  CGAL::Polyhedron_3<Kernel>
  generateSpherePolyhedron();
  std::vector<Kernel::Point_3>
  generateSpherePoints();

  // Function to get an orthogonal vector in the XY plane
  static Kernel::Vector_3
  get_orthogonal_vector(const Kernel::Vector_3 &vec)
  {
    if (vec.x() != 0 || vec.y() != 0) {
      return Kernel::Vector_3(-vec.y(), vec.x(), 0);
    } else {
      return Kernel::Vector_3(0, -vec.z(), vec.y());
    }
  }
};

} // namespace SFCGAL

#endif // SFCGAL_SPHERE_H_
