// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_ALGORITHM_LINESUBSTRING_H_
#define SFCGAL_ALGORITHM_LINESUBSTRING_H_

// C++
#include <memory>

// SFCGAL
#include "SFCGAL/config.h"

namespace SFCGAL {

// Class forward delclarations.
class LineString;

namespace algorithm {

/**
 * @brief Retrieve a substring of a specified LineString,
 *   between the specified fractional distances from the start
 *   of the specified LineString.
 * @param ls The specified LineString.
 * @param start The fraction along the specified LineString defining the
 *   start of the desired substring.
 * @param end The fraction along the specified LineString defining the
 *   end of the desired substring.
 * @note Negative values of {@code start} and/or {@code end} will be
 *   interpreted as a fractional distance taken from the end of the
 *   specified LineString. +/-0 will always be interpreted as the start
 *   of {@code ls}.
 * @note For open lines, a negative length range will result in a line
 *   substring terminating at the specified points, but with an
 *   orientation reversed relative to {@code ls}. For closed lines the
 *   a negative range corresponds to the complentary section of {@code ls}
 *   with an orientation equal to that of it.
 * @return The specified line substring.
 * @throws If either {@code start} or {@code end} have an absolute value
 *   greater than 1.
 */
SFCGAL_API std::unique_ptr<LineString>
           lineSubstring(const LineString &ls, double start, double end);

} // namespace algorithm

} // namespace SFCGAL

#endif // ! SFCGAL_ALGORITHM_LINESUBSTRING_H_
