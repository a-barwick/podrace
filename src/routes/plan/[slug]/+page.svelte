<script lang="ts">
    const plan = {
        title: "Plan Title",
        description: "Plan Description",
        items: [{ id: "item-id", content: "List item content" }],
    };

    const newListItem = { content: "" };

    function addListItem() {
        plan.items.push({ id: "new-item-id", content: newListItem.content });
        newListItem.content = "";
    }

    function removeListItem(itemId: string) {
        plan.items = plan.items.filter((item) => item.id !== itemId);
    }
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{plan.title}</h1>
    <p class="mb-4">{plan.description}</p>

    <div class="mb-8">
        <h2 class="text-xl font-bold mb-2">Plan Items</h2>
        <!-- Display the list of plan items -->
        <!-- Replace this with your actual list rendering logic -->
        <div class="flex items-center mb-2">
            <input type="checkbox" class="mr-2" />
            <span class="flex-grow">List item content</span>
            <button
                class="text-red-500"
                on:click={() => removeListItem("item-id")}>Remove</button
            >
        </div>

        <div class="mt-4">
            <input
                type="text"
                bind:value={newListItem.content}
                placeholder="Enter a new list item"
                class="border rounded px-2 py-1 mr-2"
            />
            <button
                on:click={addListItem}
                class="bg-blue-500 text-white px-4 py-2 rounded"
                >Add Item</button
            >
        </div>
    </div>

    <button
        on:click={savePlan}
        class="bg-green-500 text-white px-4 py-2 rounded">Save Plan</button
    >
</div>
