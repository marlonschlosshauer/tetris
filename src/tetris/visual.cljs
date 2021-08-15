(ns tetris.visual)

;; TODO: What if I need this atom in other ns?
(defonce app-state-visuals
  (atom {:block-width 32 :block-border 4}))

;; TODO: Probably save this globally at some point
(defn get-tools []
  (let [canvas (.getElementById js/document "field")]
    {:canvas canvas :context (.getContext canvas "2d")}))

(defn draw-block [x y type config]
  ;; Access tools from config
  (let [context (get config :context)
        size (get config :size)
        border (get config :border)]
    ;; Set colors
    ;; TODO: Apply color based on type
    (set! (.-fillStyle context) "#bfcd99")
    (set! (.-strokeStyle context) "#373837")
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
     size)
    ))

(comment
  ;; Draw a single block
  (draw-block 2 0 :block (merge {:size (get @app-state-visuals :block-width) :border (get @app-state-visuals :block-border)} (get-tools))))

(comment
  ;; Update state manually
  (swap! app-state-visuals assoc :block-border 4))

(comment
  ;; Inspect state
  @app-state-visuals)


