const ngModuleName = 'formlyRepeatingSection';
const angular = window.angular;
const ngModule = angular.module(ngModuleName, [ 'formly' ]);

import repeatingSection from './repeating-section';
repeatingSection(ngModule);

export default ngModuleName;
