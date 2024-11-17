// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_MULTIPOINT_H_
#define SFCGAL_MULTIPOINT_H_

#include <boost/assert.hpp>
#include <vector>

#include <boost/serialization/base_object.hpp>

#include "SFCGAL/GeometryCollection.h"
#include "SFCGAL/Point.h"

namespace SFCGAL {

/**
 * A MultiPoint in SFA.
 * @ingroup public_api
 */
class SFCGAL_API MultiPoint : public GeometryCollection {
public:
  /**
   * Empty MultiPoint constructor
   */
  MultiPoint();
  /**
   * Copy constructor
   */
  MultiPoint(const MultiPoint &other);
  /**
   * assign operator
   */
  MultiPoint &
  operator=(MultiPoint other);
  /**
   * destructor
   */
  virtual ~MultiPoint();

  //-- SFCGAL::Geometry
  virtual MultiPoint *
  clone() const;

  //-- SFCGAL::Geometry
  virtual std::string
  geometryType() const;
  //-- SFCGAL::Geometry
  virtual GeometryType
  geometryTypeId() const;

  /**
   * returns the n-th Geometry as a Point
   */
  inline Point &
  pointN(const size_t &n)
  {
    return geometryN(n).as<Point>();
  }
  /**
   * returns the n-th Geometry as a Point
   */
  inline const Point &
  pointN(const size_t &n) const
  {
    return geometryN(n).as<Point>();
  }

  //-- visitors

  //-- SFCGAL::Geometry
  virtual void
  accept(GeometryVisitor &visitor);
  //-- SFCGAL::Geometry
  virtual void
  accept(ConstGeometryVisitor &visitor) const;

  /**
   * Serializer
   */
  template <class Archive>
  void
  serialize(Archive &ar, const unsigned int /*version*/)
  {
    ar &boost::serialization::base_object<GeometryCollection>(*this);
  }

protected:
  //-- SFCGAL::GeometryCollection
  virtual bool
  isAllowed(Geometry const &g);
};

} // namespace SFCGAL

#endif
