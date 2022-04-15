@php
$test_button_data = [
  'title' => 'Go to Sage',
  'url' => 'https://roots.io/sage/',
  'openInNewTab' => true
];
@endphp
<div class="min-h-screen flex items-center justify-center">
  <div data-sage-component="Button" data-props="{{ json_encode($test_button_data) }}"></div>
</div>
