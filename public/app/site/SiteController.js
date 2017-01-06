
angular.module('site').controller('SiteController', SiteController);

SiteController.$inject = ['$rootScope','$http', '$q'];

function SiteController($rootScope,$http, $q) {

    var vm = this;


    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    var container;
    var camera, scene, renderer, composer, controls;
    var loader;
    // Initialize Three.JS
    init();
    //
    // SEA3D Loader
    //
    loader = new THREE.SEA3D( {
        autoPlay : true, // Auto play animations
        container : scene // Container to add models
    } );
    loader.onComplete = function( e ) {
        // Get camera from SEA3D Studio
        // use loader.get... to get others objects
        var cam = loader.getCamera( "Camera007" );
        camera.position.copy( cam.position );
        camera.rotation.copy( cam.rotation );
        controls = new THREE.OrbitControls( camera );
        animate();
    };
    loader.load( './app/site/mascot.tjs.sea' );
    //
    function init() {
        scene = new THREE.Scene();
        container = document.createElement( 'div' );
        document.body.appendChild( container );
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 1000, - 300, 1000 );
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x333333, 1 );
        container.appendChild( renderer.domElement );
        // post-processing
        composer = new THREE.EffectComposer( renderer );
        var renderPass = new THREE.RenderPass( scene, camera );
        var copyPass = new THREE.ShaderPass( THREE.CopyShader );
        composer.addPass( renderPass );
        var vh = 1.4, vl = 1.2;
        var colorCorrectionPass = new THREE.ShaderPass( THREE.ColorCorrectionShader );
        colorCorrectionPass.uniforms[ "powRGB" ].value = new THREE.Vector3( vh, vh, vh );
        colorCorrectionPass.uniforms[ "mulRGB" ].value = new THREE.Vector3( vl, vl, vl );
        composer.addPass( colorCorrectionPass );
        var vignettePass = new THREE.ShaderPass( THREE.VignetteShader );
        vignettePass.uniforms[ "darkness" ].value = 1.0;
        composer.addPass( vignettePass );
        composer.addPass( copyPass );
        copyPass.renderToScreen = true;
        // extra lights
        scene.add( new THREE.AmbientLight( 0x333333 ) );
        // events
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        composer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    //
    var clock = new THREE.Clock();
    function animate() {
        var delta = clock.getDelta();
        requestAnimationFrame( animate );
        // Update SEA3D Animations
        THREE.SEA3D.AnimationHandler.update( delta );
        // Update Three.JS Animations
        THREE.AnimationHandler.update( delta );
        render( delta );
    }
    function render( dlt ) {
        composer.render( dlt );
    }


}