<template>
    <section class="login main-layout">
        <slot name="header"></slot>
        <section class="login-wrapper main-layout">
            <div class="login-wrapper__inner">
                <slot name="login-form"></slot>
            </div>
        </section>
    </section>
</template>