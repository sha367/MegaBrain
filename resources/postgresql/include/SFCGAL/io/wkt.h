// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_WKT_H_
#define SFCGAL_IO_WKT_H_

#include "SFCGAL/config.h"

#include <memory>
#include <sstream>
#include <string>

namespace SFCGAL {
class Geometry;
}

namespace SFCGAL {
namespace io {
/**
 * Read a WKT geometry from an input stream
 */
SFCGAL_API auto
readWkt(std::istream &s) -> std::unique_ptr<Geometry>;
/**
 * Read a WKT geometry from a string
 */
SFCGAL_API auto
readWkt(const std::string &s) -> std::unique_ptr<Geometry>;
/**
 * Read a WKT geometry from a char*
 */
SFCGAL_API auto
readWkt(const char *, size_t) -> std::unique_ptr<Geometry>;
} // namespace io
} // namespace SFCGAL

#endif
