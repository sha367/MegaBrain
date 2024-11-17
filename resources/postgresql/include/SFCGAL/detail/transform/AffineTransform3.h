// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TRANSFORM_AFFINETRANSFORM3_H_
#define SFCGAL_TRANSFORM_AFFINETRANSFORM3_H_

#include "SFCGAL/Kernel.h"
#include "SFCGAL/Transform.h"
#include "SFCGAL/config.h"

#include <CGAL/Aff_transformation_3.h>

namespace SFCGAL {
namespace transform {

/**
 * Wrapper for CGAL::Aff_transform_3
 * @todo unittest
 */
class SFCGAL_API AffineTransform3 : public Transform {
public:
  /**
   * Constructor with a transform
   */
  AffineTransform3(CGAL::Aff_transformation_3<Kernel> transform);

  /*
   * [SFCGAL::Transform]
   */
  virtual void
  transform(Point &p);

  virtual void
  transform(LineString &ls);
  virtual void
  transform(Triangle &tri);
  virtual void
  transform(Polygon &poly);

  virtual void
  transform(PolyhedralSurface &surf);

  virtual void
  transform(TriangulatedSurface &surf);

  virtual void
  transform(Solid &solid);

private:
  CGAL::Aff_transformation_3<Kernel> _transform;
};

} // namespace transform
} // namespace SFCGAL

#endif
