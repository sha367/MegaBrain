// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_SURFACE_H_
#define SFCGAL_SURFACE_H_

#include "SFCGAL/Geometry.h"

namespace SFCGAL {

/**
 * Abstract Surface class
 */
class SFCGAL_API Surface : public Geometry {
public:
  /**
   * destructor
   */
  virtual ~Surface();

  //-- SFCGAL::Geometry
  virtual int
  dimension() const;

  /**
   * [OGC/SFS]"The area of this Surface, as measured in the spatial reference
   * system of this Surface"
   */
  // virtual double area() const = 0 ;
  /**
   * [OGC/SFS]"The mathematical centroid for this Surface as a Point. The result
   * in not guaranteed to be on this Surface"
   */
  // virtual Point centroid() const = 0 ;
  /**
   * [OGC/SFS]"A Point guaranteed to be on this Surface"
   * @warning empty point is isEmpty()
   */
  // virtual Point pointOnSurface() const = 0 ;
protected:
  /**
   * no default constructor
   */
  Surface();
  /**
   * no copy constructor
   */
  Surface(Surface const &other);
};

} // namespace SFCGAL

#endif
