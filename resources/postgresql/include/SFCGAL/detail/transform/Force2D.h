// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRANSFORM_FORCE2D_H_
#define SFCGAL_TRANSFORM_FORCE2D_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Kernel.h"
#include "SFCGAL/Transform.h"

namespace SFCGAL {
namespace transform {

/**
 * Force 2D definitions
 */
class SFCGAL_API Force2D : public Transform {
public:
  /*
   * [SFCGAL::Transform]
   */
  virtual void
  transform(Point &p);
};

} // namespace transform
} // namespace SFCGAL

#endif
