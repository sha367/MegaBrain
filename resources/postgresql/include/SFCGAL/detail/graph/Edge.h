// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_GRAPH_EDGE_H_
#define SFCGAL_GRAPH_EDGE_H_

#include "SFCGAL/config.h"

namespace SFCGAL {
namespace graph {

/**
 * @brief [private]An edge in a GeometryGraph with minimal requirements (some
 * algorithms could need more information)
 */
struct SFCGAL_API Edge {
  Edge(const int &face_ = -1);

  int face;
};

} // namespace graph
} // namespace SFCGAL

#endif
