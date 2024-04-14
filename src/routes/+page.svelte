<script>
    import { AppBar, AppShell, LightSwitch } from "@skeletonlabs/skeleton";
</script>

<AppShell>
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead"
                ><h1 class="text-2xl font-bold">Podrace</h1></svelte:fragment
            >
            <svelte:fragment slot="trail">
                <LightSwitch />
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <main class="container mx-4 py-8">
        <section class="mb-12">
            <h2 class="text-4xl font-bold mb-4">
                Record Your Podcast with Ease
            </h2>
            <p class="text-lg">
                Our intuitive podcast recording tools make it easy to create
                professional-sounding episodes.
            </p>
            <button class="btn variant-filled-primary mt-4">Get Started</button>
        </section>

        <section class="mb-12">
            <h2 class="text-3xl font-bold mb-4">Powerful Editing Features</h2>
            <ul class="list-disc pl-6">
                <li>Noise reduction</li>
                <li>Audio normalization</li>
                <li>Seamless transitions</li>
                <li>And more!</li>
            </ul>
        </section>

        <section>
            <h2 class="text-3xl font-bold mb-4">Streamline Your Workflow</h2>
            <p class="text-lg">
                Our integrated platform simplifies the entire podcasting
                process, from recording to publishing.
            </p>
            <button class="btn variant-filled-secondary mt-4">Learn More</button
            >
        </section>
    </main>

    <svelte:fragment slot="footer">
        <footer class="text-center py-4">
            &copy; 2023 Podcast Recording and Tools. All rights reserved.
        </footer>
    </svelte:fragment>
</AppShell>
