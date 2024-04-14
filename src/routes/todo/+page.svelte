<script lang="ts">
    type Todo = {
        id: String;
        content: String;
        complete: boolean;
    };

    let todos: Todo[] = [
        // { id: "1", content: "Walk the dog", complete: false },
        // { id: "2", content: "Feed the cat", complete: false },
        // { id: "3", content: "Do the dishes", complete: true },
    ];
    let newItem: String;

    const addItem = () => {
        if (!newItem) return;
        todos = [
            ...todos,
            { id: `${todos.length + 1}`, content: newItem, complete: false },
        ];
        newItem = "";
    };

    const markComplete = (slug: String) => {
        todos = todos.map((todo) => {
            if (todo.id === slug) {
                todo.complete = !todo.complete;
            }
            return todo;
        });
    };

    $: count = todos.length;
</script>

<div class="m-10">
    <div class="card">
        <h1
            class="card-header text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
        >
            Todo List {#if count}({count}){/if}
        </h1>
        <ul class="p-4">
            {#each todos as todo}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li
                    class={`block card card-hover p-4 mb-2 ${
                        todo.complete ? "line-through" : ""
                    }`}
                    data-id={todo.id}
                    on:click={() => markComplete(todo.id)}
                >
                    {todo.content}
                </li>
            {/each}
        </ul>
        <div class="card-footer">
            <form
                class="input-group input-group-divider grid-cols-[1fr_auto] mb-2"
            >
                <input
                    class="input variant-form-material"
                    type="text"
                    placeholder="Enter a new item"
                    bind:value={newItem}
                />
                <button class="btn variant-filled" on:click={addItem}
                    >Submit</button
                >
            </form>
        </div>
    </div>
</div>
