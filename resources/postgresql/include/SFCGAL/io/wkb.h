// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2023, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_WKB_H_
#define SFCGAL_IO_WKB_H_

#include "SFCGAL/config.h"

#include <memory>
#include <sstream>
#include <string>

namespace SFCGAL {
class Geometry;
class PreparedGeometry;
} // namespace SFCGAL

namespace SFCGAL {
namespace io {

// WKB

/**
 * Read a WKB geometry from an input stream
 */
SFCGAL_API auto
readWkb(std::istream &stream, bool asHexString = false)
    -> std::unique_ptr<Geometry>;
/**
 * Read a WKB geometry from a string
 */
SFCGAL_API auto
readWkb(const std::string &s, bool asHexString = false)
    -> std::unique_ptr<Geometry>;

/**
 * Read a WKB geometry from a char*
 */
SFCGAL_API auto
readWkb(const char *, size_t, bool asHexString = false)
    -> std::unique_ptr<Geometry>;

// EWKB

/**
 * Read a EWKB geometry from an input stream
 */
SFCGAL_API auto
readEwkb(std::istream &stream, bool asHexString = false)
    -> std::unique_ptr<PreparedGeometry>;
/**
 * Read a EWKB geometry from a string
 */
SFCGAL_API auto
readEwkb(const std::string &s, bool asHexString = false)
    -> std::unique_ptr<PreparedGeometry>;

/**
 * Read a EWKB geometry from a char*
 */
SFCGAL_API auto
readEwkb(const char *, size_t, bool asHexString = false)
    -> std::unique_ptr<PreparedGeometry>;

} // namespace io
} // namespace SFCGAL

#endif
