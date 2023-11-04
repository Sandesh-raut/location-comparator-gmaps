# Location Comparator for Google Maps

## Overview
The "Location Comparator for Google Maps" tool is designed to offer an in-depth visualization between two specific types of locations: 'Real' and 'Utility'. Harnessing the capabilities of the Google Maps API, this tool provides a clear and intuitive interface for comparing geographical points, making it invaluable for various analytical pursuits.

## Features
- **Dual Location Visualization:** Seamlessly showcases both the 'Real' and 'Utility' coordinates on the map, allowing for an instantaneous side-by-side comparison.
  
- **Dynamic Circle Radius:** Introduces the capability to customize the radius of a circle on the map, enhancing the versatility of area comparison around a particular point.
  
- **Support for Multiple Locations:** Equipped to handle and compare up to 20 unique locations, ensuring comprehensive analysis.

- **Dynamic Map Indexing:** Ingeniously determines the button-to-coordinate mapping based on the structure of the incorporated HTML.

- **Standalone Static Version:** For those desiring a simplified approach, a `static.html` is provided which encapsulates the core functionality without the need for additional UI or forms.

## Usage
1. Set up the Google Maps API for your project.
2. Integrate the script and connect the necessary data attributes in your HTML setup.
3. Navigate between 'Real' and 'Utility' locations using the provided user-friendly buttons.

## Setting up the API Key for Production

To get the tool up and running in a production environment, you'll need to incorporate your Google Maps API key. You can obtain this key from the [Google Cloud Console](https://console.cloud.google.com/).

Once you have the API key, update the script tag in your HTML as shown:

```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap"></script>
```
Replace `YOUR_API_KEY_HERE` with your actual API key.

> **Note:** Ensure you've set up the necessary permissions and billing (if applicable) for your API key in the [Google Cloud Console](https://console.cloud.google.com/). Also, for security reasons, restrict the key to be used only by your application's domain.

## TO-DO
- **Custom Zoom Controls:** Integrated buttons to effortlessly zoom into any of the displayed locations, providing a detailed view of the area.

## Contribution
Your insights and improvements are valued! You're encouraged to fork, highlight issues, or submit pull requests. Let's collaboratively refine this tool for maximum efficiency and user satisfaction.
