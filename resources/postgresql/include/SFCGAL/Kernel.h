// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_KERNEL_H_
#define SFCGAL_KERNEL_H_

#include <CGAL/Exact_predicates_exact_constructions_kernel.h>

namespace SFCGAL {

/**
 * default Kernel
 */

using Kernel = CGAL::Exact_predicates_exact_constructions_kernel;

/**
 * Quotient type
 */
typedef CGAL::Gmpq QT;

} // namespace SFCGAL

#endif
