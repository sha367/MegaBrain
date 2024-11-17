// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GRAPH_VERTEX_H_
#define SFCGAL_GRAPH_VERTEX_H_

#include "SFCGAL/config.h"

#include "SFCGAL/Coordinate.h"

namespace SFCGAL {
namespace graph {

/**
 * @brief [private]A vertex in a GeometryGraph with minimal requirements (some
 * algorithms could need a richer class)
 */
struct SFCGAL_API Vertex {
  /**
   * [requirement]Constructor with coordinate
   */
  Vertex(const Coordinate &coordinate_ = Coordinate());

  Coordinate coordinate;
};

} // namespace graph
} // namespace SFCGAL

#endif
