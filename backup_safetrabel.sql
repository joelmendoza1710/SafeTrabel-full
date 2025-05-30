PGDMP      7            
    |         
   SafeTrabel    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24876 
   SafeTrabel    DATABASE     �   CREATE DATABASE "SafeTrabel" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE "SafeTrabel";
                postgres    false            �            1259    24891 	   locations    TABLE     ,  CREATE TABLE public.locations (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255),
    city character varying(255),
    country character varying(255),
    description character varying(255),
    created_at timestamp with time zone DEFAULT now()
);
    DROP TABLE public.locations;
       public         heap    postgres    false            �            1259    24890    locations_id_seq    SEQUENCE     �   ALTER TABLE public.locations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    24920    photos    TABLE     �   CREATE TABLE public.photos (
    id bigint NOT NULL,
    location_id bigint,
    user_id integer,
    photo_url character varying(255) NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now()
);
    DROP TABLE public.photos;
       public         heap    postgres    false            �            1259    24919    photos_id_seq    SEQUENCE     �   ALTER TABLE public.photos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    24900    reviews    TABLE     ,  CREATE TABLE public.reviews (
    id bigint NOT NULL,
    user_id integer,
    location_id bigint,
    rating integer NOT NULL,
    comment character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    24899    reviews_id_seq    SEQUENCE     �   ALTER TABLE public.reviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    24878    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    role character varying(255),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['USER'::character varying, 'ADMIN'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24877    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            	          0    24891 	   locations 
   TABLE DATA           ^   COPY public.locations (id, name, address, city, country, description, created_at) FROM stdin;
    public          postgres    false    218   H%                 0    24920    photos 
   TABLE DATA           R   COPY public.photos (id, location_id, user_id, photo_url, uploaded_at) FROM stdin;
    public          postgres    false    222   �)                 0    24900    reviews 
   TABLE DATA           X   COPY public.reviews (id, user_id, location_id, rating, comment, created_at) FROM stdin;
    public          postgres    false    220   ",                 0    24878    users 
   TABLE DATA           P   COPY public.users (id, username, email, password, created_at, role) FROM stdin;
    public          postgres    false    216   �,                  0    0    locations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.locations_id_seq', 16, true);
          public          postgres    false    217                       0    0    photos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.photos_id_seq', 23, true);
          public          postgres    false    221                       0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 20, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 15, true);
          public          postgres    false    215            n           2606    33140    locations locations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public            postgres    false    218            r           2606    24927    photos photos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.photos DROP CONSTRAINT photos_pkey;
       public            postgres    false    222            p           2606    24908    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    220            f           2606    25088 !   users uk6dotkott2kjsp8vw4d0m25fb7 
   CONSTRAINT     ]   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7;
       public            postgres    false    216            h           2606    25078    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            j           2606    25039    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            l           2606    25059    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            u           2606    33157    photos photos_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.photos DROP CONSTRAINT photos_location_id_fkey;
       public          postgres    false    222    218    4718            v           2606    25040    photos photos_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.photos DROP CONSTRAINT photos_user_id_fkey;
       public          postgres    false    216    222    4714            s           2606    33166     reviews reviews_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_location_id_fkey;
       public          postgres    false    220    4718    218            t           2606    25045    reviews reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    220    4714    216            	   T  x����n�8���S�Arl��ָ�@l������(R!�`ӷ�1��z۫^��!��s�(`@&Eg~󟡊dA�UZ[QIqGF|�Z5�G���|򩓮����P�kr�ĵ}�`�0O���4ī��J��[g��)U�|_1�6ݿ=�K��\RZm륢�F���($~Zx�*+���o�P­��U7VM+N���
q�	rp��%��h���_�%o+���=QW5N{R��㱓��;Yʁx�k�[�x�k*���[�c/���RK��i��Z�c�}����JJ�a6]��e>y6�f�H��,�N.���$Y���J|��&@W�(�ٺ j�)TYFCt�m�]���q�"�w�a�ޚ�z)�
�Sև�x4�i�H���_��2��qvi�F�mV�Z�#6 {`n��б��#ny>O�l���m�@)�G�&[/k2��YT��?nՑ,����V��Z}���Dg�6� �=l���8HT�J�e(�L	b$�6\�����=r���Iԕ�$`�gm1�\��_���o�a�m����v6�� YLo4�Fi1,�Ř�͒/�u_��?��Ğ�9_��ʵjT��ie����!b6qb�ɝTr��f�/�C"���h�֍AV�i�£�:Y*��(�F�3E�ӿQ������&i?Zu�/W�V�NP\���i��*ϒ[�,���A��T�o�����m����Y`S����l��2�m��L�����t�y6LG�bZ\��d�uA����AX���v�p]�mS�ařrpic�}G׃6Keb��J,;Ϥ��T�� <��:��8O�F�q&q�G���y@���[���^�r-�/4�c{�xdQ/m�w��u�ђjk�: �w'mI-%'%���5�F��wc%���C�WdC��t>��Y6͆��8�5��6�[ԁ�?�������N*�@_���c�����-&��޶���(Z�u&� >���}�~#`���F�'��6����п�ؿ�V��=�4�Y:����X� yi�gd���Cܼ=�ep�Z�~�y���GF�����/�����myn?nT<��Q�
W��&�!'����4eW�i���? ��h�         f  x����n� �����M/!�����v�6uU��rRt�1�����x��ʓ�I������dEFIv���\��;�=�З�(���Y?�uwr�[k�}c�CZt4���ڃ����3FG�"�/(-iQ2��.������\l�
*8���yD.�R%yB�L-A\���C�����u~���3�
K�5�@y����`!D�,�.@d�"�\J&([O������0'��.r��YL�ȵ�ލ���u�lZd�\h��ĈFcKߜ��]�X�0O1�9���,���y0�&ĝhkjn��j�K�\�	���l�C0��P�vV-U2��TN��)#��\o�%#wP;׎�� W{h+��i �Pe�����]1���|��}�%FJAK�0�R�tjFn�2x{��*#�����Ƃ2��*���9�hsN�}sH��g�_F��<�<�S�F�����h�gY��9��ޛ��8}u���i����s�xHL��E�7c���p)�
1�*o��1~����c�ھ�/��D�H,s�O�|qV:�>E�N�x�I�Q���JQ�70��q��]����p��GhM0�b��(1�"��p!	�*�;^�V����         �   x�e�Aj�0��|����f<�F:K7!R���*�����
o��~�7_K��[��K���!G�#���\��]��,�{�;�O��0k+��S���Ɂs�0ɲ2��!��-�
�:o�{�2d61	�S�W���n��}G(�I�h9H���Wk�u�[�-:��=��d�@,r��u�/�'B         k  x�m��r�@�5|��v�54�f�����*-Cd��3T�T*����}��8�8+E"R?���C����e����K]�vw'��?��b�FJ����<v�fG�L�\B��o���a\�X[�l�"�`�� z@;���pB����7�G@��2�ܴ��(<�[q;pE8lt��.��Nɛt��<a೗.Ng��ϣ2{;</L[���tEEXŚ�~!���Y��#��h�j��:XYU8=��=�Y%7�E�꭯D�9��>
�s�0�u*��o ޴����S@�9�Zm���p�|��ٚ��n������Ք�yc3^f|*��$�y��_������p3�"Y�? л�     