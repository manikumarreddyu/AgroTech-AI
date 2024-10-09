import React, { useState, useEffect } from "react";

function Article() {
  return (
    <div class="container mx-auto max-w-90 mt-8 p-4">
      <h1
        id="22-tomato-diseases-identification-treatment-and-prevention"
        class="text-4xl font-bold text-center mt-8 mb-4"
      >
        Tomato Diseases: Identification, Treatment and Prevention
      </h1>
      <img
        src="https://www.thespruce.com/thmb/LAGaTo44gh2sfboDWPDBAuoln8I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1327465876-6eceff5a4dc44eefb52be6fc349f4215.jpg"
        alt="Tomato Diseases"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />
      <p class="text-gray-600 text-sm text-center mb-4">
        Albert Fertl / Getty Images
      </p>
      <p class="text-lg mb-4">
        Knowing how to identify and treat common tomato diseases is critical for
        growing successful crops. Most common diseases are caused by types of
        fungi that favor certain weather conditions, such as excessive rain
        during cool or warm periods.
      </p>
      <h2
        id="tips-for-keeping-your-tomato-plants-healthy"
        class="text-xl font-bold mb-2"
      >
        Tips for Keeping Your Tomato Plants Healthy
      </h2>
      <p class="text-lg mb-4">
        &#x2022; Good garden practices go a long way to discourage infections,
        including:
      </p>
      <ul class="list-none mb-4">
        <li class="mb-2">
          &#x2022; Crop rotation to avoid diseases lurking in the soil
        </li>
        <li class="mb-2">&#x2022; Debris removal</li>
        <li class="mb-2">
          &#x2022; Growing plants on support structures so the foliage does not
          touch the ground
        </li>
        <li class="mb-2">&#x2022; Weed and pest control</li>
        <li class="mb-2">
          &#x2022; Growing the plant in full sun (six hours a day)
        </li>
        <li class="mb-2">
          &#x2022; Proper spacing between plants for air circulation and to
          prevent soggy conditions
        </li>
      </ul>
      <p class="text-lg mb-4">
        Even the hardiest crop can succumb to any of the following common
        diseases. Here are symptoms to watch for and ways to keep your tomatoes
        healthy.
      </p>
      <p class="text-lg font-bold mb-4">&#10687; Common Tomato Diseases</p>
      <table class="w-full border-collapse border border-gray-300 rounded-lg mb-4">
        <thead>
          <tr>
            <th class="bg-gray-100 border border-gray-300 p-2">Disease</th>
            <th class="bg-gray-100 border border-gray-300 p-2">
              Primary Symptom
            </th>
            <th class="bg-gray-100 border border-gray-300 p-2">Treatment</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Early Blight</td>
            <td class="border border-gray-300 p-2">
              Dark spots with rings on lower leaves
            </td>
            <td class="border border-gray-300 p-2">Pruning, Fungicide</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">
              Fusarium or Verticillium Wilt
            </td>
            <td class="border border-gray-300 p-2">
              Wilting during day, leaves turn yellow
            </td>
            <td class="border border-gray-300 p-2">
              Plant resistant varieties
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Powdery Mildew</td>
            <td class="border border-gray-300 p-2">
              Light green or yellow spots on leaves turn dusty white
            </td>
            <td class="border border-gray-300 p-2">
              Sulfur dust, Fungicides, Biofungicides, Horticultural oil
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Anthracnose</td>
            <td class="border border-gray-300 p-2">
              Small, sunken, water-soaked spots on ripening fruit
            </td>
            <td class="border border-gray-300 p-2">Fungicide</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Septoria Leaf Spot</td>
            <td class="border border-gray-300 p-2">
              Small, brown, round spots on leaves
            </td>
            <td class="border border-gray-300 p-2">Fungicide, Biofungicide</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Botrytis</td>
            <td class="border border-gray-300 p-2">
              Gray-brown mold on leaves, stems, or fruit
            </td>
            <td class="border border-gray-300 p-2">
              Fungicide, Biofungicide specific for gray mold
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Bacterial Speck</td>
            <td class="border border-gray-300 p-2">
              Irregular brown or black spots near leaf margins, on stems or
              fruit
            </td>
            <td class="border border-gray-300 p-2">Copper fungicide</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Southern Blight</td>
            <td class="border border-gray-300 p-2">
              Stem lesions near the soil line
            </td>
            <td class="border border-gray-300 p-2">
              Solarization, Fungicides, Biofungicides, Soil fumigants
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Gray Leaf Spot</td>
            <td class="border border-gray-300 p-2">
              Small dark spots with yellow halos
            </td>
            <td class="border border-gray-300 p-2">
              Select resistant varieties
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Late Blight</td>
            <td class="border border-gray-300 p-2">
              Greasy brown blotches with white mold
            </td>
            <td class="border border-gray-300 p-2">Copper spray</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Blossom End Rot</td>
            <td class="border border-gray-300 p-2">
              Black-brown spots at blossom end
            </td>
            <td class="border border-gray-300 p-2">
              Deep watering, Add garden lime
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Buckeye Rot</td>
            <td class="border border-gray-300 p-2">Spots look like buckeyes</td>
            <td class="border border-gray-300 p-2">Avoid surface flooding</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Gray Wall</td>
            <td class="border border-gray-300 p-2">Blotchy, mottled fruits</td>
            <td class="border border-gray-300 p-2">Good garden hygiene</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Leaf Mold</td>
            <td class="border border-gray-300 p-2">
              Pale yellow-green spots on leaves with gray velvety growth
            </td>
            <td class="border border-gray-300 p-2">
              Increase air circulation, Water at soil line
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Tomato Pith Necrosis</td>
            <td class="border border-gray-300 p-2">
              Blackening stems and leaves, pith disintegrates
            </td>
            <td class="border border-gray-300 p-2">Water at soil line</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Damping Off</td>
            <td class="border border-gray-300 p-2">
              Seedlings fail to thrive outdoors
            </td>
            <td class="border border-gray-300 p-2">
              Plant seeds indoors, Avoid nitrogen fertilizer
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Mosaic Virus</td>
            <td class="border border-gray-300 p-2">Curling, mottled leaves</td>
            <td class="border border-gray-300 p-2">
              Preventive reflective mulch
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Bacterial Wilt</td>
            <td class="border border-gray-300 p-2">
              Wilting, yellowing leaves
            </td>
            <td class="border border-gray-300 p-2">
              Remove infected plants, Rotate solanaceous crops
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Root Knot Nematodes</td>
            <td class="border border-gray-300 p-2">
              Stunted plants, roots with egg masses
            </td>
            <td class="border border-gray-300 p-2">
              Rotate between hosts and non-hosts, Marigolds
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Sunscald</td>
            <td class="border border-gray-300 p-2">Burnt, scalded tomatoes</td>
            <td class="border border-gray-300 p-2">
              Protect tomato plants from intense sun
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Bacterial Spot</td>
            <td class="border border-gray-300 p-2">
              Brown spots and holes in leaves, spots on fruits
            </td>
            <td class="border border-gray-300 p-2">
              Remove infected plants, Rotate crops
            </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="border border-gray-300 p-2">Yellow Leaf Curl</td>
            <td class="border border-gray-300 p-2">
              Small leaves that curl upward, lack of fruit
            </td>
            <td class="border border-gray-300 p-2">
              Aggressive crop rotation, Whitefly management
            </td>
          </tr>
        </tbody>
      </table>
      <ul class="diseases-list">
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="early-blight" class="disease-title text-2xl font-bold mb-2">
            Early Blight
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/kJck5uhjlznm6KGUBMihzkulr28=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-161382852-6cf14a3b2df24e26ae99d8b6cf5ccd57.jpg"
              alt="Early blight"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Early blight caused by <em>Alternaria</em> fungus, is the most
            common type of leaf spot disease on tomatoes. Early blight is more
            prevalent in hot, humid regions and remains in the soil for one
            year. Wet weather can bring on an attack. In areas impacted by early
            blight, choose disease-resistant cultivars with Resistant to EB
            (Early Blight) labels.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Dark brown spots
            encircled with rings start on the lowest leaves and move up,
            eventually causing foliage to shrivel, dry up, and fall. Lesions
            develop on stems and fruits. The defoliation causes sunscald.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Remove lower leaves,
            including up to a third of the infected foliage. Apply a tomato
            fungicide at the first sign of infection or when weather conditions
            are favorable for the disease to develop. Do not compost affected
            plants.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Prevent early blight
            by watering at the soil level and{" "}
            <a
              href="https://www.thespruce.com/what-is-mulch-1402413"
              class="external-link"
            >
              mulching
            </a>
            . Keep adequate space between plants and rows; use stakes and
            practice good weed control. Prune bottom leaves from plants and
            rotate tomato plants and other nightshades every two years. Copper
            and/or sulfur sprays can prevent further development of the fungus.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="fusarium-or-verticillium-wilt"
            class="disease-title text-2xl font-bold mb-2"
          >
            Fusarium or Verticillium Wilt
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/qjSYnYFAmUzeldSb3w0eK_UOMFM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1287462774-fc2bc014eb0d4775bf8f894eec52f0e3.jpg"
              alt="Fusarium or Verticillium Wilt"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Fusarium wilt or verticillium wilt are confused with one another but
            they are both fungal diseases with similar issues.
          </p>
          <ul class="disease-causes list-none mb-4">
            <li class="mb-2">
              Fusarium wilt is caused by <em>Fusarium oxysporum.</em>
            </li>
            <li class="mb-2">
              Verticillium wilt is caused by <em>Verticillium dahliae.</em>
            </li>
          </ul>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> In warm weather, the
            entire plant wilts down during the day, often recovering at night.
            Symptoms start on older, lower leaves and move upward. Eventually
            leaves on one side turn yellow, dry up, turn brown, and fall off.
            The inner tissue of the lower stem turns red or black. Plants may
            die quickly or succumb in a week or more.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Treatment is similar
            for both types of wilt. There is no fungicide for wilt; remove and
            dispose of infected plants and roots. Fungus spores can remain in
            soil for many years, but this disease does not spread among plants
            grown in the same season.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Prevent the diseases
            by planting resistant varieties labeled VFN or FN. Keep tools clean
            and practice a three-year crop rotation. Fusarium wilt is hosted by
            pigweed and crabgrass so weed control is important. Avoid excessive
            nitrogen fertilizers which encourage disease.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="powdery-mildew" class="disease-title text-2xl font-bold mb-2">
            Powdery Mildew
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Powdery Mildew"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Powdery mildew spreads by three different types of airborne fungi.
            The type of spore differs according to temperature but high humidity
            levels increase disease occurrence. Fruits do not develop powdery
            mildew but defoliation leads to sunscald and crop loss.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Yellow spots appear on
            leaves turning to white powdery lesions coating the entire leaf and
            appearing on stems.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Stop the spread of
            powdery mildew by treating the entire crop with with sulfur dust,
            fungicides, biofungicides, and horticultural oils. Remove infected
            leaves and buds.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Prevent powdery
            mildew by allowing adequate space between plants. Prune tomato
            plants for good air circulation. Provide regular consistent
            hydration at soil level and avoid wetting leaves.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="anthracnose" class="disease-title text-2xl font-bold mb-2">
            Anthracnose
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/IL47s4EnKZM9zuwO54gNUH-ce7U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1297736308-f91c96d60256429cb6a56260a8ec8ea7.jpg"
              alt="Anthrocnose"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Anthracnose is a common fungal disease that causes fruit to rot.
            It's caused by <em>Colletotrichum coccodes,</em> a fungus that
            favors warm temperatures, wet conditions, and poorly-drained soil.
            The fungus is often splashed onto the fruit from the soil. It can
            also take hold on spots of early blight or dying leaves.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Small, round, and
            sunken water-soaked spots appear on fruit and increase in concentric
            circles causing tomatoes to rot. Leaves may develop small, round
            spots with yellow halos. Infection starts in small immature fruits
            but symptoms don't appear until ripening.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Copper sprays offer
            some resistance but these fungicides are more effective as a
            preventive measure. Apply tomato fungicide to your entire crop at
            the first sign of infection or when weather conditions are favorable
            for disease to take hold.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Plant certified seeds
            in well-draining soil, remove the lower 12 inches of leaves to
            prevent contact with the soil, stake plants, mulch, practice good
            weed control, and water at the soil level. Avoid letting tomatoes
            overripen on the vine and dispose of rotten fruit and debris.
            Practice crop rotation every two years along with other nightshades.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="septoria-leaf-spot"
            class="disease-title text-2xl font-bold mb-2"
          >
            Septoria Leaf Spot
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/YryXnM5lQ-0rRDOkx6q2g6avkS4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1286441510-2ba6ca53c008436c9696ca3d568617c8.jpg"
              alt="Septoria Leaf Spot"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            The <em>Septoria</em> fungus causes septoria leaf spot. The fungal
            infection affects leaves but not the fruit. It is sometimes mistaken
            for late blight. Insects, tools, and water spread fungus spores
            which remain in the soil for up to two years. This fungus thrives in
            warm, wet weather so watch for symptoms and act immediately.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Symptoms are similar to
            early blight, but septoria more often appears at the first fruit
            set. This fungus appears on leaves as multiple small, dark, circles
            that enlarge to 1/3 to 1/4-inch in diameter. The spots develop a tan
            or gray center, and the leaves eventually wilt and fall off. It
            spreads rapidly causing loss of older leaves first, then infects new
            foliage, and can quickly move through an entire crop. Early leaf
            drop leads to fruit loss and sunscald.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> The most effective
            treatment is repeated applications with a tomato fungicide or
            biofungicide for the entire tomato crop. Copper sprays and Serenade
            fungicide are somewhat effective at halting the spread of symptoms.
            Remove infected leaves to prevent the spread of spores to other
            leaves, as water splashing on the leaves helps transmit the disease.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Good garden
            sanitation is critical for preventing septoria leaf spot. Remove
            fallen leaves and debris from the garden immediately. Clean tools
            before and after working with plants, water at ground level, and
            control insect pests. Rotate your tomato crops every three years.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="botrytis-gray-mold"
            class="disease-title text-2xl font-bold mb-2"
          >
            Botrytis Gray Mold
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/F2l44QgC90RnIPblH4753glizgw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-463214857-c8969cf652ae4ede913bcf11622a4b38.jpg"
              alt="Botrytis"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            <a href="https://www.thespruce.com/tomato-problems-botrytis-or-gray-mold-1402967">
              Botrytis
            </a>{" "}
            develops from the fungus <em>Botrytis cinerea.</em> Infection takes
            root in damaged stems or pruning cuts and can lie dormant for up to
            12 weeks. Spores are spread by wind and water and are most prevalent
            in cooler temperatures. Tomato flowers are also susceptible to this
            fungus.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Brown lesions show on
            leaves and stems. A whitish soft rot appears on fruits. The mold
            causes tomatoes to rot after harvest. Leaves die and fall off and
            stem girdling leads to wilt.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Botrytis often dies
            back when temperatures rise. Treat widespread or persistent
            infection with tomato fungicide or biofungicide with a specific
            application for gray mold.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Prevent botrytis by
            pruning plants in the early afternoon, which allows cuts to dry
            quickly. Avoid overhead watering and working with wet plants. Leave
            adequate spacing between plants and rows for good air circulation.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="bacterial-speck"
            class="disease-title text-2xl font-bold mb-2"
          >
            Bacterial Speck
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/IL47s4EnKZM9zuwO54gNUH-ce7U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1297736308-f91c96d60256429cb6a56260a8ec8ea7.jpg"
              alt="Bacterial Speck"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Bacterial speck is one of several bacterial problems that affect
            tomato plants by reducing yields. The bacteria{" "}
            <em>Pseudomonas syringae</em> causes bacterial speck during
            persistent cool, wet weather. Bacterial speck spreads by splashing
            water on the leaves. It can't be cured but there are steps to take
            to stop it from spreading.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Yellow tissue surrounds
            small, irregular, dark brown to black spots close to leaf margins.
            Spots appear raised on mature fruit but they can also appear flat or
            sunken.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Treat plants with a
            copper fungicide during cool, wet weather. Hot weather stops the
            pathogen from spreading.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Delay planting until
            weather conditions are warmer and drier. Avoid overhead irrigation
            and rotate tomatoes and other nightshades every year.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="southern-blight"
            class="disease-title text-2xl font-bold mb-2"
          >
            Southern Blight
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/IL47s4EnKZM9zuwO54gNUH-ce7U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1297736308-f91c96d60256429cb6a56260a8ec8ea7.jpg"
              alt="Southern Blight"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Southern blight is caused by the soilborne fungus{" "}
            <em>Athelia rolfsii</em> which girdles the tomato stem and prevents
            the plant from taking up water and nutrients. More prevalent in
            southern regions, it favors high temperatures, moist conditions, and
            acidic soil. Southern blight persists in soil for years. It not only
            affects tomatoes, but it also impacts peppers, beans, cantaloupes,
            carrots, potatoes, watermelon, and peanuts, among others.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Black-brown round
            lesions appear on stems near ground level and spread rapidly forming
            a white mold that produces sunken brown necrotic tissue. Plants wilt
            and fall over and fruits that contact the soil develop yellow spots
            that evolve into watersoaked lesions. Young plants may collapse at
            the soil line. Fruit near the stem can become infected, as well.
            Tomatoes rot within three to four days.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Fungicides and
            biofungicides can help manage southern blight. Soil fumigants can be
            used but are expensive.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Preventive steps
            include polarization to kill spores, crop rotation, and maintaining{" "}
            <a
              href="https://www.thespruce.com/what-to-know-about-soil-ph-5204392"
              class="external-link"
            >
              soil pH levels
            </a>{" "}
            for tomatoes. Avoid planting during wet weather with expected high
            temperatures. Remove plant debris and till or disk soil several
            times before planting. Dispose of infected plants and plant debris
            but do not compost. Eliminate weeds and rotate tomatoes with
            non-host crops.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="gray-leaf-spot" class="disease-title text-2xl font-bold mb-2">
            Gray Leaf Spot
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/YryXnM5lQ-0rRDOkx6q2g6avkS4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1286441510-2ba6ca53c008436c9696ca3d568617c8.jpg"
              alt="Gray Leaf Spot"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Gray leaf spot is a fungal disease that affects mainly the leaves of
            tomatoes, starting with the oldest leaves, although it can also
            infect the stems of the plant. It does not infect the fruit,
            although the disease can be harbored in the seeds of the infected
            plant.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Small, dark spots with
            yellow halos appear on the top and bottom surfaces of the leaves.
            The spots enlarge and turn a grayish brown. Eventually, the centers
            of the spots crack and fall out. Surrounding leaf areas will turn
            yellow and the leaves dry out and drop. Fruit production is
            inhibited.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Warm, moist
            conditions worsen gray leaf spot problems. Remove all affected
            plants and fall garden debris. Do not compost infected plants.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Cherry and grape
            tomato plants are most often impacted. Select resistant varieties.
            Rotate crops to avoid planting in infected soil.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="late-blight" class="disease-title text-2xl font-bold mb-2">
            Late Blight
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/F2l44QgC90RnIPblH4753glizgw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-463214857-c8969cf652ae4ede913bcf11622a4b38.jpg"
              alt="Late Blight"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Late blight is a mold disease affecting tomato leaves, stems, and
            fruit. It develops in cool, wet weather and spreads rapidly. Late
            blight is caused by the oomycete <em>Phytophthora infestans</em>,
            which is not a true fungus but still causes devastation as it did
            during the Irish potato famine in the 1840s. If you suspect you have
            late blight, contact your local extension service for specific
            identification because there are many strains of late blight.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Greasy-looking,
            irregularly shaped dark brown blotches with green-gray edges appear
            on leaves. A ring of white mold develops around the spots,
            especially in wet weather. The spots eventually turn dry and papery.
            Blackened areas may appear on the stems. The fruit also develops
            large, irregularly shaped, greasy gray spots and can turn mushy from
            a secondary bacterial infection.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Copper sprays offer
            some control. The fungicide Serenade works best as a deterrent
            rather than a cure. Late blight can overwinter in soil, tomato
            debris, and seeds, even in colder areas. Remove all debris. Rotate
            crops to prevent infections the following year.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Rotate crops each
            year, plant blight-resistant varieties, promote air circulation
            between plants by spacing them out properly and pruning leaves that
            touch.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="blossom-end-rot"
            class="disease-title text-2xl font-bold mb-2"
          >
            Blossom End Rot
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Blossom End Rot"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            <a href="https://www.thespruce.com/tomatoes-turning-black-on-the-bottoms-848186">
              Blossom end rot
            </a>{" "}
            is generally attributed to a lack of calcium availability during
            fruit set. This could be caused by too much high-nitrogen fertilizer
            or uneven watering, resulting in fluctuations in nutrient
            availability. It's a physiological disorder, not a disease, but it
            still results in fruit loss.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Dark brown or black
            spots develop at the blossom end of the fruit and enlarge as the
            fruit rots. The spots look water-soaked.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Remove affected fruit
            and provide regular, deep waterings. Add garden lime to the soil to
            help plants uptake water and nutrients. Use a fertilizer low in
            nitrogen and high in phosphorous.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Water on a consistent
            schedule and provide well-balanced fertilizer.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="buckeye-rot" class="disease-title text-2xl font-bold mb-2">
            Buckeye Rot
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/F2l44QgC90RnIPblH4753glizgw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-463214857-c8969cf652ae4ede913bcf11622a4b38.jpg"
              alt="Buckeye Rot"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Buckeye rot is more common in Southern states, especially during
            warm, wet periods. Buckeye rot affects both green and ripe fruit.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> A small brown spot will
            enlarge and develop concentric rings resembling a buckeye. The
            affected area may appear round or oblong, and the firm lesion with
            smooth margins becomes soft and decayed as the disease progresses.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Remove affected
            fruit. Avoid surface water from flooding the plants. Keep future
            fruits from making contact with the soil.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Stake or cage
            tomatoes to prevent them from touching the soil and always plant in
            soil with excellent drainage.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="gray-wall" class="disease-title text-2xl font-bold mb-2">
            Gray Wall
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Gray Wall"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Gray wall is essentially a ripening problem. There's no known
            associated pathogen or treatment, only preventive steps. Cool
            temperatures and stressed or unhealthy plants contribute to the
            problem.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> The green fruits may
            have a gray cast or flattened, gray blotches. Ripe fruit has a
            mottled appearance and green or brown areas on the inside of the
            fruit.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Good growing
            conditions help prevent gray wall. Make sure plants are not heavily
            shaded. Evenly water and regularly fertilize plants. Keep the soil
            from becoming compacted around the roots.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Choose
            mosaic-resistant tomato varieties, promote healthy soil ecology, and
            fertilize plants properly.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="leaf-mold" class="disease-title text-2xl font-bold mb-2">
            Leaf Mold
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Leaf Mold"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Leaf mold is a fungus caused by <em>Passalora fulva</em> and it
            occurs most frequently in humid conditions.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Leaf mold appears as
            pale green or yellowish spots on the upper leaves. When it's very
            humid, the spots occur on the bottom surfaces of the leaves and then
            become covered in a gray, velvety growth of fungal spores. Fruits
            can have a leathery, blackish rot near the stem.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Increase air
            circulation by pruning, spacing, and staking tomato plants to
            control the disease. Avoid watering overhead to keep leaves dry.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Crop rotation can
            make a critical difference in preventing leaf mold, and you can also
            use a preventive fungicide.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="tomato-pith-necrosis"
            class="disease-title text-2xl font-bold mb-2"
          >
            Tomato Pith Necrosis
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Tomato Pith Necrosis"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Tomato pith necrosis is a disease caused by soil-borne{" "}
            <em>Pseudomonas</em> bacteria. It occurs during cloudy, cool, and
            moist conditions.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> An early symptom is the
            blackening of the stems and leaves. Later symptoms involve split
            stems or stems that shrink and crack. The pith (stem interior)
            disintegrates and becomes hollow, disrupting water flow, and causing
            yellowing leaves.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Warmer weather can
            resolve the issue. But to manage the disease, do not water from
            above, keep soil adequately moist, and remove and dispose of dead
            and diseased plants and roots.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Rotate crops
            regularly, since the bacteria can remain in the soil for a few
            years, it's best to rotate crops.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="damping-off" class="disease-title text-2xl font-bold mb-2">
            Damping Off
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Damping Off"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Damping off is a fungal disease caused by <em>Rhizoctonia</em> that
            affects{" "}
            <a href="https://www.thespruce.com/white-fuzzy-mold-on-seedlings-3972289">
              tomato plant seedlings
            </a>
            . This fungus develops in cool, wet, and rich soils.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Seedlings may fail to
            emerge or the stems are water-soaked.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> When planting
            tomatoes, plant seeds indoors and do not put them in soil with high
            nitrogen levels. Add{" "}
            <a href="https://www.thespruce.com/best-fertilizers-for-tomatoes-7501347">
              nitrogen fertilizer
            </a>{" "}
            after seedlings are more established, which is when they have their
            first true leaves. It's always good practice to keep the surface of
            the soil dry between waterings.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Use well-draining
            soil, avoid over-watering, sanitize garden tools, and maintain space
            between each tomato plant.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="mosaic-virus" class="disease-title text-2xl font-bold mb-2">
            Mosaic Virus
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Mosaic Virus"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Mosaic virus is transmitted in many ways, including seed, grafting,
            pests, or handling by human hands. The virus is a concern throughout
            the growing season. It's also a difficult virus to eradicate since
            it survives in plant debris for over 50 years.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong>{" "}
            <a href="https://www.thespruce.com/tomato-leaves-curling-5537249">
              Curling leaves
            </a>{" "}
            may become mottled, new leaflets are small, and infected fruit is
            brown inside. Growth can be generally light in color. The fruit may
            have a mottled mosaic look (alternating colors) on the skin.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Control of mosaic
            virus is difficult. Reflective mulches may help prevent the problem.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Plant resistant
            varieties, rotate crops, use natural insecticides, keep your hands
            and garden tools sanitized, and remove any infected leaves as soon
            as you see them.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="bacterial-wilt" class="disease-title text-2xl font-bold mb-2">
            Bacterial Wilt
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Bacterial Wilt"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Caused by a soil-borne bacteria, <em>Ralstonia solanacearum,</em>{" "}
            bacterial wilt affects not just tomatoes but also other crops in the
            Solanaceae family, potentially including peppers, eggplant, and
            potatoes. The disease is more pronounced in the south, partially
            because it's inspired by high temperatures.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Leaves will begin
            wilting and can turn yellow or brown, before the whole plant
            perishes.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Remove infected
            plants immediately and dispose of them. Do not plant solanaceous
            crops again in this area. There is not much you can do once the
            disease sets in.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Rotate crops
            regularly and sanitize all garden tools. Keep weeds under control.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="root-knot-nematodes"
            class="disease-title text-2xl font-bold mb-2"
          >
            Root Knot Nematodes
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Root Knot Nematodes"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Root knot nematodes are microscopic, parasitic roundworms that live
            in soil and eat plants. They can cause damage to far more than just
            your tomatoes. Because they live in the soil, treatment and
            management can be tricky.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Your tomato plants may
            be stunted or wilting for reasons you don't understand. Symptoms
            from root knot nematodes are visual below ground when examining the
            roots. Roots may be oddly swollen where root knot nematodes have
            laid their eggs.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Remove infected
            plants, and plant a different, non-host species in the spot where
            root knot nematodes are known to live.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Rotate crops
            regularly between host and non-host plants, sanitize all tools, and
            plant French marigolds, which can deter root knot nematodes.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="sunscald" class="disease-title text-2xl font-bold mb-2">
            Sunscald
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Sunscald"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            In sunny regions, tomatoes can simply be burned by the sun. This
            happens more often in hotter USDA zones and after tomato plants have
            been aggressively pruned, resulting in less natural shade for tomato
            fruits.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Burnt, scalded
            tomatoes.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Once tomatoes are
            burnt, there's not much you can do. Erect some sort of shade
            structure to prevent remaining fruits and fruits that have yet to
            emerge.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Plant your tomatoes
            in a spot that is protected from midday sun if you live in a hot,
            sunny region. Avoid pruning too aggressively. Use management
            techniques to prevent other diseases that result in leaf loss.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2 id="bacterial-spot" class="disease-title text-2xl font-bold mb-2">
            Bacterial Spot
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Bacterial Spot"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Bacterial spot is a disease that effects tomatoes and peppers in
            particularly hot, humid conditions. Multiple bacteria are known to
            cause this disease, which results in spotty, pitted fruits.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Tomato plant leaves
            will develop small spots that are brown with a yellow ring around
            them. These spots often fall away and leave holes behind. Fruits may
            have scabby spots as well.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Do not eat infected
            tomatoes, which can be host to secondary pathogens. Remove infected
            plants and rotate crops.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Choose resistant
            varieties, water in the morning so that excess water has time to
            dry, space out plants properly.
          </p>
        </li>
        <li class="disease bg-white p-4 border border-gray-300 rounded-lg mb-4">
          <h2
            id="yellow-leaf-curl"
            class="disease-title text-2xl font-bold mb-2"
          >
            Yellow Leaf Curl
          </h2>
          <p class="disease-image mb-4">
            <img
              src="https://www.thespruce.com/thmb/eoEhNAaUALB-_UaXaYtHCcSY7l8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1434931076-3590f09fe1084bfe848c628751b32035.jpg"
              alt="Yellow Leaf Curl"
              class="disease-image-src w-full h-48 object-cover rounded-lg"
            />
          </p>
          <p class="disease-description text-lg mb-4">
            Yellow leaf curl virus causes yellow leaf curl disease, causing
            leaves to yellow and curl. The leaves may be smaller than expected
            and will curl upward. Flowers are more likely to fall off, resulting
            in less fruit.
          </p>
          <p class="disease-symptoms text-lg mb-4">
            <strong class="font-bold">Symptoms:</strong> Small, yellow leaves
            will curl upward, blossoms may fall off, and less fruit will be
            produced.
          </p>
          <p class="disease-management text-lg mb-4">
            <strong class="font-bold">Management:</strong> Remove infected
            plants and practice aggressive weed control.
          </p>
          <p class="disease-prevention text-lg mb-4">
            <strong class="font-bold">Prevention:</strong> Serious crop
            rotation, avoiding fields where tomatoes with yellow leaf curl virus
            have been present. Practice pest prevention, as the virus is often
            spread through whiteflies.
          </p>
        </li>
      </ul>
    </div>
  );
}
export default Article;
