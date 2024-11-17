-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
-- PostGIS - Spatial Types for PostgreSQL
-- http://postgis.net
--
-- This is free software; you can redistribute and/or modify it under
-- the terms of the GNU General Public Licence. See the COPYING file.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
-- Generated on: 2024-11-14 00:31:04
--           by: ../../utils/create_uninstall.pl
--         from: rtpostgis.sql
--
-- Do not edit manually, your changes will be lost.
--
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

BEGIN;

-- Drop all views.
DROP VIEW IF EXISTS raster_columns;
DROP VIEW IF EXISTS raster_overviews;
-- Drop all aggregates.
DROP AGGREGATE IF EXISTS st_summarystatsagg (raster, integer, boolean, double precision);
DROP AGGREGATE IF EXISTS st_summarystatsagg (raster, boolean, double precision);
DROP AGGREGATE IF EXISTS st_summarystatsagg (raster, int, boolean);
DROP AGGREGATE IF EXISTS st_countagg (raster, integer, boolean, double precision);
DROP AGGREGATE IF EXISTS st_countagg (raster, integer, boolean);
DROP AGGREGATE IF EXISTS st_countagg (raster, boolean);
DROP AGGREGATE IF EXISTS st_samealignment (raster);
DROP AGGREGATE IF EXISTS st_union (raster, unionarg[]);
DROP AGGREGATE IF EXISTS st_union (raster, integer, text);
DROP AGGREGATE IF EXISTS st_union (raster, integer);
DROP AGGREGATE IF EXISTS st_union (raster);
DROP AGGREGATE IF EXISTS st_union (raster, text);
-- Drop all operators classes and families.
DROP OPERATOR CLASS IF EXISTS hash_raster_ops USING hash;
DROP OPERATOR FAMILY IF EXISTS hash_raster_ops USING hash;
-- Drop all operators.
DROP OPERATOR IF EXISTS =  (raster,raster);
DROP OPERATOR IF EXISTS <<  (raster,raster);
DROP OPERATOR IF EXISTS &<  (raster,raster);
DROP OPERATOR IF EXISTS <<|  (raster,raster);
DROP OPERATOR IF EXISTS &<|  (raster,raster);
DROP OPERATOR IF EXISTS &&  (raster,raster);
DROP OPERATOR IF EXISTS &>  (raster,raster);
DROP OPERATOR IF EXISTS >>  (raster,raster);
DROP OPERATOR IF EXISTS |&>  (raster,raster);
DROP OPERATOR IF EXISTS |>>  (raster,raster);
DROP OPERATOR IF EXISTS ~=  (raster,raster);
DROP OPERATOR IF EXISTS @  (raster,raster);
DROP OPERATOR IF EXISTS ~  (raster,raster);
DROP OPERATOR IF EXISTS ~  (raster,geometry);
DROP OPERATOR IF EXISTS @  (raster,geometry);
DROP OPERATOR IF EXISTS &&  (raster,geometry);
DROP OPERATOR IF EXISTS ~  (geometry,raster);
DROP OPERATOR IF EXISTS @  (geometry,raster);
DROP OPERATOR IF EXISTS &&  (geometry,raster);
-- Drop all casts.
DROP CAST IF EXISTS (raster AS box3d);
DROP CAST IF EXISTS (raster AS geometry);
DROP CAST IF EXISTS (raster AS bytea);
-- Drop all table triggers.
-- Drop all functions except 2 needed for type definition.
DROP FUNCTION IF EXISTS postgis_raster_lib_version ();
DROP FUNCTION IF EXISTS postgis_raster_scripts_installed ();
DROP FUNCTION IF EXISTS postgis_raster_lib_build_date ();
DROP FUNCTION IF EXISTS postgis_gdal_version ();
DROP FUNCTION IF EXISTS st_envelope (raster);
DROP FUNCTION IF EXISTS st_convexhull (raster);
DROP FUNCTION IF EXISTS st_minconvexhull (	rast raster,	nband integer );
DROP FUNCTION IF EXISTS box3d (raster);
DROP FUNCTION IF EXISTS st_height (raster);
DROP FUNCTION IF EXISTS st_numbands (raster);
DROP FUNCTION IF EXISTS st_scalex (raster);
DROP FUNCTION IF EXISTS st_scaley (raster);
DROP FUNCTION IF EXISTS st_skewx (raster);
DROP FUNCTION IF EXISTS st_skewy (raster);
DROP FUNCTION IF EXISTS st_srid (raster);
DROP FUNCTION IF EXISTS st_upperleftx (raster);
DROP FUNCTION IF EXISTS st_upperlefty (raster);
DROP FUNCTION IF EXISTS st_width (raster);
DROP FUNCTION IF EXISTS st_pixelwidth (raster);
DROP FUNCTION IF EXISTS st_pixelheight (raster);
DROP FUNCTION IF EXISTS st_geotransform (raster,    OUT imag double precision,    OUT jmag double precision,    OUT theta_i double precision,    OUT theta_ij double precision,    OUT xoffset double precision,    OUT yoffset double precision);
DROP FUNCTION IF EXISTS st_rotation (raster);
DROP FUNCTION IF EXISTS st_metadata (	rast raster,	OUT upperleftx double precision,	OUT upperlefty double precision,	OUT width int,	OUT height int,	OUT scalex double precision,	OUT scaley double precision,	OUT skewx double precision,	OUT skewy double precision,	OUT srid int,	OUT numbands int);
DROP FUNCTION IF EXISTS st_summary (rast raster);
DROP FUNCTION IF EXISTS ST_MemSize (raster);
DROP FUNCTION IF EXISTS st_makeemptyraster (width int, height int, upperleftx float8, upperlefty float8, scalex float8, scaley float8, skewx float8, skewy float8, srid integer );
DROP FUNCTION IF EXISTS st_makeemptyraster (width int, height int, upperleftx float8, upperlefty float8, pixelsize float8);
DROP FUNCTION IF EXISTS st_makeemptyraster (rast raster);
DROP FUNCTION IF EXISTS st_addband (rast raster, addbandargset addbandarg[]);
DROP FUNCTION IF EXISTS st_addband (	rast raster,	index int,	pixeltype text,	initialvalue float8 ,	nodataval float8 );
DROP FUNCTION IF EXISTS st_addband (	rast raster,	pixeltype text,	initialvalue float8 ,	nodataval float8 );
DROP FUNCTION IF EXISTS st_addband (	torast raster,	fromrast raster,	fromband int ,	torastindex int );
DROP FUNCTION IF EXISTS st_addband (	torast raster,	fromrasts raster[], fromband integer ,	torastindex int );
DROP FUNCTION IF EXISTS st_addband (	rast raster,	index int,	outdbfile text, outdbindex int[],	nodataval double precision );
DROP FUNCTION IF EXISTS st_addband (	rast raster,	outdbfile text, outdbindex int[],	index int ,	nodataval double precision );
DROP FUNCTION IF EXISTS st_band (rast raster, nbands int[] );
DROP FUNCTION IF EXISTS st_band (rast raster, nband int);
DROP FUNCTION IF EXISTS st_band (rast raster, nbands text, delimiter char );
DROP FUNCTION IF EXISTS _st_summarystats (	rast raster,	nband int ,	exclude_nodata_value boolean ,	sample_percent double precision );
DROP FUNCTION IF EXISTS st_summarystats (	rast raster,	nband int ,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_summarystats (	rast raster,	exclude_nodata_value boolean);
DROP FUNCTION IF EXISTS st_approxsummarystats (	rast raster,	nband int ,	exclude_nodata_value boolean ,	sample_percent double precision );
DROP FUNCTION IF EXISTS st_approxsummarystats (	rast raster,	nband int,	sample_percent double precision);
DROP FUNCTION IF EXISTS st_approxsummarystats (	rast raster,	exclude_nodata_value boolean,	sample_percent double precision );
DROP FUNCTION IF EXISTS st_approxsummarystats (	rast raster,	sample_percent double precision);
DROP FUNCTION IF EXISTS _st_summarystats_finalfn (internal);
DROP FUNCTION IF EXISTS _st_summarystats_transfn (	internal,	raster, integer,	boolean, double precision);
DROP FUNCTION IF EXISTS _st_summarystats_transfn (	internal,	raster, boolean, double precision);
DROP FUNCTION IF EXISTS _st_summarystats_transfn (	internal,	raster, int, boolean);
DROP FUNCTION IF EXISTS _st_count (rast raster, nband int , exclude_nodata_value boolean , sample_percent double precision );
DROP FUNCTION IF EXISTS st_count (rast raster, nband int , exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_count (rast raster, exclude_nodata_value boolean);
DROP FUNCTION IF EXISTS st_approxcount (rast raster, nband int , exclude_nodata_value boolean , sample_percent double precision );
DROP FUNCTION IF EXISTS st_approxcount (rast raster, nband int, sample_percent double precision);
DROP FUNCTION IF EXISTS st_approxcount (rast raster, exclude_nodata_value boolean, sample_percent double precision );
DROP FUNCTION IF EXISTS st_approxcount (rast raster, sample_percent double precision);
DROP FUNCTION IF EXISTS _st_countagg_finalfn (agg agg_count);
DROP FUNCTION IF EXISTS __st_countagg_transfn (	agg agg_count,	rast raster, 	nband integer , exclude_nodata_value boolean ,	sample_percent double precision );
DROP FUNCTION IF EXISTS _st_countagg_transfn (	agg agg_count,	rast raster, 	nband integer, exclude_nodata_value boolean,	sample_percent double precision);
DROP FUNCTION IF EXISTS _st_countagg_transfn (	agg agg_count,	rast raster, 	nband integer, exclude_nodata_value boolean);
DROP FUNCTION IF EXISTS _st_countagg_transfn (	agg agg_count,	rast raster, 	exclude_nodata_value boolean);
DROP FUNCTION IF EXISTS _st_histogram (	rast raster, nband int ,	exclude_nodata_value boolean ,	sample_percent double precision ,	bins int , width double precision[] ,	right boolean ,	min double precision , max double precision ,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_histogram (	rast raster, nband int ,	exclude_nodata_value boolean ,	bins int , width double precision[] ,	right boolean ,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_histogram (	rast raster, nband int,	exclude_nodata_value boolean,	bins int,	right boolean,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_histogram (	rast raster, nband int,	bins int, width double precision[] ,	right boolean ,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_histogram (	rast raster, nband int,	bins int,	right boolean,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_approxhistogram (	rast raster, nband int ,	exclude_nodata_value boolean ,	sample_percent double precision ,	bins int , width double precision[] ,	right boolean ,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_approxhistogram (	rast raster, nband int,	exclude_nodata_value boolean,	sample_percent double precision,	bins int,	right boolean,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_approxhistogram (	rast raster, nband int,	sample_percent double precision,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_approxhistogram (	rast raster,	sample_percent double precision,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_approxhistogram (	rast raster, nband int,	sample_percent double precision,	bins int, width double precision[] ,	right boolean ,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_approxhistogram (	rast raster, nband int,	sample_percent double precision,	bins int, right boolean,	OUT min double precision,	OUT max double precision,	OUT count bigint,	OUT percent double precision);
DROP FUNCTION IF EXISTS _st_quantile (	rast raster,	nband int ,	exclude_nodata_value boolean ,	sample_percent double precision ,	quantiles double precision[] ,	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_quantile (	rast raster,	nband int ,	exclude_nodata_value boolean ,	quantiles double precision[] ,	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_quantile (	rast raster,	nband int,	quantiles double precision[],	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_quantile (	rast raster,	quantiles double precision[],	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_quantile (rast raster, nband int, exclude_nodata_value boolean, quantile double precision);
DROP FUNCTION IF EXISTS st_quantile (rast raster, nband int, quantile double precision);
DROP FUNCTION IF EXISTS st_quantile (rast raster, exclude_nodata_value boolean, quantile double precision );
DROP FUNCTION IF EXISTS st_quantile (rast raster, quantile double precision);
DROP FUNCTION IF EXISTS st_approxquantile (	rast raster,	nband int ,	exclude_nodata_value boolean ,	sample_percent double precision ,	quantiles double precision[] ,	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_approxquantile (	rast raster,	nband int,	sample_percent double precision,	quantiles double precision[] ,	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_approxquantile (	rast raster,	sample_percent double precision,	quantiles double precision[] ,	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_approxquantile (	rast raster,	quantiles double precision[],	OUT quantile double precision,	OUT value double precision);
DROP FUNCTION IF EXISTS st_approxquantile (rast raster, nband int, exclude_nodata_value boolean, sample_percent double precision, quantile double precision);
DROP FUNCTION IF EXISTS st_approxquantile (rast raster, nband int, sample_percent double precision, quantile double precision);
DROP FUNCTION IF EXISTS st_approxquantile (rast raster, sample_percent double precision, quantile double precision);
DROP FUNCTION IF EXISTS st_approxquantile (rast raster, exclude_nodata_value boolean, quantile double precision );
DROP FUNCTION IF EXISTS st_approxquantile (rast raster, quantile double precision);
DROP FUNCTION IF EXISTS _st_valuecount (	rast raster, nband integer ,	exclude_nodata_value boolean ,	searchvalues double precision[] ,	roundto double precision ,	OUT value double precision,	OUT count integer,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuecount (	rast raster, nband integer ,	exclude_nodata_value boolean ,	searchvalues double precision[] ,	roundto double precision ,	OUT value double precision, OUT count integer);
DROP FUNCTION IF EXISTS st_valuecount (rast raster, nband integer, searchvalues double precision[], roundto double precision , OUT value double precision, OUT count integer);
DROP FUNCTION IF EXISTS st_valuecount (rast raster, searchvalues double precision[], roundto double precision , OUT value double precision, OUT count integer);
DROP FUNCTION IF EXISTS st_valuecount (rast raster, nband integer, exclude_nodata_value boolean, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuecount (rast raster, nband integer, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuecount (rast raster, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuepercent (	rast raster, nband integer ,	exclude_nodata_value boolean ,	searchvalues double precision[] ,	roundto double precision ,	OUT value double precision, OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuepercent (rast raster, nband integer, searchvalues double precision[], roundto double precision , OUT value double precision, OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuepercent (rast raster, searchvalues double precision[], roundto double precision , OUT value double precision, OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuepercent (rast raster, nband integer, exclude_nodata_value boolean, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuepercent (rast raster, nband integer, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuepercent (rast raster, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS _st_valuecount (	rastertable text,	rastercolumn text,	nband integer ,	exclude_nodata_value boolean ,	searchvalues double precision[] ,	roundto double precision ,	OUT value double precision,	OUT count integer,	OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuecount (	rastertable text, rastercolumn text,	nband integer ,	exclude_nodata_value boolean ,	searchvalues double precision[] ,	roundto double precision ,	OUT value double precision, OUT count integer);
DROP FUNCTION IF EXISTS st_valuecount (rastertable text, rastercolumn text, nband integer, searchvalues double precision[], roundto double precision , OUT value double precision, OUT count integer);
DROP FUNCTION IF EXISTS st_valuecount (rastertable text, rastercolumn text, searchvalues double precision[], roundto double precision , OUT value double precision, OUT count integer);
DROP FUNCTION IF EXISTS st_valuecount (rastertable text, rastercolumn text, nband integer, exclude_nodata_value boolean, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuecount (rastertable text, rastercolumn text, nband integer, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuecount (rastertable text, rastercolumn text, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuepercent (	rastertable text, rastercolumn text,	nband integer ,	exclude_nodata_value boolean ,	searchvalues double precision[] ,	roundto double precision ,	OUT value double precision, OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuepercent (rastertable text, rastercolumn text, nband integer, searchvalues double precision[], roundto double precision , OUT value double precision, OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuepercent (rastertable text, rastercolumn text, searchvalues double precision[], roundto double precision , OUT value double precision, OUT percent double precision);
DROP FUNCTION IF EXISTS st_valuepercent (rastertable text, rastercolumn text, nband integer, exclude_nodata_value boolean, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuepercent (rastertable text, rastercolumn text, nband integer, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS st_valuepercent (rastertable text, rastercolumn text, searchvalue double precision, roundto double precision );
DROP FUNCTION IF EXISTS _st_reclass (rast raster, VARIADIC reclassargset reclassarg[]);
DROP FUNCTION IF EXISTS st_reclass (rast raster, VARIADIC reclassargset reclassarg[]);
DROP FUNCTION IF EXISTS st_reclass (rast raster, nband int, reclassexpr text, pixeltype text, nodataval double precision );
DROP FUNCTION IF EXISTS st_reclass (rast raster, reclassexpr text, pixeltype text);
DROP FUNCTION IF EXISTS _st_colormap (	rast raster, nband int,	colormap text,	method text );
DROP FUNCTION IF EXISTS st_colormap (	rast raster, nband int ,	colormap text ,	method text );
DROP FUNCTION IF EXISTS st_colormap (	rast raster,	colormap text,	method text );
DROP FUNCTION IF EXISTS st_fromgdalraster (gdaldata bytea, srid integer );
DROP FUNCTION IF EXISTS st_gdaldrivers (	OUT idx int,	OUT short_name text,	OUT long_name text,	OUT can_read boolean,	OUT can_write boolean,	OUT create_options text);
DROP FUNCTION IF EXISTS st_asgdalraster (rast raster, format text, options text[] , srid integer );
DROP FUNCTION IF EXISTS ST_Contour (		rast raster,		bandnumber integer ,		level_interval float8 ,		level_base float8 ,		fixed_levels float8[] ,		polygonize boolean );
DROP FUNCTION IF EXISTS ST_InterpolateRaster (		geom geometry,		options text,		rast raster,		bandnumber integer );
DROP FUNCTION IF EXISTS st_astiff (rast raster, options text[] , srid integer );
DROP FUNCTION IF EXISTS st_astiff (rast raster, nbands int[], options text[] , srid integer );
DROP FUNCTION IF EXISTS st_astiff (rast raster, compression text, srid integer );
DROP FUNCTION IF EXISTS st_astiff (rast raster, nbands int[], compression text, srid integer );
DROP FUNCTION IF EXISTS st_asjpeg (rast raster, options text[] );
DROP FUNCTION IF EXISTS st_asjpeg (rast raster, nbands int[], options text[] );
DROP FUNCTION IF EXISTS st_asjpeg (rast raster, nbands int[], quality int);
DROP FUNCTION IF EXISTS st_asjpeg (rast raster, nband int, options text[] );
DROP FUNCTION IF EXISTS st_asjpeg (rast raster, nband int, quality int);
DROP FUNCTION IF EXISTS st_aspng (rast raster, options text[] );
DROP FUNCTION IF EXISTS st_aspng (rast raster, nbands int[], options text[] );
DROP FUNCTION IF EXISTS st_aspng (rast raster, nbands int[], compression int);
DROP FUNCTION IF EXISTS st_aspng (rast raster, nband int, options text[] );
DROP FUNCTION IF EXISTS st_aspng (rast raster, nband int, compression int);
DROP FUNCTION IF EXISTS _st_asraster (	geom geometry,	scalex double precision , scaley double precision ,	width integer , height integer ,	pixeltype text[] ,	value double precision[] ,	nodataval double precision[] ,	upperleftx double precision , upperlefty double precision ,	gridx double precision , gridy double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	scalex double precision, scaley double precision,	gridx double precision , gridy double precision ,	pixeltype text[] ,	value double precision[] ,	nodataval double precision[] ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	scalex double precision, scaley double precision,	pixeltype text[],	value double precision[] ,	nodataval double precision[] ,	upperleftx double precision , upperlefty double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	width integer, height integer,	gridx double precision , gridy double precision ,	pixeltype text[] ,	value double precision[] ,	nodataval double precision[] ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	width integer, height integer,	pixeltype text[],	value double precision[] ,	nodataval double precision[] ,	upperleftx double precision , upperlefty double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	scalex double precision, scaley double precision,	gridx double precision, gridy double precision,	pixeltype text,	value double precision ,	nodataval double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	scalex double precision, scaley double precision,	pixeltype text,	value double precision ,	nodataval double precision ,	upperleftx double precision , upperlefty double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	width integer, height integer,	gridx double precision, gridy double precision,	pixeltype text,	value double precision ,	nodataval double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	width integer, height integer,	pixeltype text,	value double precision ,	nodataval double precision ,	upperleftx double precision , upperlefty double precision ,	skewx double precision , skewy double precision ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	ref raster,	pixeltype text[] ,	value double precision[] ,	nodataval double precision[] ,	touched boolean );
DROP FUNCTION IF EXISTS st_asraster (	geom geometry,	ref raster,	pixeltype text,	value double precision ,	nodataval double precision ,	touched boolean );
DROP FUNCTION IF EXISTS _ST_gdalwarp (	rast raster,	algorithm text , maxerr double precision ,	srid integer ,	scalex double precision , scaley double precision ,	gridx double precision , gridy double precision ,	skewx double precision , skewy double precision ,	width integer , height integer );
DROP FUNCTION IF EXISTS st_resample (	rast raster,	scalex double precision , scaley double precision ,	gridx double precision , gridy double precision ,	skewx double precision , skewy double precision ,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_resample (	rast raster,	width integer, height integer,	gridx double precision , gridy double precision ,	skewx double precision , skewy double precision ,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_resample (	rast raster,	ref raster,	algorithm text ,	maxerr double precision ,	usescale boolean );
DROP FUNCTION IF EXISTS st_resample (	rast raster,	ref raster,	usescale boolean,	algorithm text ,	maxerr double precision );
DROP FUNCTION IF EXISTS st_transform (rast raster, srid integer, algorithm text , maxerr double precision , scalex double precision , scaley double precision );
DROP FUNCTION IF EXISTS st_transform (rast raster, srid integer, scalex double precision, scaley double precision, algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_transform (rast raster, srid integer, scalexy double precision, algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_transform (	rast raster,	alignto raster,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_rescale (rast raster, scalex double precision, scaley double precision, algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_rescale (rast raster, scalexy double precision, algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_reskew (rast raster, skewx double precision, skewy double precision, algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_reskew (rast raster, skewxy double precision, algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_snaptogrid (	rast raster,	gridx double precision, gridy double precision,	algorithm text , maxerr double precision ,	scalex double precision , scaley double precision );
DROP FUNCTION IF EXISTS st_snaptogrid (	rast raster,	gridx double precision, gridy double precision,	scalex double precision, scaley double precision,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_snaptogrid (	rast raster,	gridx double precision, gridy double precision,	scalexy double precision,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_resize (	rast raster,	width text, height text,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_resize (	rast raster,	width integer, height integer,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_resize (	rast raster,	percentwidth double precision, percentheight double precision,	algorithm text , maxerr double precision );
DROP FUNCTION IF EXISTS st_mapalgebraexpr (rast raster, band integer, pixeltype text,        expression text, nodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebraexpr (rast raster, pixeltype text, expression text,        nodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, band integer,        pixeltype text, onerastuserfunc regprocedure, variadic args text[]);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, band integer,        pixeltype text, onerastuserfunc regprocedure);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, band integer,        onerastuserfunc regprocedure, variadic args text[]);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, band integer,        onerastuserfunc regprocedure);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, pixeltype text,        onerastuserfunc regprocedure, variadic args text[]);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, pixeltype text,        onerastuserfunc regprocedure);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, onerastuserfunc regprocedure,        variadic args text[]);
DROP FUNCTION IF EXISTS st_mapalgebrafct (rast raster, onerastuserfunc regprocedure);
DROP FUNCTION IF EXISTS st_mapalgebraexpr (	rast1 raster, band1 integer,	rast2 raster, band2 integer,	expression text,	pixeltype text , extenttype text ,	nodata1expr text , nodata2expr text ,	nodatanodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebraexpr (	rast1 raster,	rast2 raster,	expression text,	pixeltype text , extenttype text ,	nodata1expr text , nodata2expr text ,	nodatanodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebrafct (	rast1 raster, band1 integer,	rast2 raster, band2 integer,	tworastuserfunc regprocedure,	pixeltype text , extenttype text ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebrafct (	rast1 raster,	rast2 raster,	tworastuserfunc regprocedure,	pixeltype text ,	extenttype text ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebrafctngb (    rast raster,    band integer,    pixeltype text,    ngbwidth integer,    ngbheight integer,    onerastngbuserfunc regprocedure,    nodatamode text,    variadic args text[]);
DROP FUNCTION IF EXISTS st_max4ma (matrix float[][], nodatamode text, variadic args text[]);
DROP FUNCTION IF EXISTS st_min4ma (matrix float[][], nodatamode text, variadic args text[]);
DROP FUNCTION IF EXISTS st_sum4ma (matrix float[][], nodatamode text, variadic args text[]);
DROP FUNCTION IF EXISTS st_mean4ma (matrix float[][], nodatamode text, variadic args text[]);
DROP FUNCTION IF EXISTS st_range4ma (matrix float[][], nodatamode text, variadic args text[]);
DROP FUNCTION IF EXISTS st_distinct4ma (matrix float[][], nodatamode TEXT, VARIADIC args TEXT[]);
DROP FUNCTION IF EXISTS st_stddev4ma (matrix float[][], nodatamode TEXT, VARIADIC args TEXT[]);
DROP FUNCTION IF EXISTS _st_mapalgebra (	rastbandargset rastbandarg[],	callbackfunc regprocedure,	pixeltype text ,	distancex integer , distancey integer ,	extenttype text , customextent raster ,	mask double precision[][] , weighted boolean ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebra (	rastbandargset rastbandarg[],	callbackfunc regprocedure,	pixeltype text ,	extenttype text , customextent raster ,	distancex integer , distancey integer ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast raster, nband int[],	callbackfunc regprocedure,	pixeltype text ,	extenttype text , customextent raster ,	distancex integer , distancey integer ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast raster, nband int,	callbackfunc regprocedure,	pixeltype text ,	extenttype text , customextent raster ,	distancex integer , distancey integer ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast1 raster, nband1 int,	rast2 raster, nband2 int,	callbackfunc regprocedure,	pixeltype text ,	extenttype text , customextent raster ,	distancex integer , distancey integer ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast raster, nband int,	callbackfunc regprocedure,	mask double precision [][], weighted boolean,	pixeltype text ,	extenttype text , customextent raster ,	VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS _st_mapalgebra (	rastbandargset rastbandarg[],	expression text,	pixeltype text , extenttype text ,	nodata1expr text , nodata2expr text ,	nodatanodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast raster, nband integer,	pixeltype text,	expression text, nodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast raster,	pixeltype text,	expression text, nodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast1 raster, band1 integer,	rast2 raster, band2 integer,	expression text,	pixeltype text , extenttype text ,	nodata1expr text , nodata2expr text ,	nodatanodataval double precision );
DROP FUNCTION IF EXISTS st_mapalgebra (	rast1 raster,	rast2 raster,	expression text,	pixeltype text , extenttype text ,	nodata1expr text , nodata2expr text ,	nodatanodataval double precision );
DROP FUNCTION IF EXISTS _st_convertarray4ma (value double precision[][]);
DROP FUNCTION IF EXISTS st_max4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_min4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_sum4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mean4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_range4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_distinct4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_stddev4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_invdistweight4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_mindist4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS _st_slope4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_slope (	rast raster,	nband integer,	customextent raster,	pixeltype text ,	units text ,	scale double precision ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS st_slope (	rast raster,	nband integer ,	pixeltype text ,	units text ,	scale double precision ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS _st_aspect4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_aspect (	rast raster,	nband integer,	customextent raster,	pixeltype text ,	units text ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS st_aspect (	rast raster,	nband integer ,	pixeltype text ,	units text ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS _st_hillshade4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_hillshade (	rast raster, nband integer,	customextent raster,	pixeltype text ,	azimuth double precision , altitude double precision ,	max_bright double precision , scale double precision ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS st_hillshade (	rast raster, nband integer ,	pixeltype text ,	azimuth double precision , altitude double precision ,	max_bright double precision , scale double precision ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS _st_tpi4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_tpi (	rast raster, nband integer,	customextent raster,	pixeltype text , interpolate_nodata boolean );
DROP FUNCTION IF EXISTS st_tpi (	rast raster, nband integer ,	pixeltype text , interpolate_nodata boolean );
DROP FUNCTION IF EXISTS _st_roughness4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_roughness (	rast raster, nband integer,	customextent raster,	pixeltype text , interpolate_nodata boolean );
DROP FUNCTION IF EXISTS ST_roughness (	rast raster, nband integer ,	pixeltype text , interpolate_nodata boolean );
DROP FUNCTION IF EXISTS _st_tri4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_tri (	rast raster, nband integer,	customextent raster,	pixeltype text ,	interpolate_nodata boolean );
DROP FUNCTION IF EXISTS st_tri (	rast raster, nband integer ,	pixeltype text , interpolate_nodata boolean );
DROP FUNCTION IF EXISTS _st_grayscale4ma (value double precision[][][], pos integer[][], VARIADIC userargs text[] );
DROP FUNCTION IF EXISTS st_grayscale (	rastbandargset rastbandarg[],	extenttype text );
DROP FUNCTION IF EXISTS st_grayscale (	rast raster, 	redband integer , 	greenband integer , 	blueband integer ,	extenttype text );
DROP FUNCTION IF EXISTS st_isempty (rast raster);
DROP FUNCTION IF EXISTS st_hasnoband (rast raster, nband int );
DROP FUNCTION IF EXISTS st_bandnodatavalue (rast raster, band integer );
DROP FUNCTION IF EXISTS st_bandisnodata (rast raster, band integer , forceChecking boolean );
DROP FUNCTION IF EXISTS st_bandisnodata (rast raster, forceChecking boolean);
DROP FUNCTION IF EXISTS st_bandpath (rast raster, band integer );
DROP FUNCTION IF EXISTS ST_BandPixelType (rast raster, band integer );
DROP FUNCTION IF EXISTS ST_BandMetaData (	rast raster,	band int[]);
DROP FUNCTION IF EXISTS ST_BandMetaData (	rast raster,	band int );
DROP FUNCTION IF EXISTS ST_BandFileSize (rast raster, band integer );
DROP FUNCTION IF EXISTS St_BandFileTimestamp (rast raster, band integer );
DROP FUNCTION IF EXISTS st_value (rast raster, band integer, x integer, y integer, exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_value (rast raster, band integer, pt geometry, exclude_nodata_value boolean , resample text );
DROP FUNCTION IF EXISTS st_value (rast raster, x integer, y integer, exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_value (rast raster, pt geometry, exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_setz (rast raster, geom geometry, resample text , band integer );
DROP FUNCTION IF EXISTS st_setm (rast raster, geom geometry, resample text , band integer );
DROP FUNCTION IF EXISTS st_pixelofvalue (	rast raster,	nband integer,	search double precision[],	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS ST_PixelofValue (	rast raster,	search double precision[],	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelofvalue (	rast raster,	nband integer,	search double precision,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelofvalue (	rast raster,	search double precision,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_georeference (rast raster, format text );
DROP FUNCTION IF EXISTS st_setscale (rast raster, scale float8);
DROP FUNCTION IF EXISTS st_setscale (rast raster, scalex float8, scaley float8);
DROP FUNCTION IF EXISTS st_setskew (rast raster, skew float8);
DROP FUNCTION IF EXISTS st_setskew (rast raster, skewx float8, skewy float8);
DROP FUNCTION IF EXISTS st_setsrid (rast raster, srid integer);
DROP FUNCTION IF EXISTS st_setupperleft (rast raster, upperleftx float8, upperlefty float8);
DROP FUNCTION IF EXISTS st_setrotation (rast raster, rotation float8);
DROP FUNCTION IF EXISTS st_setgeotransform (rast raster,    imag double precision,    jmag double precision,    theta_i double precision,    theta_ij double precision,    xoffset double precision,    yoffset double precision);
DROP FUNCTION IF EXISTS st_setgeoreference (rast raster, georef text, format text );
DROP FUNCTION IF EXISTS st_setgeoreference (	rast raster,	upperleftx double precision, upperlefty double precision,	scalex double precision, scaley double precision,	skewx double precision, skewy double precision);
DROP FUNCTION IF EXISTS _st_tile (	rast raster,	width integer, height integer,	nband integer[] ,	padwithnodata boolean , nodataval double precision );
DROP FUNCTION IF EXISTS st_tile (	rast raster, nband integer[],	width integer, height integer,	padwithnodata boolean , nodataval double precision );
DROP FUNCTION IF EXISTS st_tile (	rast raster, nband integer,	width integer, height integer,	padwithnodata boolean , nodataval double precision );
DROP FUNCTION IF EXISTS st_tile (	rast raster,	width integer, height integer,	padwithnodata boolean , nodataval double precision );
DROP FUNCTION IF EXISTS st_setbandnodatavalue (rast raster, band integer, nodatavalue float8, forceChecking boolean );
DROP FUNCTION IF EXISTS st_setbandnodatavalue (rast raster, nodatavalue float8);
DROP FUNCTION IF EXISTS st_setbandisnodata (rast raster, band integer );
DROP FUNCTION IF EXISTS st_setbandpath (rast raster, band integer, outdbpath text, outdbindex integer, force boolean );
DROP FUNCTION IF EXISTS st_setbandindex (rast raster, band integer, outdbindex integer, force boolean );
DROP FUNCTION IF EXISTS _ST_SetValues (	rast raster, nband integer,	x integer, y integer,	newvalueset double precision[][],	noset boolean[][] ,	hasnosetvalue boolean ,	nosetvalue double precision ,	keepnodata boolean );
DROP FUNCTION IF EXISTS ST_SetValues (	rast raster, nband integer,	x integer, y integer,	newvalueset double precision[][],	noset boolean[][] ,	keepnodata boolean );
DROP FUNCTION IF EXISTS ST_SetValues (	rast raster, nband integer,	x integer, y integer,	newvalueset double precision[][],	nosetvalue double precision,	keepnodata boolean );
DROP FUNCTION IF EXISTS ST_SetValues (	rast raster, nband integer,	x integer, y integer,	width integer, height integer,	newvalue double precision,	keepnodata boolean );
DROP FUNCTION IF EXISTS ST_SetValues (	rast raster,	x integer, y integer,	width integer, height integer,	newvalue double precision,	keepnodata boolean );
DROP FUNCTION IF EXISTS ST_SetValues (	rast raster, nband integer,	geomvalset geomval[],	keepnodata boolean );
DROP FUNCTION IF EXISTS ST_SetValue (rast raster, band integer, x integer, y integer, newvalue float8);
DROP FUNCTION IF EXISTS ST_SetValue (rast raster, x integer, y integer, newvalue float8);
DROP FUNCTION IF EXISTS ST_SetValue (	rast raster, nband integer,	geom geometry, newvalue double precision);
DROP FUNCTION IF EXISTS ST_SetValue (	rast raster,	geom geometry, newvalue double precision);
DROP FUNCTION IF EXISTS st_dumpaspolygons (rast raster, band integer , exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_dumpvalues (	rast raster, nband integer[] , exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_dumpvalues (rast raster, nband integer, exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_polygon (rast raster, band integer );
DROP FUNCTION IF EXISTS _st_pixelaspolygons (	rast raster,	band integer ,	columnx integer ,	rowy integer ,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelaspolygons (	rast raster,	band integer ,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelaspolygon (rast raster, x integer, y integer);
DROP FUNCTION IF EXISTS st_pixelaspoints (	rast raster,	band integer ,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelaspoint (rast raster, x integer, y integer);
DROP FUNCTION IF EXISTS _st_pixelascentroids (	rast raster,	band integer ,	columnx integer ,	rowy integer ,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelascentroids (	rast raster,	band integer ,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_pixelascentroid (rast raster, x integer, y integer);
DROP FUNCTION IF EXISTS _st_worldtorastercoord (	rast raster,	longitude double precision , latitude double precision ,	OUT columnx integer,	OUT rowy integer);
DROP FUNCTION IF EXISTS st_worldtorastercoord (	rast raster,	longitude double precision, latitude double precision,	OUT columnx integer,	OUT rowy integer);
DROP FUNCTION IF EXISTS st_worldtorastercoord (	rast raster, pt geometry,	OUT columnx integer,	OUT rowy integer);
DROP FUNCTION IF EXISTS st_worldtorastercoordx (rast raster, xw float8, yw float8);
DROP FUNCTION IF EXISTS st_worldtorastercoordx (rast raster, xw float8);
DROP FUNCTION IF EXISTS st_worldtorastercoordx (rast raster, pt geometry);
DROP FUNCTION IF EXISTS st_worldtorastercoordy (rast raster, xw float8, yw float8);
DROP FUNCTION IF EXISTS st_worldtorastercoordy (rast raster, yw float8);
DROP FUNCTION IF EXISTS st_worldtorastercoordy (rast raster, pt geometry);
DROP FUNCTION IF EXISTS _st_rastertoworldcoord (	rast raster,	columnx integer , rowy integer ,	OUT longitude double precision,	OUT latitude double precision	);
DROP FUNCTION IF EXISTS st_rastertoworldcoord (	rast raster,	columnx integer, rowy integer,	OUT	longitude double precision,	OUT latitude double precision	);
DROP FUNCTION IF EXISTS st_rastertoworldcoordx (rast raster, xr int, yr int);
DROP FUNCTION IF EXISTS st_rastertoworldcoordx (rast raster, xr int);
DROP FUNCTION IF EXISTS st_rastertoworldcoordy (rast raster, xr int, yr int);
DROP FUNCTION IF EXISTS st_rastertoworldcoordy (rast raster, yr int);
DROP FUNCTION IF EXISTS st_minpossiblevalue (pixeltype text);
DROP FUNCTION IF EXISTS st_rastfromwkb (bytea);
DROP FUNCTION IF EXISTS st_rastfromhexwkb (text);
DROP FUNCTION IF EXISTS st_aswkb (raster, outasin boolean );
DROP FUNCTION IF EXISTS st_asbinary (raster, outasin boolean );
DROP FUNCTION IF EXISTS st_ashexwkb (raster, outasin boolean );
DROP FUNCTION IF EXISTS bytea (raster);
DROP FUNCTION IF EXISTS raster_hash (raster);
DROP FUNCTION IF EXISTS raster_eq (raster, raster);
DROP FUNCTION IF EXISTS raster_overleft (raster, raster);
DROP FUNCTION IF EXISTS raster_overright (raster, raster);
DROP FUNCTION IF EXISTS raster_left (raster, raster);
DROP FUNCTION IF EXISTS raster_right (raster, raster);
DROP FUNCTION IF EXISTS raster_overabove (raster, raster);
DROP FUNCTION IF EXISTS raster_overbelow (raster, raster);
DROP FUNCTION IF EXISTS raster_above (raster, raster);
DROP FUNCTION IF EXISTS raster_below (raster, raster);
DROP FUNCTION IF EXISTS raster_same (raster, raster);
DROP FUNCTION IF EXISTS raster_contained (raster, raster);
DROP FUNCTION IF EXISTS raster_contain (raster, raster);
DROP FUNCTION IF EXISTS raster_overlap (raster, raster);
DROP FUNCTION IF EXISTS raster_geometry_contain (raster, geometry);
DROP FUNCTION IF EXISTS raster_contained_by_geometry (raster, geometry);
DROP FUNCTION IF EXISTS raster_geometry_overlap (raster, geometry);
DROP FUNCTION IF EXISTS geometry_raster_contain (geometry, raster);
DROP FUNCTION IF EXISTS geometry_contained_by_raster (geometry, raster);
DROP FUNCTION IF EXISTS geometry_raster_overlap (geometry, raster);
DROP FUNCTION IF EXISTS st_samealignment (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS st_samealignment (	ulx1 double precision, uly1 double precision, scalex1 double precision, scaley1 double precision, skewx1 double precision, skewy1 double precision,	ulx2 double precision, uly2 double precision, scalex2 double precision, scaley2 double precision, skewx2 double precision, skewy2 double precision);
DROP FUNCTION IF EXISTS _st_samealignment_transfn (agg agg_samealignment, rast raster);
DROP FUNCTION IF EXISTS _ST_samealignment_finalfn (agg agg_samealignment);
DROP FUNCTION IF EXISTS st_notsamealignmentreason (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS st_iscoveragetile (rast raster, coverage raster, tilewidth integer, tileheight integer);
DROP FUNCTION IF EXISTS _st_intersects (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_intersects (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_intersects (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_intersects (geom geometry, rast raster, nband integer );
DROP FUNCTION IF EXISTS st_intersects (geom geometry, rast raster, nband integer );
DROP FUNCTION IF EXISTS st_intersects (rast raster, geom geometry, nband integer );
DROP FUNCTION IF EXISTS st_intersects (rast raster, nband integer, geom geometry);
DROP FUNCTION IF EXISTS _st_overlaps (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_overlaps (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_overlaps (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_touches (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_touches (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_touches (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_contains (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_contains (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_contains (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_containsproperly (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_containsproperly (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_containsproperly (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_covers (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_covers (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_covers (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_coveredby (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_coveredby (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_coveredby (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _st_within (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_within (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS st_within (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS _ST_DWithin (rast1 raster, nband1 integer, rast2 raster, nband2 integer, distance double precision);
DROP FUNCTION IF EXISTS ST_DWithin (rast1 raster, nband1 integer, rast2 raster, nband2 integer, distance double precision);
DROP FUNCTION IF EXISTS ST_DWithin (rast1 raster, rast2 raster, distance double precision);
DROP FUNCTION IF EXISTS _ST_DFullyWithin (rast1 raster, nband1 integer, rast2 raster, nband2 integer, distance double precision);
DROP FUNCTION IF EXISTS ST_DFullyWithin (rast1 raster, nband1 integer, rast2 raster, nband2 integer, distance double precision);
DROP FUNCTION IF EXISTS ST_DFullyWithin (rast1 raster, rast2 raster, distance double precision);
DROP FUNCTION IF EXISTS st_disjoint (rast1 raster, nband1 integer, rast2 raster, nband2 integer);
DROP FUNCTION IF EXISTS ST_Disjoint (rast1 raster, rast2 raster);
DROP FUNCTION IF EXISTS ST_Intersection (geomin geometry, rast raster, band integer );
DROP FUNCTION IF EXISTS st_intersection (rast raster, band integer, geomin geometry);
DROP FUNCTION IF EXISTS ST_Intersection (rast raster, geomin geometry);
DROP FUNCTION IF EXISTS ST_Intersection (	rast1 raster, band1 int,	rast2 raster, band2 int,	returnband text ,	nodataval double precision[] );
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster, band1 int,	rast2 raster, band2 int,	returnband text,	nodataval double precision);
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster, band1 int,	rast2 raster, band2 int,	nodataval double precision[]);
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster, band1 int,	rast2 raster, band2 int,	nodataval double precision);
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster,	rast2 raster,	returnband text ,	nodataval double precision[] );
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster,	rast2 raster,	returnband text,	nodataval double precision);
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster,	rast2 raster,	nodataval double precision[]);
DROP FUNCTION IF EXISTS st_intersection (	rast1 raster,	rast2 raster,	nodataval double precision);
DROP FUNCTION IF EXISTS _st_union_finalfn (internal);
DROP FUNCTION IF EXISTS _st_union_transfn (internal, raster, unionarg[]);
DROP FUNCTION IF EXISTS _st_union_transfn (internal, raster, integer, text);
DROP FUNCTION IF EXISTS _st_union_transfn (internal, raster, integer);
DROP FUNCTION IF EXISTS _st_union_transfn (internal, raster);
DROP FUNCTION IF EXISTS _st_union_transfn (internal, raster, text);
DROP FUNCTION IF EXISTS _st_clip (	rast raster, nband integer[],	geom geometry,	nodataval float8[] , crop boolean , touched boolean );
DROP FUNCTION IF EXISTS st_clip (	rast raster,	nband integer[],	geom geometry,	nodataval float8[],	crop boolean , touched boolean );
DROP FUNCTION IF EXISTS st_clip (	rast raster, nband integer,	geom geometry,	nodataval float8, crop boolean , touched boolean );
DROP FUNCTION IF EXISTS st_clip (	rast raster,	nband integer,	geom geometry,	crop boolean , touched boolean );
DROP FUNCTION IF EXISTS st_clip (	rast raster,	geom geometry,	nodataval float8[] , crop boolean , touched boolean );
DROP FUNCTION IF EXISTS st_clip (	rast raster,	geom geometry,	nodataval double precision, crop boolean , touched boolean );
DROP FUNCTION IF EXISTS st_clip (	rast raster,	geom geometry,	crop boolean, touched boolean );
DROP FUNCTION IF EXISTS st_nearestvalue (	rast raster, band integer,	pt geometry,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_nearestvalue (	rast raster,	pt geometry,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_nearestvalue (	rast raster, band integer,	columnx integer, rowy integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_nearestvalue (	rast raster,	columnx integer, rowy integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS _st_neighborhood (	rast raster, band integer,	columnx integer, rowy integer,	distancex integer, distancey integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_neighborhood (	rast raster, band integer,	columnx integer, rowy integer,	distancex integer, distancey integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_neighborhood (	rast raster,	columnx integer, rowy integer,	distancex integer, distancey integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_neighborhood (	rast raster, band integer,	pt geometry,	distancex integer, distancey integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS st_neighborhood (	rast raster,	pt geometry,	distancex integer, distancey integer,	exclude_nodata_value boolean );
DROP FUNCTION IF EXISTS _add_raster_constraint (cn name, sql text);
DROP FUNCTION IF EXISTS _drop_raster_constraint (rastschema name, rasttable name, cn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_srid (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _add_raster_constraint_srid (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_srid (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_scale (rastschema name, rasttable name, rastcolumn name, axis char);
DROP FUNCTION IF EXISTS _add_raster_constraint_scale (rastschema name, rasttable name, rastcolumn name, axis char);
DROP FUNCTION IF EXISTS _drop_raster_constraint_scale (rastschema name, rasttable name, rastcolumn name, axis char);
DROP FUNCTION IF EXISTS _raster_constraint_info_blocksize (rastschema name, rasttable name, rastcolumn name, axis text);
DROP FUNCTION IF EXISTS _add_raster_constraint_blocksize (rastschema name, rasttable name, rastcolumn name, axis text);
DROP FUNCTION IF EXISTS _drop_raster_constraint_blocksize (rastschema name, rasttable name, rastcolumn name, axis text);
DROP FUNCTION IF EXISTS _raster_constraint_info_extent (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _add_raster_constraint_extent (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_extent (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_alignment (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _add_raster_constraint_alignment (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_alignment (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_spatially_unique (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _add_raster_constraint_spatially_unique (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_spatially_unique (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_coverage_tile (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _add_raster_constraint_coverage_tile (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_coverage_tile (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_regular_blocking (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_regular_blocking (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_num_bands (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _add_raster_constraint_num_bands (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_num_bands (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_pixel_types (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_pixel_types (rast raster);
DROP FUNCTION IF EXISTS _add_raster_constraint_pixel_types (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_pixel_types (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_nodata_values (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_nodata_values (rast raster);
DROP FUNCTION IF EXISTS _add_raster_constraint_nodata_values (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_nodata_values (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_out_db (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_out_db (rast raster);
DROP FUNCTION IF EXISTS _add_raster_constraint_out_db (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _drop_raster_constraint_out_db (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS _raster_constraint_info_index (rastschema name, rasttable name, rastcolumn name);
DROP FUNCTION IF EXISTS AddRasterConstraints  (	rastschema name,	rasttable name,	rastcolumn name,	VARIADIC constraints text[]);
DROP FUNCTION IF EXISTS AddRasterConstraints  (	rasttable name,	rastcolumn name,	VARIADIC constraints text[]);
DROP FUNCTION IF EXISTS AddRasterConstraints  (	rastschema name,	rasttable name,	rastcolumn name,	srid boolean ,	scale_x boolean ,	scale_y boolean ,	blocksize_x boolean ,	blocksize_y boolean ,	same_alignment boolean ,	regular_blocking boolean , 	num_bands boolean ,	pixel_types boolean ,	nodata_values boolean ,	out_db boolean ,	extent boolean );
DROP FUNCTION IF EXISTS AddRasterConstraints  (	rasttable name,	rastcolumn name,	srid boolean ,	scale_x boolean ,	scale_y boolean ,	blocksize_x boolean ,	blocksize_y boolean ,	same_alignment boolean ,	regular_blocking boolean , 	num_bands boolean ,	pixel_types boolean ,	nodata_values boolean ,	out_db boolean ,	extent boolean );
DROP FUNCTION IF EXISTS DropRasterConstraints  (	rastschema name,	rasttable name,	rastcolumn name,	VARIADIC constraints text[]);
DROP FUNCTION IF EXISTS DropRasterConstraints  (	rasttable name,	rastcolumn name,	VARIADIC constraints text[]);
DROP FUNCTION IF EXISTS DropRasterConstraints  (	rastschema name,	rasttable name,	rastcolumn name,	srid boolean ,	scale_x boolean ,	scale_y boolean ,	blocksize_x boolean ,	blocksize_y boolean ,	same_alignment boolean ,	regular_blocking boolean ,	num_bands boolean ,	pixel_types boolean ,	nodata_values boolean ,	out_db boolean ,	extent boolean );
DROP FUNCTION IF EXISTS DropRasterConstraints  (	rasttable name,	rastcolumn name,	srid boolean ,	scale_x boolean ,	scale_y boolean ,	blocksize_x boolean ,	blocksize_y boolean ,	same_alignment boolean ,	regular_blocking boolean ,	num_bands boolean ,	pixel_types boolean ,	nodata_values boolean ,	out_db boolean ,	extent boolean );
DROP FUNCTION IF EXISTS _overview_constraint (ov raster, factor integer, refschema name, reftable name, refcolumn name);
DROP FUNCTION IF EXISTS _overview_constraint_info (	ovschema name, ovtable name, ovcolumn name,		OUT refschema name,		OUT reftable name,		OUT refcolumn name,		OUT factor integer	);
DROP FUNCTION IF EXISTS _add_overview_constraint (	ovschema name, ovtable name, ovcolumn name,	refschema name, reftable name, refcolumn name,	factor integer);
DROP FUNCTION IF EXISTS _drop_overview_constraint (ovschema name, ovtable name, ovcolumn name);
DROP FUNCTION IF EXISTS AddOverviewConstraints  (	ovschema name, ovtable name, ovcolumn name,	refschema name, reftable name, refcolumn name,	ovfactor int);
DROP FUNCTION IF EXISTS AddOverviewConstraints  (	ovtable name, ovcolumn name,	reftable name, refcolumn name,	ovfactor int);
DROP FUNCTION IF EXISTS DropOverviewConstraints  (	ovschema name,	ovtable name,	ovcolumn name);
DROP FUNCTION IF EXISTS DropOverviewConstraints  (	ovtable name,	ovcolumn name);
DROP FUNCTION IF EXISTS _UpdateRasterSRID (	schema_name name, table_name name, column_name name,	new_srid integer);
DROP FUNCTION IF EXISTS UpdateRasterSRID (	schema_name name, table_name name, column_name name,	new_srid integer);
DROP FUNCTION IF EXISTS UpdateRasterSRID (	table_name name, column_name name,	new_srid integer);
DROP FUNCTION IF EXISTS ST_Retile (tab regclass, col name, ext geometry, sfx float8, sfy float8, tw int, th int, algo text );
DROP FUNCTION IF EXISTS ST_CreateOverview (tab regclass, col name, factor int, algo text );
DROP FUNCTION IF EXISTS st_makeemptycoverage (tilewidth int, tileheight int, width int, height int, upperleftx float8, upperlefty float8, scalex float8, scaley float8, skewx float8, skewy float8, srid integer );
DROP FUNCTION IF EXISTS postgis_noop (raster);
-- Drop all types if unused in column types.
DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'raster'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS raster CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'rastbandarg'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS rastbandarg CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'geomval'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS geomval CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'addbandarg'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS addbandarg CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'summarystats'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS summarystats CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'agg_count'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS agg_count CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'reclassarg'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS reclassarg CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'agg_samealignment'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS agg_samealignment CASCADE;

DO $$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN
		SELECT n.nspname, c.relname, a.attname, t.typname
		FROM pg_attribute a
		JOIN pg_class c ON a.attrelid = c.oid
		JOIN pg_namespace n ON c.relnamespace = n.oid
		JOIN pg_type t ON a.atttypid = t.oid
		WHERE t.typname = 'unionarg'
		  AND NOT (
				-- we exclude complexes defined as types
				-- by our own extension
				c.relkind = 'c' AND
				c.relname in ( 'raster','rastbandarg','geomval','addbandarg','summarystats','agg_count','reclassarg','agg_samealignment','unionarg' )
			)
	LOOP
		RAISE EXCEPTION
		  'Column "%" of table "%"."%" '
		  'depends on type "%", drop it first',
		  rec.attname, rec.nspname, rec.relname, rec.typname;
	END LOOP;
END;
$$;
-- NOTE: CASCADE is still needed for chicken-egg problem
--       of input function depending on type and type
--       depending on function
DROP TYPE IF EXISTS unionarg CASCADE;

-- Drop all support functions.
-- Drop all functions needed for types definition.
DROP FUNCTION IF EXISTS raster_in (cstring);
DROP FUNCTION IF EXISTS raster_out (raster);
-- Drop all tables.
-- Drop all schemas.

COMMIT;
