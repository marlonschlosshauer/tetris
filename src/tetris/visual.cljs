(ns tetris.visual
  (:require [tetris.game]))

(defonce app-state-visuals
  (atom {:block-width 32 :block-border 4}))

;; TODO: Probably save this globally at some point
(defn get-tools []
  (let [canvas (.getElementById js/document "field")]
    {:canvas canvas :context (.getContext canvas "2d")}))

(defn get-style [type]
  (case type
    :block {:inner "#bfcd99" :border "#373837"}
    :ghost {:inner "#373837" :border "#373837"}
    :clear {:inner "#000000" :border "#000000"}))

(defn draw-block [x y type config]
  ;; Access tools from config
  (let [context (get config :context)
        size (get config :block-width)
        border (get config :block-border)
        colors (get-style type)]
    ;; Set colors
    ;; TODO: Apply color based on type
    (set! (.-fillStyle context) (get colors :inner))
    (set! (.-strokeStyle context) (get colors :border))
    (set! (.-lineWidth context) border)
    ;; Draw block
    (.fillRect
     (get config :context)
     (+ (* x (+ (* 2 border) size)) (* border 2))
     (+ (* y (+ (* 2 border) size)) (* border 2))
     (- size (+ border border))
     (- size (+ border border)))
    (.strokeRect
     (get config :context)
     (+ (* x (+ (* 2 border) size)) border)
     (+ (* y (+ (* 2 border) size)) border)
     size 
     size)))

(comment
  ;; Draw a single block
  (draw-block 2 0 :block (merge @app-state-visuals (get-tools))))

(comment
  ;; Remove block
  (draw-block 2 0 :clear (merge @app-state-visuals (get-tools))))

(defn draw-tetrimoni
  ([tetrimoni] (draw-tetrimoni tetrimoni :block))
  ([tetrimoni type]
   (let [config (merge @app-state-visuals (get-tools))]
     (for [t (tetris.game/get-tetrimoni tetrimoni)]
       (draw-block (get t :x) (get t :y) :block config)))))
(comment
  (draw-tetrimoni :o))
