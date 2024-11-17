// scale.h
#ifndef SFCGAL_ALGORITHM_SCALE_H
#define SFCGAL_ALGORITHM_SCALE_H

#include <SFCGAL/Geometry.h>
#include <SFCGAL/config.h>

namespace SFCGAL {
namespace algorithm {

/**
 * Scale a geometry by a given factor
 * @param g input geometry
 * @param s scale factor
 */
SFCGAL_API void
scale(Geometry &g, double s);

/**
 * Scale a geometry by different factors for each dimension
 * @param g input geometry
 * @param sx scale factor for x dimension
 * @param sy scale factor for y dimension
 * @param sz scale factor for z dimension
 */
SFCGAL_API void
scale(Geometry &g, double sx, double sy, double sz = 0.0);

/**
 * Scale a geometry by different factors for each dimension around a center
 * point
 * @param g input geometry
 * @param sx scale factor for x dimension
 * @param sy scale factor for y dimension
 * @param sz scale factor for z dimension
 * @param cx x-coordinate of the center point
 * @param cy y-coordinate of the center point
 * @param cz z-coordinate of the center point
 */
SFCGAL_API void
scale(Geometry &g, double sx, double sy, double sz, double cx, double cy,
      double cz);

} // namespace algorithm
} // namespace SFCGAL

#endif
