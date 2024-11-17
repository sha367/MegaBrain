// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_EWKT_H_
#define SFCGAL_IO_EWKT_H_

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
/**
 * Read a EWKT prepared geometry from an input stream
 */
SFCGAL_API std::unique_ptr<PreparedGeometry>
           readEwkt(std::istream &s);
/**
 * Read a EWKT geometry from a string
 */
SFCGAL_API std::unique_ptr<PreparedGeometry>
           readEwkt(const std::string &s);
/**
 * Read a EWKT geometry from a char*
 */
SFCGAL_API std::unique_ptr<PreparedGeometry>
           readEwkt(const char *, size_t);
} // namespace io
} // namespace SFCGAL

#endif
