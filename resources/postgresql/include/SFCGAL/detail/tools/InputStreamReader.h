// Copyright (c) 2012-2013, IGN France.
// Copyright (c) 2012-2022, Oslandia.
// SPDX-License-Identifier: LGPL-2.0-or-later

#ifndef SFCGAL_TOOLS_INPUTSTREAMREADER_H_
#define SFCGAL_TOOLS_INPUTSTREAMREADER_H_

#include "SFCGAL/config.h"

#include <cctype>
#include <sstream>
#include <stack>
#include <string>

namespace SFCGAL {
namespace tools {

template <typename CharType>
class BasicInputStreamReader;

/**
 * typedef for std::istream
 */
typedef BasicInputStreamReader<char> InputStreamReader;
/**
 * typedef for std::wistream
 */
typedef BasicInputStreamReader<wchar_t> WInputStreamReader;

/**
 * Helper class to parse data from stream.
 */
template <typename CharType>
class BasicInputStreamReader {
public:
  typedef CharType                                         char_type;
  typedef typename std::basic_string<char_type>            string_type;
  typedef typename std::basic_istream<char_type>           istream_type;
  typedef typename std::basic_istream<char_type>::pos_type pos_type;

  /// \brief constructor with an input stream
  BasicInputStreamReader(istream_type &s, bool skipWhiteSpaces = true)
      : _s(s), _states(), _skipWhiteSpaces(skipWhiteSpaces)
  {
    _s >> std::noskipws;
  }

  /// \brief try to match a char in the input stream
  bool
  match(char_type const &c)
  {
    begin();

    if (_skipWhiteSpaces) {
      skipWhiteSpaces();
    }

    if (!_s.eof() && _s.get() == c) {
      commit();
      return true;
    } else {
      rollback();
      return false;
    }
  }

  /// \brief try to match a char in the input stream, case-insensitive variant
  bool
  imatch(char_type const &c)
  {
    begin();

    if (_skipWhiteSpaces) {
      skipWhiteSpaces();
    }

    if (!_s.eof() && ::tolower(_s.get()) == ::tolower(c)) {
      commit();
      return true;
    } else {
      rollback();
      return false;
    }
  }

  /// \brief try to match a string in the input stream
  bool
  match(string_type const &str)
  {
    begin();

    if (_skipWhiteSpaces) {
      skipWhiteSpaces();
    }

    for (typename string_type::const_iterator it = str.begin(); it != str.end();
         ++it) {
      if (!_s.eof() && _s.get() == *it) {
        continue;
      }

      rollback();
      return false;
    }

    commit();
    return true;
  }

  /// \brief try to match a string in the input stream, case-insensitive variant
  bool
  imatch(string_type const &str)
  {
    begin();

    if (_skipWhiteSpaces) {
      skipWhiteSpaces();
    }

    for (typename string_type::const_iterator it = str.begin(); it != str.end();
         ++it) {
      if (!_s.eof() && ::tolower(_s.get()) == ::tolower(*it)) {
        continue;
      }

      rollback();
      return false;
    }

    commit();
    return true;
  }

  /// \brief try to read a value in the input stream, restore state if read
  /// fails
  template <typename T>
  bool
  read(T &value)
  {
    begin();

    if (_skipWhiteSpaces) {
      skipWhiteSpaces();
    }

    if (_s >> CGAL::iformat(value)) {
      commit();
      return true;
    } else {
      rollback();
      return false;
    }
  }

  auto
  readBytes(std::string &buffer, size_t bytesToRead) -> void
  {
    begin();

    _s.read(&buffer[0], bytesToRead);

    commit();
  }
  /// \brief save input stream state (read position)
  void
  begin()
  {
    _states.push(_s.tellg());
  }
  /// \brief validate read from input stream
  void
  commit()
  {
    _states.pop();
  }
  /// \brief restore stream state (read position)
  void
  rollback()
  {
    _s.seekg(_states.top());
    _s.clear();
    _states.pop();
  }

  /// \brief test if read is complete (either tried to reader after eof, either
  /// on eof)
  bool
  eof() const
  {
    return _s.eof() || (_s.peek() == std::char_traits<char_type>::eof());
  }

  /// \brief returns the wrapped stream
  inline istream_type &
  s()
  {
    return _s;
  }
  /// \brief returns the wrapped stream
  inline istream_type const &
  s() const
  {
    return _s;
  }

  /**
   * returns a string corresponding to the current state
   */
  string_type
  context(size_t nMax = 20)
  {
    begin();
    std::basic_ostringstream<char_type> oss;

    for (size_t i = 0; i < nMax; i++) {
      if (eof()) {
        break;
      }

      oss << (char_type)s().get();
    }

    if (!eof()) {
      oss << "...";
    }

    rollback();
    return oss.str();
  }

private:
  /// \brief the input stream
  istream_type &_s;
  /// \brief read position saved
  std::stack<pos_type> _states;
  /// \brief indicates if white chars should be skipped
  bool _skipWhiteSpaces;

  /// \brief skip white spaces
  void
  skipWhiteSpaces()
  {
    while (!_s.eof() && std::isspace(_s.peek())) {
      _s.get();
      continue;
    }
  }

  /// \brief no copy
  BasicInputStreamReader(BasicInputStreamReader const &other);
};

} // namespace tools
} // namespace SFCGAL

#endif
