// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_COLLECT_ALGORITHM
#define SFCGAL_COLLECT_ALGORITHM

#include "SFCGAL/config.h"

#include "SFCGAL/Geometry.h"
#include "SFCGAL/GeometryCollection.h"

namespace SFCGAL {
namespace algorithm {
/**
 * Returns an aggregate of ga and gb
 * @ingroup detail
 */
SFCGAL_API std::unique_ptr<Geometry>
           collect(const Geometry &ga, const Geometry &gb);

/**
 * Returns an aggregate of a list of geometries
 * @ingroup detail
 */
template <typename GeometryIterator>
std::unique_ptr<Geometry>
collect(GeometryIterator begin, GeometryIterator end)
{
  GeometryIterator it;
  // FIXME: optimize type. For instance, if all the given geometries are points,
  // return a MultiPoint instead of a GeometryCollection
  GeometryCollection *coll = new GeometryCollection();

  for (it = begin; it != end; ++it) {
    coll->addGeometry(*it);
  }

  return std::unique_ptr<Geometry>(coll);
}
} // namespace algorithm
} // namespace SFCGAL

#endif
