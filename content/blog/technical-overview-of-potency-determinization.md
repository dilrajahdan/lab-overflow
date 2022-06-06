---
title: Cannabis Lab 101&#58; Technical Overview of Potency Determinization
author: Eric Burtin Martin
description: Over in the Potency department, it is the cannabis chemist's job to accurately determine the cannabinoid profile of any sample that enters the laboratory. Let’s break down how cannabis laboratories do this from beginning to end to help you understand the process
image: /blog-content/shimadzu-HPLC.jpeg
date: 2020-07-27
tags:
  - potency
  - cannabinoid-profile
  - separation-methods
  - public-domain
forumLink: https://forum.laboverflow.com/c/assays/potency-testing
forumLinkText: Continue the Potency Testing discussion on the forum
---

Over in the Potency department, it is the cannabis chemist's job to accurately determine the cannabinoid profile of any sample that enters the laboratory. Let’s break down how cannabis laboratories do this from beginning to end to help you understand the process.

<!--more-->

![Shimadzu HPLC (High-Performace Liquid Chromatography) Instrument used to quantify cannabinoids](/blog-content/shimadzu-HPLC.jpeg 'Shimadzu HPLC (High-Performace Liquid Chromatography) Instrument used to quantify cannabinoids')
_Shimadzu HPLC (High-Performace Liquid Chromatography) Instrument used to quantify cannabinoids [source](https://www.ssi.shimadzu.com/industry/cannabis-testing-solutions.html)_

Having worked in the testing sector of the cannabis industry for over 4 years now, I have realized people are in the dark when it comes to how the potency of cannabis products is actually quantified. With this said, I want to guide you through a pseudo-deep dive into just how a cannabis chemist can take a flower and identify the percent cannabinoids contained within.

## Step 1: Homogenize

When a cannabis sample — whether it be a flower, concentrate, or edible — enters the laboratory, it is homogenized to ensure a representative sample is obtained by the lab (keep in mind, this step may or may not be needed depending on the state’s regulations). Proper steps should be taken to ensure no cross-contamination occurs during this step.

## Step 2: Extraction

The homogenized cannabis sample is brought to the potency department and the extraction process begins. From this homogenate, most labs use an analytical balance — *with precision to 0.0000g* — to weigh out an appropriate amount of sample into a sterile conical. From here they then add a known amount of ‘extractant’ solution to the samples. This extractant solution is comprised of an organic solvent (_oftentimes methanol, ethanol, acetonitrile, isopropanol, chloroform, or mixtures of each_) which provides an environment that is conducive for cannabinoid extraction. More information on commonly used solvents can be found online. Cannabinoids are quite hydrophobic and therefore do not dissolve easily into aqueous solutions. From here, the conical is then either shaken, heated lightly, stirred, ground (by Genogrinder), or sonicated (_agitation via sound energy_) to ensure maximum extraction efficiency — the lab wants all the cannabinoids in the extractant and out of the starting material.

![Cannabis flower in extraction solvent prior to pulverization](/blog-content/cannabis-flower-in-extraction-solvent-prior-to-pulverization.jpeg 'Cannabis flower in extraction solvent prior to pulverization')
_Cannabis flower in extraction solvent prior to pulverization [source](https://cannabisgxp.com/2018/12/31/cannabis-analytical-and-quality-control-testing/)_

> Note: Edibles have a variety of unique and specialized extraction techniques due to the vast amount of variation in products — gummies, brownies, pills, suppositories (rear-end edible), tinctures, drinks, etc. — so the above methodology is not a one size fits all technique.

## Step 3: Dilution

Now that the have the cannabinoids where they want them, they often-times have to dilute the solution so that an appropriate amount is loaded onto the instrumentation. They do this via the nifty quintessential chemistry device — the pipette. If the concentrations are too high, the sample will saturate the instrument detector and cause the data to be off of the calibration curve and unusable. The solution from the extraction conical is diluted and placed in a tiny 2mL HPLC vial — it is now ready for analysis via HPLC.

![Utilizing an analytical pipette to perform dilutions with a high level of accuracy](/blog-content/utilizing-an-analytical-pipette-to-perform-dilutions-with-a-high-level-of-accuracy.jpeg 'Utilizing an analytical pipette to perform dilutions with a high level of accuracy')
_Utilizing an analytical pipette to perform dilutions with a high level of accuracy [source](https://unsplash.com/photos/qI7USKbZY_A)_

## Step 4: High-Performance Liquid Chromatography

> Time for the juicy scientific details! This is where all the magic happens — you know, science magic.

At this point, we transition from the wet-chemistry side of the process to the analytical chemistry side of things. May I introduce the workhorse of the chemistry industry — the <b>H</b>igh-<b>P</b>erformace <b>L</b>iquid <b>C</b>hromatograph. After this, you should be able to have a basic understanding of how an HPLC works and what the field of chromatography entails.

![Overview of an HPLC instrument and the main components](/blog-content/overview-of-an-HPLC-instrument-and-the-main-components.png 'Overview of an HPLC instrument and the main components')
_Overview of an HPLC instrument and the main components [source](https://www.agilent.com/en/product/liquid-chromatography/hplc-systems/analytical-hplc-systems/1260-infinity-ii-lc-system#literature)_

Let us begin by explaining what **chromatography** is:

> Chromatography is the separation of a mixture by passing it through a medium in which the components move at different rates — it was originally named to describe the separation of colors, hence the prefix ‘chroma’

So, pretty much, chromatography is how chemists take a solution of various chemical compounds and separate them — which is utterly baffling if you think about it, but I digress. So, now that we know what chromatography means in a generic sense, let’s see how the HPLC actually separates the extractant into all of the individual cannabinoids the labs are looking for:

_D9-THC, D8-THC, THCA, CBD, CBDA, THCV, CBDV, CBG, CBGA, CBN, CBC, CBDVA,CBNA, D10-THC, D10a-THC, and more._

### Introducing the Autosampler/Injector module:

![View into the HPLC autosampler/injection module](/blog-content/view-into-the-HPLC-autosampler-injection-module.jpeg 'View into the HPLC autosampler/injection module')
_View into the HPLC autosampler/injection module [source](https://www.youtube.com/watch?v=VIWy8nJf1cg)_

This is the loading station of the HPLC. When the samples are extracted they are placed in the refrigerated autosampler ready for injection into the instrument. Once the instrument is ready, it will grab one of the vials with a robotic arm and move it into the injector and a needle will uptake a very small amount of sample, typically 2–10µL worth —a drop of water is around 50µL. Once the sample is in the needle it is then injected into the instrument and all the cannabinoids are on their way towards the separation column.

### Introducing the Mobile Phase/Pump module:

The mobile phase is the liquid part of the term HPLC. It is called the mobile phase because it is being pumped throughout the entire system. As the name HPLC also entails, the system is under quite high pressures ranging from 2000 to 8000 PSI (_140–550bar_). The mobile phase not only moves the injected sample throughout the instrument but also plays a major role in the separation of the cannabinoids as well. The pump module does this by mixing both polar (_hydrophilic_) and non-polar (_hydrophobic_) mobile phase solutions in changing proportions over time, called a gradient. I will explain further in the column oven module section.

![Simplified flow diagram of an HPLC: Note that usually a polar and non-polar mobile phase are used in varying proportions for cannabinoid separations](/blog-content/simplified-flow-diagram-of-an-HPLC.jpeg 'Simplified flow diagram of an HPLC: Note that usually a polar and non-polar mobile phase are used in varying proportions for cannabinoid separations')
_Simplified flow diagram of an HPLC: Note that usually a polar and non-polar mobile phase are used in varying proportions for cannabinoid separations. [source](http://mytutorial.srtcube.com/high-performance-liquid-chromatography-hplc/environment-science/826-528#7919)_

### Column (stationary phase)/Oven Module:

This is where all of the chromatography separation chemistry occurs! After being injected, the cannabinoids, in a single mixed ‘packet’, move together into the separations column/oven module. The column is filled with a porous ‘stationary phase’ consisting of a densely packed hydrophobic/non-polar material. The cannabinoids are pushed through this ‘stationary phase’ by the ‘mobile phase’ and begin to separate out into discrete packets of different cannabinoids. This separation is based on polarity, molecular size, functional groups, and other interactions. But I have a fun and easy way of imagining this.

#### Let me explain:

> You can think of the separations column in an HPLC as a traffic jam. All of the vehicles (cannabinoids) enter the highway and the motorcycles make their way through the traffic first, carpool vehicles second, small cars third, and semi-trucks exit last. The traffic is the stationary phase and the cars are the cannabinoids.

As fun as this explanation is, it doesn’t take into consideration the mobile phase composition or column oven temperatures which also play a huge role in the separation as well. An average run-time for a single sample to be completed from injection to finish is around 10 to 15 minutes. Over the course of this time, the mobile phase typically starts off with a larger percent of polar (aqueous) solvent and over time reduces the amount of polar solvent, increasing the amount of non-polar solvent (hydrophobic).

Do you remember when we learned that cannabinoids are hydrophobic? Well, when the cannabinoids first enter the hydrophobic/non-polar column, the mobile phase consists of a high amount of polar solution — this makes the cannabinoids want to stay in the column and interact with it, slowing their progress through the column. The more polar compounds will exit the column first and over time, when the mobile phase is changing to being more non-polar, other cannabinoids will decide to ‘hop’ into the mobile phase since they are more easily dissolved in it as it gets less and less polar.

**This short 30-second video is a quick visualization of what we have talked about:**

<div class="aspect-ratio">
<iframe src="https://www.youtube.com/embed/mPO7Tv2mIJU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

_Visualization of how a column separates compounds to be analyzed in an HPLC_

### The Ultra-Violet Detector:

Once the now separated cannabinoids exit the column they move into a tiny window that passes in front of a UV light-bulb detector. This detector has a baseline absorbance — which is plotted on a graph as a flat line — and when a cannabinoid packet passes in front of the UV light it absorbs some of that UV light and the baseline changes, making a little peak. The peak is the instrument simply saying “something passed by that absorbed UV light” and the larger the peak, the more cannabinoids that passed by. Inside of each peak, labs can extract a unique spectral ‘fingerprint’ of each cannabinoid since they absorb UV light in unique ways — this lets the lab verify that the peak is actually the cannabinoid reported.

Below you can see what a typical chromatogram looks like after a sample has been run. The x-axis is the time since the injection and the y-axis is an arbitrary absorbance unit (the larger the higher the concentration). You can see that the CBDV came out of the column first and THCA came out of the column last.

![A chromatogram presented by Shimadzu for a cannabinoid separations method](/blog-content/chromatogram-presented-by-shimadzu-for-a-cannabinoid-separations-method.jpeg 'A chromatogram presented by Shimadzu for a cannabinoid separations method')
_A chromatogram presented by Shimadzu for a cannabinoid separations method. [source](https://www.shimadzu.eu.com/cannabis-analyzer-potency)_

## Step 5: Data Analysis

It is at this moment that the analyst can then interpret the data from the sample by checking the chromatograms. The analyst will look at each chromatogram and ensure that each cannabinoid flagged is within an expected retention time (_the time on the x-axis_) and that each cannabinoid’s spectral fingerprint matches. Alongside that, labs run a plethora of laboratory quality control samples alongside each set of client samples ran. Per regulations, cannabis labs must run on average — a blank sample, a matrix blank, a laboratory control sample, continuing calibration verifications every 10 samples, as well as replicate samples (_I will leave the details of these for another day_). In order for a result to be reported, each one of these quality control checks has to be verified prior to the release of data to the client.

**How do they know each peak is what it is though?**

Before any client samples are run, a lab must validate their methods and procedures to prove accuracy, precision, reproducibility, detection limits, and more. During validation, labs run pure standards of the cannabinoids they are testing for — one at a time — to determine the retention time (time on the x-axis) of each cannabinoid. Using the retention time and the UV spectral ‘fingerprint’ the lab can be confident in their identification of each cannabinoid. See below:

![UV absorbance spectra of various cannabinoids. The x-axis is the wavelength of light in nanometers (220nm to 360nm) and the y-axis is the intensity of absorption at that wavelength](/blog-content/UV-absorbance-spectra-of-various-cannabinoids.png 'UV absorbance spectra of various cannabinoids. The x-axis is the wavelength of light in nanometers (220nm to 360nm) and the y-axis is the intensity of absorption at that wavelength')
_UV absorbance spectra of various cannabinoids. The x-axis is the wavelength of light in nanometers (220nm to 360nm) and the y-axis is the intensity of absorption at that wavelength. [source](https://www.shimadzu.eu.com/cannabis-analyzer-potency)_

As you can see, certain cannabinoids have similar UV absorption ‘fingerprints’ but they are still unique compared to other non-cannabinoid compounds. So if an analyst is questioning a peak/compound, they can view the spectrum and see if it matches the expected spectrum to verify the peak.

### How do they determine the concentration though?

Laboratories calibrate their instruments using standards of known concentrations. They make a calibration curve consisting of multiple different concentration points to show the instrument how large a peak should be at each of the various concentrations. The instrument can then take an unknown value and determine the area under the curve (the peak) and plot it against the calibration curve to determine a concentration. See below:

![Example of a calibration curve set for 9 analytes](/blog-content/example-of-a-calibration-curve-set-for-9-analytes.jpeg 'Example of a calibration curve set for 9 analytes')
_Example of a calibration curve set for 9 analytes. [source](https://www.labx.com/resources/fast-and-easy-cannabis-potency-testing-using-an-entry-level-agilent-1260-infinity-lc/140y)_

## And that is all for today!

> Thank you for taking the time to learn more about how potency is determined in the cannabis testing space. I hope you found this interesting and I would love to hear what you have to say. If you have any questions or would like me to cover other topics please let me know in the comments. I will gladly write about other assays in the testing space or dive even deeper into potency topics.

Note: All information provided is available in the public knowledge domain.
