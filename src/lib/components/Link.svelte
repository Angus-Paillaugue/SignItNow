<script>
    import { twMerge } from 'tailwind-merge';
    export let href = '#';
    export let linkClasses = 'link';
</script>
    
<a  {...$$restProps} {href} class={twMerge(linkClasses, $$props.class)} on:click>
    <slot />
</a>