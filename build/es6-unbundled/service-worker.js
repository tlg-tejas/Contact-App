/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-route/app-location.html","bd5e056912b005b4a37253e14dc5a572"],["bower_components/app-route/app-route-converter-behavior.html","2476488d6a792c697533f1fc8fb8acd3"],["bower_components/app-route/app-route.html","82269d604404d0ecd468207b568d4be6"],["bower_components/app-storage/app-network-status-behavior.html","9235eec79ce62670e33d83c87d1fd823"],["bower_components/app-storage/app-storage-behavior.html","2662143b0ad7803477e55d6be7cc1440"],["bower_components/firebase/firebase-app.js","316687e98c55ae13c47c53e3a78ef8e8"],["bower_components/firebase/firebase-auth.js","91876fbb05a41b7f8b42b1bc90fa252a"],["bower_components/firebase/firebase-database.js","b94bb0f019927876b7864f8b5b4c4a79"],["bower_components/firebase/firebase-messaging.js","e95fe6467e8e1395a4db8b3347ea74b5"],["bower_components/firebase/firebase-storage.js","6aa2930921995124e1d4d05bfe8cfbc5"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","3891d462c464862c5706e114e1abe93b"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","de57201642e8aa7eadebad45ca7b35e7"],["bower_components/iron-behaviors/iron-button-state.html","2034e45c1e5117b83033713cda6a0b4f"],["bower_components/iron-behaviors/iron-control-state.html","d57c6bfd619425b963c65c312a054ab2"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","2c130887355bcec6b7b2ebe193f545ab"],["bower_components/iron-dropdown/iron-dropdown.html","c52449e0659595ee29d557741b24f4f4"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","b18754371211a8c6017ec2ee0f1ebea1"],["bower_components/iron-flex-layout/iron-flex-layout-classes.html","7fdc2ab3c7921949621e8374a86e2af4"],["bower_components/iron-flex-layout/iron-flex-layout.html","40fbf9b980a269b5507022f32f9b413c"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","b7b67529241d4996945b71a1c09f01b0"],["bower_components/iron-icon/iron-icon.html","86e2b60880947c0b39494a73411fbc11"],["bower_components/iron-icons/communication-icons.html","11ba510515f0e44ff68521fe50a80ef2"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","84a7393de41f8ea5da7a599f480b57f0"],["bower_components/iron-input/iron-input.html","40bb4bbc62b07540ba593d2cf74e7dca"],["bower_components/iron-location/iron-location.html","246e9e57c65edac20efdf755c7f58aa5"],["bower_components/iron-location/iron-query-params.html","68baaf760be6d810068b26c83f8e66ca"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","bb8aada82d13df5b839923fc817484b2"],["bower_components/iron-meta/iron-meta.html","d3401c6909ebd2a7da37f6bf5fae988b"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","340b583bc8f50cf5817490e60ca60939"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","05cc5c4d1abbf2d55d73d9b102013191"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2c99ff1debbe68090624b1a52f3f4a50"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","5902d04f185d2dc6291e0705a7b24725"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","b824f23f960fad504b5b9562dbd68570"],["bower_components/iron-pages/iron-pages.html","461dc38467532f0a57bf564301bcca78"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","5eaa8354f13c3334cfdd1438089dd429"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","8601c5c220d208435e3685dfdc063e2e"],["bower_components/iron-selector/iron-multi-selectable.html","802945ddfc16eb03e8b605fff57cebb9"],["bower_components/iron-selector/iron-selectable.html","b9248a704cc4895f7ecbccff8efd0edf"],["bower_components/iron-selector/iron-selection.html","30b5a0f391d92c70156b1830fb3bd0c6"],["bower_components/iron-selector/iron-selector.html","b16e67c27ef856b12149a467cc5223b0"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","7baac7bb9d9812449b62290a46f070d7"],["bower_components/neon-animation/animations/fade-in-animation.html","749c9d1d5b5f4f27d687fc197309a5c5"],["bower_components/neon-animation/animations/fade-out-animation.html","d68aac80ac6bc94606e236f5eaa405ef"],["bower_components/neon-animation/neon-animatable-behavior.html","110532d0bd679a9fffce01d4085f741d"],["bower_components/neon-animation/neon-animation-behavior.html","7851a2111778abe5f869bb6e1584b20b"],["bower_components/neon-animation/neon-animation-runner-behavior.html","0da4f61f6a232924d2871fe580f1f355"],["bower_components/paper-behaviors/paper-button-behavior.html","ba4f655d100442d73343d6e4f60aa358"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","3b088afa4531829d1a5b79d3bf5978f1"],["bower_components/paper-behaviors/paper-ripple-behavior.html","574608962bf3eb67383391cf8513d56b"],["bower_components/paper-button/paper-button.html","b0c95dacbbf7e1ce20ea182911dcbd34"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["bower_components/paper-dropdown-menu/paper-dropdown-menu.html","b36dd99a9ef58d3f83729bcff741482a"],["bower_components/paper-icon-button/paper-icon-button.html","a557e2789045f5c41da9befed2f6350c"],["bower_components/paper-input/paper-input-addon-behavior.html","2fc92460e7bae448bb21b4a896d98f07"],["bower_components/paper-input/paper-input-behavior.html","2477bf1b481a0c0846f045e98cf35ef4"],["bower_components/paper-input/paper-input-char-counter.html","3ae922107097dd92f27ca6833e346694"],["bower_components/paper-input/paper-input-container.html","456a5ceaf85fd9141c0df41c7a617aa6"],["bower_components/paper-input/paper-input-error.html","bc4f6ffdc9de51776c7240e05dbed3a1"],["bower_components/paper-input/paper-input.html","91a9206dde88d0826e29dc6cf1224f3e"],["bower_components/paper-item/paper-item-behavior.html","fe3b93f23bb620f4abcb1fa3b8cb0c48"],["bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["bower_components/paper-item/paper-item.html","bbcea6a06ad2e50f9d46e45adbe58514"],["bower_components/paper-listbox/paper-listbox.html","d33a53b16db2af1e3f40dbcb4116217f"],["bower_components/paper-menu-button/paper-menu-button-animations.html","5d24a43a8fd4c3c1b3a0a1b1fbf106a6"],["bower_components/paper-menu-button/paper-menu-button.html","c097e3240bee3dc2f69763f36d916887"],["bower_components/paper-ripple/paper-ripple.html","b4cc3ee650f23101e9a4a0be44968a1a"],["bower_components/paper-spinner/paper-spinner-behavior.html","8685ad432fbded77b263aad4a91034e5"],["bower_components/paper-spinner/paper-spinner-styles.html","f6b2d42a9d2262fafb034ea0f802fc80"],["bower_components/paper-spinner/paper-spinner.html","acff8d1e71eaac17569976125462ff67"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/paper-toast/paper-toast.html","44750c607be8c6e4e4f9f0560764092a"],["bower_components/polymer/lib/elements/array-selector.html","841dc72edc195009030cac467dcaccad"],["bower_components/polymer/lib/elements/custom-style.html","08afb86580116b7e4d39d43a39cd1d08"],["bower_components/polymer/lib/elements/dom-bind.html","41004de9dca438cb73383a94fe646d1f"],["bower_components/polymer/lib/elements/dom-if.html","c1fc3b3b3ddd0989b627cb0bfc520cb6"],["bower_components/polymer/lib/elements/dom-module.html","51f4c371c9410959c3feca850c742712"],["bower_components/polymer/lib/elements/dom-repeat.html","8ea3b0cf97eb7232f5f9a561d36115b3"],["bower_components/polymer/lib/legacy/class.html","72a154ebb7232938bdc65e94b13d7508"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","7b796531a0b47ac74059df0ada681333"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","727424c73ce82a221dd5d55dae8bfb7e"],["bower_components/polymer/lib/legacy/polymer-fn.html","80b9a95b6f9627267b498fae324c8aec"],["bower_components/polymer/lib/legacy/polymer.dom.html","44aedb235eec8a562cb3ad63bb1033ee"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","e259e4210ec65f4c25459720ce7b71b0"],["bower_components/polymer/lib/mixins/dir-mixin.html","db536a9ada8cdc0fb2fc010e59fbc5e5"],["bower_components/polymer/lib/mixins/element-mixin.html","a2607ad7b0e6e857edf8bb438dbd8030"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","11c9f3ad714623f52dea07e6afaa2b30"],["bower_components/polymer/lib/mixins/mutable-data.html","0c86e6cf2ad4f58a247cbb4e3b8fe365"],["bower_components/polymer/lib/mixins/properties-changed.html","941485133606f5066c9d713748ca896f"],["bower_components/polymer/lib/mixins/properties-mixin.html","b89faebafe8686dffaeb79a3abc83162"],["bower_components/polymer/lib/mixins/property-accessors.html","7287eb3f0383d7e8da9a3b18e569ed7e"],["bower_components/polymer/lib/mixins/property-effects.html","3f82d74daf72dbfaa8a652e42751c8af"],["bower_components/polymer/lib/mixins/template-stamp.html","30a841e5dc48ec28ae2ec04c071c6205"],["bower_components/polymer/lib/utils/array-splice.html","02e37f7a718cb6724e4c1101fd9fe693"],["bower_components/polymer/lib/utils/async.html","2f5b326d88e8030cd26781095235fd6c"],["bower_components/polymer/lib/utils/boot.html","b60843623cc8cb524686f5c9c77b77e0"],["bower_components/polymer/lib/utils/case-map.html","3348b08018d83d39a4447a6bbaa896af"],["bower_components/polymer/lib/utils/debounce.html","bdb9a2e69ead51e6b8bf27583d040e27"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","0e34b65431c3aca1e492f459f0f64623"],["bower_components/polymer/lib/utils/flush.html","02cf15aa4ad4cc7edc87d6c5724d2c0f"],["bower_components/polymer/lib/utils/gestures.html","23630718c66b674e8cd0cfd942b2b653"],["bower_components/polymer/lib/utils/html-tag.html","95f4ef70c3d2d142f390a98470c194b4"],["bower_components/polymer/lib/utils/import-href.html","d6093e9c471580c1cb35f7686c772fde"],["bower_components/polymer/lib/utils/mixin.html","5ec7b79aa4871070458783ac7c2980a9"],["bower_components/polymer/lib/utils/path.html","279780f8fac6e7f4048f3895f7a05fda"],["bower_components/polymer/lib/utils/render-status.html","c14138dff3da4d203b9bdca9bd93b929"],["bower_components/polymer/lib/utils/resolve-url.html","5bc2e90748b9845386f19a1eee5d1191"],["bower_components/polymer/lib/utils/settings.html","4f688f5909f8493a10a5012176c911cc"],["bower_components/polymer/lib/utils/style-gather.html","1e10e8f6f06cf5d4f976e3fd905f1252"],["bower_components/polymer/lib/utils/templatize.html","8c31c01b8471caf635004e0ca99a27b1"],["bower_components/polymer/lib/utils/unresolved.html","50b8ec3ab60b6b40f4cf4fc931027b80"],["bower_components/polymer/polymer-element.html","26c3b3b8ee7b81243474c7d95636d157"],["bower_components/polymer/polymer.html","72d557b84da0412316b422d8325ad25c"],["bower_components/polymerfire/firebase-app-script.html","df1897d11acb9c75522859d372873358"],["bower_components/polymerfire/firebase-app.html","8b89e6a29f30983d42f671c1bec82c34"],["bower_components/polymerfire/firebase-auth-script.html","12fe480c116018252246dd4366d1a1ef"],["bower_components/polymerfire/firebase-auth.html","7034b83e8607b1ef39999f0c280deb05"],["bower_components/polymerfire/firebase-common-behavior.html","ab4d195b855b906350db38ebefd25505"],["bower_components/polymerfire/firebase-database-behavior.html","7755d854daf8250c0fb33ea84e9e7e7b"],["bower_components/polymerfire/firebase-database-script.html","b280409885282a43d9b5dd1ee5226fed"],["bower_components/polymerfire/firebase-messaging-script.html","33e0a36b60580c0bcbde7440ce9216e7"],["bower_components/polymerfire/firebase-query.html","1d0e31691e893adee7951561945e0eaa"],["bower_components/polymerfire/firebase-storage-script.html","73903c0e578289a5910eaad341a730ca"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","e1adb71a5f681fab6f137f8ddd60d745"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","72c0678c9e5acee7852cd040f59a214e"],["bower_components/vaadin-checkbox/src/vaadin-checkbox.html","409a70e985775b1b35be932bb4d57243"],["bower_components/vaadin-checkbox/theme/lumo/vaadin-checkbox.html","a0eb79214424b285d8960d3d75bed2a9"],["bower_components/vaadin-control-state-mixin/vaadin-control-state-mixin.html","d161ac083e74ef39a9563a2f89381ee8"],["bower_components/vaadin-development-mode-detector/vaadin-development-mode-detector.html","95465283513b7302c13058aead9c5739"],["bower_components/vaadin-element-mixin/vaadin-element-mixin.html","51efca5f7c7fecadfbcaafb925bee557"],["bower_components/vaadin-lumo-styles/color.html","c9cc1552f5c2017cf1a68e3cfb3800c9"],["bower_components/vaadin-lumo-styles/font-icons.html","dd9ab894fcb060ab3ff1cb64d8c8b54b"],["bower_components/vaadin-lumo-styles/sizing.html","25ad9e9a8800d45087fd9be497606751"],["bower_components/vaadin-lumo-styles/spacing.html","83d43c70cb2c7cc5214b8b2c32c0a8a0"],["bower_components/vaadin-lumo-styles/style.html","bb0cafcf0c2fc5d5a5b3de32ea017429"],["bower_components/vaadin-lumo-styles/typography.html","47cb1b8195cd9a48a7913d219c26237a"],["bower_components/vaadin-lumo-styles/version.html","a921157aeb945f49db639d3e582e1333"],["bower_components/vaadin-text-field/src/vaadin-text-field-mixin.html","812898f0142ff24261e9cd087d6383d6"],["bower_components/vaadin-text-field/src/vaadin-text-field.html","e6534636c37fa91c38d800499af2ac69"],["bower_components/vaadin-text-field/theme/lumo/vaadin-text-field.html","6ece79de8511938a8a2a665f32c079fc"],["bower_components/vaadin-themable-mixin/vaadin-themable-mixin.html","edc41b958d3a312c4f694f563d3dec75"],["bower_components/vadin-grid/src/iron-list.html","b5aee2006e4e01a24d17b299f76466cc"],["bower_components/vadin-grid/src/vaadin-grid-column-reordering-mixin.html","1f14a362607581a5732dd32c705cd70e"],["bower_components/vadin-grid/src/vaadin-grid-column.html","3254c86183738c9141bb8594fda00f93"],["bower_components/vadin-grid/src/vaadin-grid-combined-mixin.html","36e5bce531ac54d0c1c6fc07bd8f18dc"],["bower_components/vadin-grid/src/vaadin-grid-data-provider-mixin.html","994e9a284699805f40c2be8cfb4feeb1"],["bower_components/vadin-grid/src/vaadin-grid-filter.html","a76bdd893a0c436844dd6afc37b2cc99"],["bower_components/vadin-grid/src/vaadin-grid-keyboard-navigation-mixin.html","bc66eedea3d78c57baf8b85a02130980"],["bower_components/vadin-grid/src/vaadin-grid-outer-scroller.html","4c37de2278f567b40a42a46abf65b742"],["bower_components/vadin-grid/src/vaadin-grid-scroll-mixin.html","72f054187338b4436875f757f13e1906"],["bower_components/vadin-grid/src/vaadin-grid-scroller.html","7816084fee5f67497ea4145a3989419f"],["bower_components/vadin-grid/src/vaadin-grid-sorter.html","c4f0681f31ff3d4bf541daf0bf119c95"],["bower_components/vadin-grid/src/vaadin-grid-styles.html","3460d660341278b553f0dca7b1cf4468"],["bower_components/vadin-grid/src/vaadin-grid-templatizer.html","794a0d520895cc198880b6397987305a"],["bower_components/vadin-grid/src/vaadin-grid.html","3db4b15d8002193dc7846572840ab024"],["bower_components/vadin-grid/theme/lumo/vaadin-grid-column.html","357d4bb681e1ec01093ec2abb253692f"],["bower_components/vadin-grid/theme/lumo/vaadin-grid-filter.html","538af3059fb178b73f2252947960f785"],["bower_components/vadin-grid/theme/lumo/vaadin-grid-sorter.html","48489bd6ccbbe153325d9037bce25461"],["bower_components/vadin-grid/theme/lumo/vaadin-grid.html","b1c549593a0c0be1b944405bfb672539"],["bower_components/vadin-grid/vaadin-grid-column.html","1f82cf4c0c3f0020231ddee29ec9c9d8"],["bower_components/vadin-grid/vaadin-grid-filter.html","f73625a7b02d56ae94120e94fbf72a4f"],["bower_components/vadin-grid/vaadin-grid-sorter.html","5f7f42ab50a10f23a6a7cc708edfb73a"],["bower_components/vadin-grid/vaadin-grid.html","b8c2e92f91cf6e789f757c3efad978fd"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["bower_components/webcomponentsjs/gulpfile.js","873c35c04ca32ef9b2ec53c73e8e561e"],["bower_components/webcomponentsjs/webcomponents-ce.js","3cf690e395879d897647b2ff82b49f60"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","6b401d50ef0cc585d24590ff8306bf82"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","cc82b353a1532fa5e0d0e0e856129df3"],["bower_components/webcomponentsjs/webcomponents-hi-sd.js","c3f9da85c5267fe7e8f5641a44748a57"],["bower_components/webcomponentsjs/webcomponents-hi.js","2e02d950c1c199919a375acfd1fbc108"],["bower_components/webcomponentsjs/webcomponents-lite.js","dd751c1d59908fe231e52aafa719e0f6"],["bower_components/webcomponentsjs/webcomponents-loader.js","596ad3dc06dfb78ecdc6bcee1d653f04"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","9cca8b616298bf48e2c5206584e8636a"],["bower_components/webcomponentsjs/webcomponents-sd.js","9733f7903831d49162a07247ffeac08a"],["index.html","fd0d33fe2998a7565c4970c368294e3d"],["src/common-styles.html","ea808448e776ee331225bbf0beeca81a"],["src/contact-app/app-header.html","2922ca6d8c0068d3dea9513f886c1502"],["src/contact-app/contact-app.html","4671181812e5a6bcb294514450b7133f"],["src/contact-app/my-acquaintances.html","208cca39a304ba73ae7fc77a5c128166"],["src/contact-app/my-contacts.html","cc188d17a88af76f44f4c14a32f518e8"],["src/contact-app/my-family.html","cb0ad121483fb79281300070c92299ee"],["src/contact-app/my-following.html","665e616dcb4cca7ceb3adf424afa33e3"],["src/contact-app/my-friends.html","feac3e0132245b73f8307b2fa6211664"],["src/contact-app/my-new.html","b831dee71ef9402efc6f0192d18bebd4"],["src/contact-app/my-view404.html","86ebc5f0ed3d450716da989b57f0bb93"],["src/contact-app/pre-login-notes.html","750826bb52e6da9eed9154f6dcdb3c19"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







