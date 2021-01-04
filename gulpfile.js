
const gulp = require('gulp'); 
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer'); 
const concat = require('gulp-concat'); 
const terser = require('gulp-terser');
const browserSync = require('browser-sync');

gulp.task('bs-reload', function(done) {
    browserSync.reload();
    done();
    
  });

gulp.task('html', function(){    
    return gulp.src('src/*.html')                
        .pipe(gulp.dest('public')) 
        .pipe(browserSync.reload({ stream: true })); 
});

gulp.task('css', function(){    
    return gulp.src('src/styles/**/*.scss')       
        .pipe(sass({ outputStyle: 'nested' }))      
        .pipe(autoprefixer({ cascade: false }))      
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.stream()); 
});

gulp.task('js', function(){    
    return gulp.src('src/js/**/*.js')          
        .pipe(concat('main.js'))       
        .pipe(terser({ format: {
            beautify: true
            }
        }))       
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream()); 
});

gulp.task('html-dist', function(){    
    return gulp.src('src/*.html')                
        .pipe(gulp.dest('docs')); 
});

gulp.task('css-dist', function(){    
    return gulp.src('src/styles/main.scss')       
        .pipe(sass({ outputStyle: 'compressed' }))      
        .pipe(autoprefixer({ cascade: false }))       
        .pipe(gulp.dest('docs/styles')); 
});

gulp.task('js-dist', function(){    
    return gulp.src('src/js/**/*.js')          
        .pipe(concat('main.js'))       
        .pipe(terser())       
        .pipe(gulp.dest('docs/js')); 
});

gulp.task('docs', gulp.parallel('html-dist', 'css-dist', 'js-dist'));

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    });
 
    gulp.watch('src/*.html', gulp.series('html', 'bs-reload'));
    gulp.watch('src/styles/**/*.scss', gulp.series('css', 'bs-reload'));
    gulp.watch('src/js/**/*.js', gulp.series('js', 'bs-reload'));
 
});