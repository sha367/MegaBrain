// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRANSFORM_FORCEZ_ORDER_POINTS_H_
#define SFCGAL_TRANSFORM_FORCEZ_ORDER_POINTS_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Kernel.h"
#include "SFCGAL/Transform.h"

namespace SFCGAL {

namespace transform {

/**
 * Force Z. If the 2D surface is pointing down, reverse its points
 *
 * @todo unittest
 * @todo move outside (it's not a coordinate transform)?
 */
class SFCGAL_API ForceZOrderPoints : public Transform {
public:
  /**
   * Constructor with a default Z value
   */
  ForceZOrderPoints(const Kernel::FT defaultZ = 0);

  /*
   * [SFCGAL::Transform]
   */
  virtual void
  transform(Point &p);

  virtual void
  visit(Triangle &);
  virtual void
  visit(Polygon &);

private:
  Kernel::FT _defaultZ;
};

} // namespace transform
} // namespace SFCGAL

#endif
