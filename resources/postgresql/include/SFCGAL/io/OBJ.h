// Copyright (c) 2024-2024, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_IO_OBJ_H_
#define SFCGAL_IO_OBJ_H_

#include <SFCGAL/Geometry.h>
#include <ostream>
#include <string>

namespace SFCGAL {
namespace io {
namespace OBJ {

/**
 * @brief Saves a geometry to an OBJ format stream.
 * @ingroup io
 *
 * @param[in] geom The geometry to save
 * @param[out] out The output stream
 * @throws std::runtime_error If the geometry is invalid or unsupported
 */
SFCGAL_API void
save(const Geometry &geom, std::ostream &out);

/**
 * @brief Saves a geometry to an OBJ file.
 * @ingroup io
 *
 * @param[in] geom The geometry to save
 * @param[in] filename The name of the file to save to
 * @throws std::runtime_error If the file cannot be opened or the geometry is
 * invalid
 */
SFCGAL_API void
save(const Geometry &geom, const std::string &filename);

/**
 * @brief Saves a geometry to an OBJ format string.
 * @ingroup io
 *
 * @param[in] geom The geometry to save
 * @return The OBJ format string
 * @throws std::runtime_error If the geometry is invalid or unsupported
 */
SFCGAL_API std::string
           saveToString(const Geometry &geom);

/**
 * @brief Saves a geometry to an OBJ format buffer (C API).
 * @ingroup io
 *
 * @param[in] geom The geometry to save
 * @param[out] buffer The buffer to write to
 * @param[in,out] size On input, the size of the buffer. On output, the number
 * of bytes written (or required if buffer is null)
 * @throws std::runtime_error If the geometry is invalid or unsupported
 */
SFCGAL_API void
saveToBuffer(const Geometry &geom, char *buffer, size_t *size);

} // namespace OBJ
} // namespace io
} // namespace SFCGAL

#endif
